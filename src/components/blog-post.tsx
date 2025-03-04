import { Post } from "@/lib/api";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function BlogPost({ title, excerpt, date, slug }: Post) {
  function truncate(str: string) {
    return `${str.substr(0, 150)}...`;
  }
  return (
    <div className="p-6 rounded-lg border-teal border-2 border-solid bg-background/80 backdrop-filter backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-2 gradient-text">{title}</h2>
      <p className="text-muted-foreground mb-4">{truncate(excerpt)}</p>
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center text-primary hover:underline"
      >
        Read more
        <Icon icon="solar:arrow-right-linear" className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}
