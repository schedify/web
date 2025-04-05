import { Webhook, App } from "@/db/schema";
import { UserPlan } from "./types";

export {};

declare global {
  interface UserPublicMetadata {
    apps: (Omit<App, "userId" | "secret"> & {
      webhooks: {
        id: string;
        url: string;
        enabled: boolean;
        createdAt: number;
        updatedAt: number;
      }[];
    })[];
    plan: UserPlan;
  }
}
