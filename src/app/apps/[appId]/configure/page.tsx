import { cuid } from "@/lib/crypto";

export default function Configure() {
  return (
    <div className="container mt-10 space-y-10">
      <div className="space-y-5">
        <h3 className="text-2xl font-[family-name:var(--font-geist-sans)] text-primary font-semibold tracking-tight">
          App
        </h3>

        <div className="p-5 border rounded-xl grid grid-rows-3 gap-2 text-sm w-full">
          <div className="flex justify-between">
            <span>App Name</span>
            <span>App Name</span>
          </div>
          <div className="flex justify-between">
            <span>App ID</span>
            <span>1234</span>
          </div>
          <div className="flex justify-between">
            <span>App Secret</span>
            <span>{cuid()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
