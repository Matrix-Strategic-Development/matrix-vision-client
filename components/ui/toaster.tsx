"use client";

import * as React from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-md",
          title: "group-[.toast]:font-display group-[.toast]:text-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-foreground group-[.toast]:text-primary-foreground group-[.toast]:rounded-sm",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-sm",
        },
      }}
      {...props}
    />
  );
};
Toaster.displayName = "Toaster";

export { Toaster };
