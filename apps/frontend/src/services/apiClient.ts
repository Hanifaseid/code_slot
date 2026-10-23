/**
 * Unified API Client for communicating with the CodeSlot Express Backend
 */

export const getActiveApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    // When running on any deployed origin (e.g. *.vercel.app, codeslot-nine.vercel.app, or custom domain):
    if (!isLocalhost) {
      try {
        const envUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
        // Only use external URL if it is an explicit HTTPS remote service (never localhost)
        if (
          envUrl &&
          envUrl.startsWith('https://') &&
          !envUrl.includes('localhost') &&
          !envUrl.includes('127.0.0.1')
        ) {
          return envUrl.replace(/\/$/, '');
        }
      } catch {
        // ignore
      }
      // On deployed origins, ALWAYS default to same-origin '/api' (handled by Vercel serverless /api/index.ts)
      return '/api';
    }

    // On localhost local development:
    try {
      const envUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
      if (envUrl && envUrl.length > 0) {
        return envUrl.replace(/\/$/, '');
      }
    } catch {
      // ignore
    }

    // Default to '/api' which Vite proxies to http://localhost:5000
    return '/api';
  }

  return '/api';
};

export const API_BASE_URL = getActiveApiBaseUrl();

/**
 * Get active auth token from localStorage
 */
export function getStoredAuthToken(): string | null {
  try {
    const directToken = localStorage.getItem('codeslot_auth_token');
    if (directToken) return directToken;

    const storedUser = localStorage.getItem('codeslot_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed?.token) return parsed.token;
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Set active auth token
 */
export function setStoredAuthToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem('codeslot_auth_token', token);
    } else {
      localStorage.removeItem('codeslot_auth_token');
    }
  } catch {
    // ignore
  }
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  let url = endpoint;

  if (!endpoint.startsWith('http')) {
    const baseUrl = getActiveApiBaseUrl();
    url = `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  } else if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    (endpoint.includes('localhost:5000') || endpoint.includes('127.0.0.1:5000'))
  ) {
    // Automatic safeguard for deployed environments (e.g. Vercel):
    // Rewrite any hardcoded localhost:5000 requests to same-origin relative /api
    url = endpoint.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000/, '');
    if (!url.startsWith('/api')) {
      url = `/api${url.startsWith('/') ? '' : '/'}${url}`;
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getStoredAuthToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

    if (!res.ok) {
      const errorMsg =
        json?.error?.message ||
        `Request failed with status ${res.status}: ${res.statusText}`;
      return { success: false, error: errorMsg };
    }

    if (json && typeof json === 'object' && 'success' in json) {
      return {
        success: json.success,
        data: json.data as T,
        error: json.error?.message,
      };
    }

    return { success: true, data: (json as unknown as T) ?? undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network connection failure';
    return { success: false, error: message };
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
};
