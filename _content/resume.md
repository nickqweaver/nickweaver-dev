---
title: Resume
lastUpdated: "2026-01-22"
---

## Experience

### Software Engineer
**SendOutCards** | Salt Lake City, UT | April 2022 – Present

- Built async GraphQL wrapper around legacy print pipeline with the production fulfillment team, adding custom enterprise print filters to onboard a $1M ARR enterprise client
- Optimized batch-processing pipeline by caching previously processed images in memory, eliminating redundant sequential processing and accelerating throughput 5x
- Developed a configurable risk mitigation engine with admin controlled rule sets, threshold tuning and automated blocking/warning actions, reducing digital gift card fraud to nearly zero
- Cut card editor load time in half by implementing data prefetching, fine-tuning client-side cache policies and leveraging CloudFront CDN for static asset caching
- Rebuilt the greeting card rich text editor to use ProseMirror's native DOM handling and debounced Redux state updates, reduced re-renders, eliminated keystroke latency and delivered a smooth editing experience
- Contributed to the launch of digital greeting-card platform, enabling users to send 3D animated cards through shareable links that generated over $100K in new revenue within the first seven days
- Integrated Saleor E-commerce SaaS to decouple order logic from legacy backend, enabling faster iteration on digital product offerings
- Built a Stripe-powered cart/checkout for digital products, boosting revenue 5.6% and new customers 4.8%
- Eliminated S3 thumbnail storage and improved image delivery latency by developing an on-demand API that dynamically generated Open Graph preview images, fronted by AWS CloudFront edge caching
- Replaced a legacy forked Redux/Apollo cache with TanStack Query plus type-safe query keys, simplified state management, reduced technical debt, and boosted data-fetch and render performance

### Frontend Software Engineer
**SendOutCards** | Salt Lake City, UT | December 2019 – April 2022

- Rebuilt card editor into a reusable React Component, significantly enhancing user experience by enabling unrestricted element placement with layering, rotation, custom sizing and sticker support
- Established semantic versioned CI/CD pipelines using GitHub Actions for the card editor repository, enabling automated testing and rapid white-label deployments across multiple applications
- Reduced client side bundle size by 82% through code splitting, hosting static assets externally, and pruning unused dependencies, significantly improving initial page load times
- Developed Quantum Design System, a public TypeScript-based React component library using Rollup and published to NPM, enforcing consistent UI patterns throughout the product suite

---

## Skills

**Languages:** JavaScript/TypeScript, Python, SQL

**Frameworks:** React, Next.js, GraphQL, Node.js, Django, Redux, TanStack (Start, Query, Router)

**Infrastructure:** AWS, Docker, Redis, RabbitMQ, PostgreSQL, MinIO

**Integrations:** Stripe, Twilio/SendGrid, Saleor

---

## Education

**Western Governor University**
B.S. Computer Science | Expected February 2027

**Salt Lake Community College**
A.S. Business | January 2019
