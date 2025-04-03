import { cache } from "react";
import { makeRequest } from "./get-apps";
import { Webhook, WebhookEvent } from "../types";

export const fetchWebhook = cache(async (webhookId: string) => {
  const res = await makeRequest(`/webhooks/${webhookId}/`, "GET");
  return res as
    | {
        status: 0;
        message: string;
        debug: string;
        code: string;
      }
    | {
        status: 1;
        webhook: Webhook;
      };
});

export const fetchWebhookLogs = cache(
  async (webhookId: string, status: string) => {
    const res = await makeRequest(`/webhooks/${webhookId}/events`, "GET");
    return res as
      | {
          status: 0;
          message: string;
          debug: string;
          code: string;
        }
      | {
          status: 1;
          events: WebhookEvent[];
          count: number;
        };
  },
);
