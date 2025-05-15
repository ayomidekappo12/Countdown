"use client";

import React from "react";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/utils";
import { ErrorProvider } from "@/lib/ErrorHandlerProvider";
import { Toaster } from "@/components/ui/sonner";

import { LoadingIndicatorProvider } from "@/lib/LoadingIndicatorProvider";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
      <ErrorProvider>
        <SWRConfig
          value={{
            fetcher,
            onError: (error) => {
              //log
              console.log(error.message);
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
};

export default App;
