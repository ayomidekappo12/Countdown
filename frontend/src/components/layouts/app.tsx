"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/utils";
import { ErrorProvider } from "@/lib/ErrorHandlerProvider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingIndicatorProvider } from "@/lib/LoadingIndicatorProvider";
import type { ReactNode } from "react";

type AppProps = {
  children: ReactNode;
};

export default function App({ children }: AppProps) {
  return (
    <ErrorProvider>
      <SWRConfig
        value={{
          fetcher,
          onError: (error: unknown) => {
            console.error(
              error instanceof Error ? error.message : "SWR request failed",
            );
          },
          revalidateOnFocus: true,
        }}
      >
        <LoadingIndicatorProvider />
        {children}
        <Toaster />
      </SWRConfig>
    </ErrorProvider>
  );
}
