import { env } from "@/lib/env";
import { ApiError } from "@/lib/api/errors";

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: unknown;
  token?: string;
};

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text.length > 0 ? text : null;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", headers, body, token } = options;

  let response: Response;

  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (error) {
    throw new ApiError(
      `Network request failed: ${method} ${path}`,
      0,
      error instanceof Error ? error.message : "Unknown network error"
    );
  }

  const parsedBody = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(
      `Backend request failed: ${method} ${path}`,
      response.status,
      parsedBody
    );
  }

  return parsedBody as T;
}
