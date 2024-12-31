import { fetchApp } from "@/app/utils/get-apps";
import { Skeleton } from "@/components/ui/skeleton";
import { cuid } from "@/lib/crypto";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Configure({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) {
  const p = await params;
  const appId = p.appId;

  const user = await currentUser();
  if (!user) throw redirect("/");

  if (!user.publicMetadata.apps.some((app) => app.id === appId))
    throw redirect("/");

  const app = await fetchApp(appId);
  if (!app) throw redirect("/");

  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <h3 className="text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
          App
        </h3>

        <div className="p-5 border rounded-xl grid grid-rows-3 gap-2 text-sm w-full">
          <div className="flex justify-between">
            <span>App Name</span>
            <b>{app.name}</b>
          </div>
          <div className="flex justify-between">
            <span>App ID</span>
            <b>{app.id}</b>
          </div>
          <div className="flex justify-between">
            <span>App Secret</span>
            {/* <span>{cuid()}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
