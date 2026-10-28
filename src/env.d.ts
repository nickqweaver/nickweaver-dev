/// <reference types="vite/client" />

declare module "virtual:content" {
  export const posts: import("./lib/api").PostWithHtml[]
  export const resume: import("./lib/api").Resume
}
