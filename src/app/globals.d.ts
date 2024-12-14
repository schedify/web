import { Webhook, App } from "@/db/schema";

export {};

declare global {
  interface UserPublicMetadata {
    apps: (Omit<App, "userId"> & {
      webhooks: {
        id: string;
        url: string;
        enabled: boolean;
        createdAt: number;
        updatedAt: number;
      }[];
    })[];
  }
}
