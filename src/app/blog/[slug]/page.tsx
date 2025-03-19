import { getPost } from "@/lib/api";
import { remark } from "remark";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";

import "prismjs/themes/prism-tomorrow.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";

export default async function Post(props: { params: { slug: string } }) {
  const post = getPost(props.params.slug);

  const { author, date, readingTime } = post;

  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(post.content);

  function formatDate(isoString: string) {
    const date = new Date(isoString);

    // Get month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Format as MM/DD/YYYY
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }
  return (
    <article className="w-full px-4 my-24 mx-auto prose prose-sm md:prose-lg xl:prose-xl dark:prose-invert">
      <div className="w-full flex items-center justify-between space-x-4 mb-6 pb-6 border-b not-prose">
        <div className="flex items-center gap-2">
          <Avatar className="h-12 w-12">
            <AvatarImage
              alt={author.name}
              src="https://cdn.towslate.com/public/system/static/nickheadshot.png"
              className="object-cover"
            />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="leading-tight font-medium m-0">{author.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground space-x-3">
              <div className="flex justify-center gap-4 items-center">
                <p className="text-sm text-muted-foreground">
                  Software Engineer
                </p>
                <a
                  href={`https://twitter.com/TheSWEaver`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-sm text-muted-foreground"
                >
                  <Icon icon="hugeicons:new-twitter" className="w-4 h-4" />
                  @TheSWEaver
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Icon
              icon="solar:calendar-minimalistic-linear"
              className="mr-1 h-4 w-4"
            />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center">
            <Icon icon="solar:clock-circle-linear" className="mr-1 h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: result.toString() }} />
    </article>
  );
}
