---
title: "Scalable GraphQL: Why you need DataLoaders"
excerpt: "The N+1 problem in GraphQL occurs when a query triggers an excessive number of database calls, with each relationship level multiplying the query count. Without optimization, a query fetching 25 categories with 25 products each generates 651 database calls. DataLoaders solve this by implementing three key mechanisms: batching combines individual lookups into single operations, coalescing merges requests in the same execution cycle, and caching prevents duplicate lookups within a request. The result? Just 3 database queries regardless of data size, dramatically improving API performance and scalability for nested queries with complex relationships"
date: "2025-03-03T21:21:00.000Z"
author:
  name: Nick Weaver
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
githubRepo: "https://github.com/nickqweaver/graphql-data-loader-example"
readingTime: "15 min"
---

# Scalable GraphQL: Why you need DataLoaders

## Introduction

If you're building a GraphQL API that needs to scale, you've likely encountered performance bottlenecks when handling nested queries. One of the most common issues is the N+1 query problem, which can dramatically increase database load and response times. This article explores how DataLoaders solve this problem by efficiently batching and caching database queries.
Prerequisites
This article assumes you're familiar with:

- Basic GraphQL concepts (queries, resolvers, schema, context)
- JavaScript/TypeScript
- Apollo Server

Our example uses Node.js with Apollo GraphQL and Drizzle ORM, but the concepts apply regardless of your specific tech stack.

The N+1 Problem in GraphQL
Although the N+1 problem isn't exclusive to GraphQL, GraphQL's nested query structure makes it particularly prone to amplifying this issue. Let's explore why through a practical example.

### Schema structure

```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  category: Category!
  manufacturer: Manufacturer!
}

type Category {
  id: ID!
  name: String!
  products: [Product!]!
}

type Manufacturer {
  id: ID!
  name: String!
  country: String!
  products: [Product!]!
  rating: Float!
}
```

This schema represents the following relationships: many products per category and one manufacture per product.

## Problem in Action

Here's a typical query we might use in our application to render products grouped by category:

```graphql
query GetCategoriesWithProducts {
  categories {
    name
    products {
      name
      price
      manufacturer {
        name
      }
    }
  }
}
```

Let's look at what actually happens under the hood with this query, even at a small scale:

```sql
-- First, fetch all categories
SELECT * FROM categories;
-- Returns: [{id: 1, name: 'Electronics'}, {id: 2, name: 'Books'}, {id: 3, name: 'Clothing'}]

-- Then for EACH category, fetch its products
SELECT * FROM products WHERE category_id = 1;
-- Returns: [{id: 1, name: 'Laptop', manufacturerId: 1}, {id: 2, name: 'Phone', manufacturerId: 2}, {id: 3, name: 'Tablet', manufacturerId: 3}]

SELECT * FROM products WHERE category_id = 2;
-- Returns: [{id: 4, name: 'Novel', manufacturerId: 4}, {id: 5, name: 'Textbook', manufacturerId: 5}, {id: 6, name: 'Comic', manufacturerId: 6}]

SELECT * FROM products WHERE category_id = 3;
-- Returns: [{id: 7, name: 'Shirt', manufacturerId: 7}, {id: 8, name: 'Pants', manufacturerId: 8}, {id: 9, name: 'Hat', manufacturerId: 9}]

-- Finally, for EACH product, fetch its manufacturer
SELECT * FROM manufacturers WHERE id = 1;
SELECT * FROM manufacturers WHERE id = 2;
SELECT * FROM manufacturers WHERE id = 3;
SELECT * FROM manufacturers WHERE id = 4;
SELECT * FROM manufacturers WHERE id = 5;
SELECT * FROM manufacturers WHERE id = 6;
SELECT * FROM manufacturers WHERE id = 7;
SELECT * FROM manufacturers WHERE id = 8;
SELECT * FROM manufacturers WHERE id = 9;

-- Total: 13 queries
-- 1 for categories
-- 3 for products (one per category)
-- 9 for manufacturers (one per product)
```

This small example with just 3 categories and 3 products per category already generates 13 database queries. Scale that up to something more realistic like 25 categories with 25 products each, and you're suddenly looking at 651 database queries (1 + 25 + 625) for a single request. This is clearly not sustainable.

## After DataLoader

When we use dataloader we end up flattening our above query cascade to the following:

```sql
-- First, fetch all categories
SELECT * FROM categories;
-- Returns: [{id: 1, name: 'Electronics'}, {id: 2, name: 'Books'}, {id: 3, name: 'Clothing'}]

-- Then for EACH category, fetch its products
SELECT * FROM products WHERE category_id = 1, 2, 3;

-- Finally, fetch all manufactures
SELECT * FROM manufacturers WHERE product_id = 1, 2, 3, 4, 5, 6, 7, 8, 9;

-- Total: 13 queries
-- 1 for categories
-- 1 for products (one per category)
-- 1 for manufacturers (one per product)
```

The great thing about this approach is that we've reduced our query count from 13 to just 3, regardless of the number of categories or products. Even if we had 100 categories with 50 products each, we'd still only execute 3 queries instead of 5,001. The number of database queries no longer increases linearly with the size of your dataset, eliminating the N+1 problem entirely.

## How DataLoaders Work

DataLoader optimizes data fetching in GraphQL through three key mechanisms: batching, request coalescing and caching. Let's explore how each of these works and their benefits.

