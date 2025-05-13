"use client";
import React from "react";
import NextTopLoader from "nextjs-toploader";

interface LoadingIndicatorProviderProps {
  children?: React.ReactNode;
}

export const LoadingIndicatorProvider = ({
  children,
}: LoadingIndicatorProviderProps) => {
  return (
    <>
      {children}
      <NextTopLoader
        height={2}
        color="#3B82F6"
        showSpinner={true}
      />
    </>
  );
};
