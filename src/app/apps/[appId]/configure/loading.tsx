import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <h3 className="text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
          App
        </h3>

        <div className="p-5 border rounded-xl grid grid-rows-3 gap-2 text-sm w-full shadow-md">
          <div className="flex justify-between">
            <span>App Name</span>
            <Skeleton className="h-[12px] w-[100px]" />
          </div>
          <div className="flex justify-between">
            <span>App ID</span>
            <Skeleton className="h-[12px] w-[100px]" />
          </div>
          <div className="flex justify-between">
            <span>App Secret</span>
            <Skeleton className="h-[12px] w-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
