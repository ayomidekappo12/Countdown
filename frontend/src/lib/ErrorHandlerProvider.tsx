"use client";

import { createContext, useContext, type ReactNode } from "react";

type ApplicationError = {
  message?: string;
  code?: number | string;
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

type ErrorHandler = (error: unknown) => void;

const ErrorHandlerContext = createContext<ErrorHandler | undefined>(undefined);

interface ErrorHandlerProviderProps {
  children?: ReactNode;
}

function toApplicationError(error: unknown): ApplicationError {
  if (typeof error !== "object" || error === null) {
    return {};
  }

  return error as ApplicationError;
}

export function ErrorProvider({ children }: ErrorHandlerProviderProps) {
  const handleError = (error: unknown): void => {
    const applicationError = toApplicationError(error);

    console.error(applicationError.message ?? "An unexpected error occurred");

    const status = applicationError.response?.status ?? applicationError.code;

    if (status === 401 || status === "401") {
      // auth.logout();
    }
  };

  return (
    <ErrorHandlerContext.Provider value={handleError}>
      {children}
    </ErrorHandlerContext.Provider>
  );
}

export function useErrorHandler(): ErrorHandler {
  const context = useContext(ErrorHandlerContext);

  if (!context) {
    throw new Error("useErrorHandler must be used within an <ErrorProvider>");
  }

  return context;
}
