import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSessionData } from "@/app/actions";
import axios from "axios";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

type SessionData = {
  aut?: string;
  role?: string;
};

type ApiErrorResponse = {
  message?: string;
  detail?: string;
  code?: string | number;
};

export const debugLog = (...args: unknown[]): void => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

export const debugError = (...args: unknown[]): void => {
  if (process.env.NODE_ENV === "development") {
    console.error(...args);
  }
};

export async function fetcher<T = unknown>(url: string): Promise<T> {
  const sessionData = await getSessionData();
  const session = JSON.parse(sessionData) as SessionData;

  const config = session.aut
    ? {
        headers: {
          Authorization: `Bearer ${session.aut}`,
        },
      }
    : undefined;

  try {
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const data = error.response?.data;

      const apiError = new Error(
        data?.message ?? data?.detail ?? error.message,
      );

      apiError.cause = data?.code;
      throw apiError;
    }

    throw error;
  }
}
