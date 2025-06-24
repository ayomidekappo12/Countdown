import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSessionData } from "@/app/actions";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

// utils/debug.ts
export const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

export const debugError = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.error(...args);
  }
};

export const fetcher = async (url: string) => {
  const token = JSON.parse(await getSessionData()).aut;
  const config = token
    ? {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    : {};

  return api
    .get(url, config)
    .then((res) => res.data)
    .catch((exception: any) => {
      const error = new Error(exception.message);
      error.message = exception.detail;
      error.cause = exception.code;
      throw error;
    });
};