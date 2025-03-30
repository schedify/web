import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getAccessToken = async () => {
  return (await cookies()).get("__session")?.value || null;
};

type Pagination = {
  page: number;
  limit: number;
};

export const makeRequest = async <T extends unknown>(
  url: string,
  method: string,
  query: Record<string, string> = {},
): Promise<T> => {
  const tkn = await getAccessToken();
  if (!tkn) throw redirect("/login");

  const u = new URL(process.env.NEXT_PUBLIC_API_URL + url);

  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const value = query[key];
      u.searchParams.set(key, value);
    }
  }

  try {
    const resp = await fetch(u, {
      method,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    });

    // unauthenticated, go to login
    if (resp.status === 401) {
      redirect("/login");
    }

    return resp.json() as T;
  } catch (e) {
    console.log(e);

    return {
      status: 0,
      message: "Schedify API is not responding",
      code: "api_unaccessabile",
    } as T;
  }
};

export const fetchWebhooks = cache(async () => {
  const res = await makeRequest(`/webhooks/`, "GET");
  return res as
    | {
        status: 0;
        message: string;
        debug: string;
        code: string;
      }
    | {
        status: 1;
        webhooks: {
          id: string;
          name: string;
          url: string;
          created_at: number;
          updated_at: number;
        }[];
        count: number;
      };
});

export const fetchMe = cache(async () => {
  const res = await makeRequest(`/me/`, "GET");
  return res as
    | {
        status: 0;
        message: string;
        debug: string;
        code: string;
      }
    | {
        status: 1;
        data: {
          id: string;
          clerk_id: string;
          full_name: string;
          email: string;
          api_key: string;
          created_at: number;
          updated_at: number;
          deleted_at: number;
        };
      };
});

export const fetchAppWebhooks = cache(
  async (appId: string, { page, limit }: Pagination) => {
    return makeRequest<
      | {
          status: 0;
          message: string;
          debug?: string;
          code: string;
        }
      | {
          status: 1;
          webhooks: {
            id: string;
            url: string;
            created_at: string;
            updated_at: string;
          }[];
          count: number;
        }
    >(`/apps/${appId}/webhooks?page=${page}&limit=${limit}`, "GET");
  },
);
