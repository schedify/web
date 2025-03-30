import { CopyTextComponent } from "@/app/components/CopyText";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchMe } from "../utils/get-apps";

export default async function Configure({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) {
  const p = await params;
  const user = await currentUser();
  if (!user) throw redirect("/");

  const meResp = await fetchMe();
  if (meResp.status === 0) {
    return <div>{meResp.message}</div>;
  }

  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <h3 className="text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
          Developer
        </h3>

        <div className="p-5 border rounded-xl grid grid-rows-1 gap-5 text-sm w-full shadow-md">
          <div className="flex justify-between items-center">
            <span>API Key</span>
            <CopyTextComponent
              className="cursor-pointer hover:bg-blue-50 px-1 py-0.5 rounded-md underline-offset-4 font-geist-mono hover:text-blue-500 "
              text={meResp.data.api_key}
              hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
