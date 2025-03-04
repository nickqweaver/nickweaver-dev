import { getPost } from "@/lib/api";
import { remark } from "remark";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";

import "prismjs/themes/prism-tomorrow.css";

export default async function Post(props: { params: { slug: string } }) {
  const markdown = getPost(props.params.slug);

  const result = await remark()
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown.content);

  return (
    <main className="w-full px-4 my-24 prose prose-sm md:prose-lg xl:prose-xl dark:prose-invert mx-auto">
      <div dangerouslySetInnerHTML={{ __html: result.toString() }} />
    </main>
  );
}
