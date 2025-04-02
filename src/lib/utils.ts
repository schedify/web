import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { codeToHtml } from "shiki";

export async function highlightCode(code: string) {
  const html = await codeToHtml(code, {
    lang: "jsx",
    theme: "github-dark-default",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
      },
    ],
  });

  return html;
}
