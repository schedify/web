"use client";

import dynamic from "next/dynamic";

const AceEditor = dynamic(() => import("react-ace"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

import { type FC } from "react";

export const JSONCodeBlock: FC<{ code: string }> = ({ code }) => (
  <AceEditor
    style={{
      width: "100%",
      height: 200,
    }}
    mode="json"
    theme="xcode"
    wrapEnabled
    highlightActiveLine={false}
    name="payload"
    defaultValue={code}
    readOnly
    showGutter={false}
    editorProps={{ $blockScrolling: true }}
  />
);
