/**
 * Unified API Client for communicating with the CodeSlot Express Backend
 */

const getApiBaseUrl = (): string => {
  try {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
      return envUrl.trim().replace(/\/$/, '');
    }
  } catch {
    // ignore
  }
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

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
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

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
