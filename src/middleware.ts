import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { MiddlewareConfig } from "next/server";

export default clerkMiddleware();

export const config: MiddlewareConfig = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
