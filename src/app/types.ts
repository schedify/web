export type PageProps = {
  params: Promise<{ [key: string]: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export type UserPlan = "FREE" | "STARTER" | "GROWTH" | "SCALE";

export type App = {
  id: string;
  name: string;
  secret: string | null;
  created_at: number;
  updated_at: number;
};

export type Webhook = {
  id: string;
  name: string;
  url: string;
  secret: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
};

export type WebhookEvent = {
  id: string;
  event_name: string;
  status: "DELIVERED" | "ERRORED" | "PENDING" | "CANCELLED";
  payload: any;
  scheduled_for: number;
  processed_at: number;
  error_reason: string | null;
  created_at: number;
  updated_at: number;
};

export type Event = {
  id: string;
  name: string;
  status: "DELIVERED" | "ERRORED" | "PENDING" | "CANCELLED";
  payload: any;
  tries: Array<{
    attempt: number;
    at: number;
    error_reason: string | null;
    status_code: number | null;
  }> | null;
  scheduled_for: number;
  next_retry_at: number;
  processed_at: number;
  created_at: number;
  updated_at: number;
};
