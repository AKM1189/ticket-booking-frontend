import { LoadingOverlay } from "@mantine/core";
import React, { useEffect } from "react";
import { useLoadingStore } from "./store/useLoading";

const LoadingProvider = ({ children }) => {
  const { isLoading } = useLoadingStore();
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);
  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{
          radius: "sm",
          blur: 1,
          backgroundOpacity: 0.3,
          color: "var(--color-primary)",
        }}
        loaderProps={{
          color: "var(--color-blueGray)",
          type: "dots",
          size: "lg",
        }}
      />
      {children}
    </>
  );
};

export default LoadingProvider;
