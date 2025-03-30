export type PageProps = {
  params: Promise<{ [key: string]: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

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
