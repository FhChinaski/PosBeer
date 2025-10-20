"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: "8px",
          fontFamily: "system-ui, sans-serif",
        },
      }}
    />
  );
}
