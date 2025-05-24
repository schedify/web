import { type BundledLanguage, codeToHtml } from "shiki";

interface Props {
  children: string;
  lang: BundledLanguage;
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: "github-dark-default",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
      },
    ],
  });

  return (
    <div className="mr-[14px] flex overflow-hidden rounded-xl bg-[#0C0C0C] text-white ">
      <div className="flex min-w-0 flex-1 flex-col">
        <div
          data-rehype-pretty-code-fragment
          dangerouslySetInnerHTML={{ __html: out ?? "" }}
          className="relative flex-1 overflow-hidden after:absolute after:inset-y-0 after:left-0 after:w-10 after:bg-[#0C0C0C] [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:overflow-auto [&_pre]:!bg-transparent  [&_pre]:py-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
        />
      </div>
    </div>
  );
}