### Batching

Each DataLoader instance requires a batch loading function that serves as its foundation. This function must:

- Accept an array of keys (like product IDs or manufacturer IDs)
- Return a Promise that resolves to an array of values or errors
- Maintain the same order as the input keys

```javascript
const productCategoryLoader = new DataLoader(async (ids) => {
  const products = await db.products.findMany({
    where: { categoryId: { in: ids } },
  });

  // Must preserve order of input ids
  return orderMany(ids, products);
});
```

### Request Coalescing

Request coalescing is the process where multiple individual requests for data that occur within the same event loop tick are automatically combined into a single batch operation. For example:

```javascript
// These separate load calls:
productCategoryLoader.load(1);
productCategoryLoader.load(2);
productCategoryLoader.load(3);

// Become a single batch operation:
SELECT * FROM products WHERE category_id IN ('1', '2', '3')
```

### Caching Mechanism

DataLoader implements a per-request memoization cache that:

- Caches values for the lifetime of the request
- Is not intended as a permanent response cache
- Helps prevent duplicate database queries within a single request

For example, if multiple products reference the same manufacturer:

```javascript
// Only triggers one database query even if called multiple times
await manufacturerLoader.load(1); // DB query
await manufacturerLoader.load(1); // Uses cache
await manufacturerLoader.load(1); // Uses cache
```

### Batch Scheduling

Batch scheduling controls when the batch loading function executes:

- Scheduled to run on the next event loop tick (via `process.nextTick()` by default)
- Collects all keys requested via `load()` during the current tick
- Passes collected keys to the batch function as a single array
- Returns results to individual `load()` calls in matching order

The process flows like this:

1. Multiple `load()` calls queue their keys during current tick
2. DataLoader schedules batch execution for next tick
3. On next tick, batch function executes with all collected keys
4. Results are distributed back to original `load()` promises

## IMAGE HERE

This combination of mechanisms makes DataLoader particularly efficient for GraphQL APIs, reducing the number of database queries while maintaining clean resolver code.

## Implementation

While the DataLoader documentation effectively describes how dataloaders work under the hood, the actual implementation strategy is left for you to configure. I typically structure my dataloaders module like this:

```
/dataloaders
  - batching.ts  // Contains batch functions
  - store.ts     // Defines dataloader instances
  - utils.ts     // Helper functions
  - index.ts     // Main export file
```

### Group Batching

In the batching file, I group all the batch functions together. I follow consistent naming conventions to make the code more readable and maintainable:

**For one-to-one relations:**
I structure naming as: `batch<Resource>By<LookupID>`

Examples:

- `batchManufacturerById` - Retrieves a manufacturer by its ID
- `batchManufacturerByProductId` - Retrieves a manufacturer associated with a product ID

**For one-to-many relations:**
I structure naming as: `batchMany<Resource>By<LookupID>`

Examples:

- `batchManyProductsById` - Retrieves multiple products by their IDs
- `batchManyProductsByCategoryId` - Retrieves all products for a given category ID

### Store

For small applications, you could put all your dataloaders directly on the context object:

```ts
context: (req, res) => ({
  // ...other context properties
  dataloaders: {
    productsLoader: new DataLoader(batchProductsById),
    manufacturersLoader: new DataLoader(batchManufacturersById),
  },
});
```

However, this approach quickly becomes inefficient. As your application grows, the additional memory required for all these dataloader instances can impact performance. Large applications may have hundreds or even thousands of dataloaders in a single store.

To mitigate this issue, we can implement lazy loading for dataloaders:

```ts
// store.ts
export const store = {
  productsLoader: () => new DataLoader(batchProductsById),
  manufacturersLoader: () => new DataLoader(batchManufacturersById),
};

// index.ts
export function createDataLoaders() {
  const loaders = new Map<string, DataLoader<any, any>>();

  return {
    get: function <K, V>(key: string): DataLoader<K, V> {
      if (!loaders.has(key)) {
        if (!store[key]) {
          throw new Error(`DataLoader with key ${key} not found in store`);
        }
        loaders.set(key, store[key]());
      }
      return loaders.get(key) as DataLoader<K, V>;
    },
  };
}
```

Now you can pass this factory function in your context and lazy-load only the dataloaders you need:

```ts
const server = new ApolloServer({
  context: (req, res) => ({
    dataloaders: createDataLoaders(),
  }),
});
```

In your resolvers, you would access the dataloaders like this:

```ts
const resolvers = {
  Product: {
    manufacturer: async (product, _, context) => {
      return context.dataloaders
        .get("manufacturersLoader")
        .load(product.manufacturerId);
    },
  },
};
```

### Key Benefits

This implementation approach offers several advantages:

1. **Memory Efficiency**: Dataloaders are only created when needed
2. **Type Safety**: Using TypeScript generics ensures correct typing
3. **Maintainability**: Clear naming conventions make the code easier to understand
4. **Error Handling**: Provides clear feedback when a loader doesn't exist

Remember that each GraphQL request should have its own DataLoader instances to prevent cross-request caching issues. The pattern above ensures that a new set of loaders is created for each request context.

### Demo

I've created a demo repo here that has 2 queries with example schema. One query uses data loaders the other one doesn't. You can play around with them your self to see
how much of a performance hit queries will take without using data loaders.
