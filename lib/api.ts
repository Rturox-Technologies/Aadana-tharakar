import { useAuthStore } from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nilamnai.in/v1";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export class APIError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;
  
  // Format query parameters if provided
  let queryString = "";
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, val);
      }
    });
    queryString = `?${searchParams.toString()}`;
  }

  const url = `${API_URL}${endpoint}${queryString}`;

  // Read current token dynamically from the Zustand auth store
  const token = useAuthStore.getState().token;

  const defaultHeaders: Record<string, string> = {};

  // JWT REQUEST INTERCEPTOR PLACEHOLDER:
  // Dynamically inject authorization headers if JWT is present in client session
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Set JSON Content-Type only when not uploading FormData
  if (!(customConfig.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const config: RequestInit = {
    method: customConfig.method || "GET",
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  };

  try {
    const response = await fetch(url, config);

    // JWT RESPONSE INTERCEPTOR PLACEHOLDER:
    // Handle specific status codes globally (e.g. 401 Unauthorized token expirations)
    if (!response.ok) {
      if (response.status === 401) {
        // JWT Interceptor Placeholder for Token Refresh/Logout Trigger:
        // e.g. Trigger refresh token request or logout using:
        // useAuthStore.getState().logout();
      }

      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "An unexpected error occurred" };
      }

      throw new APIError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new Error(error instanceof Error ? error.message : "Network request failed");
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: "GET" }),
    
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return request<T>(endpoint, { ...options, method: "POST", body: requestBody });
  },

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return request<T>(endpoint, { ...options, method: "PUT", body: requestBody });
  },

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return request<T>(endpoint, { ...options, method: "PATCH", body: requestBody });
  },
    
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
