import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { useLoadingStore } from "./store/useLoading";

const LoadingProvider = ({ children }) => {
  const { isLoading } = useLoadingStore();
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      console.log("is Loading....", isLoading);
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
        pos={"fixed"}
        overlayProps={{
          radius: "sm",
          blur: 1,
          backgroundOpacity: 0.3,
          color: "var(--color-primary)",
        }}
        loaderProps={{
          color: "var(--color-blueGray)",
          type: "dots",
          size: "xl",
        }}
      />

      {children}
    </>
  );
};

export default LoadingProvider;
