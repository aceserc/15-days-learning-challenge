"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-6 text-primary" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2 border-b pb-2"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-xl font-semibold mt-6 mb-3 text-foreground"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside space-y-2 my-4 pl-4"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-2 my-4 pl-4"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="text-muted-foreground" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p
              className="leading-7 [&:not(:first-child)]:mt-4 text-muted-foreground"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-primary hover:underline font-medium underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          code: ({ node, ...props }) => {
            const { className, children, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
                <code className={className} {...rest}>
                  {children}
                </code>
              </div>
            ) : (
              <code
                className="bg-muted px-[0.3rem] py-[0.2rem] rounded text-sm font-mono"
                {...rest}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
};
