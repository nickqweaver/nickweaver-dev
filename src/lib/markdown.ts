import { remark } from "remark"
import rehypePrism from "rehype-prism-plus"
import rehypeStringify from "rehype-stringify"
import remarkRehype from "remark-rehype"
import remarkGfm from "remark-gfm"

/**
 * Renders markdown content to HTML string using the remark/rehype pipeline.
 * Supports GitHub Flavored Markdown and Prism syntax highlighting.
 */
export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(content)

  return result.toString()
}
