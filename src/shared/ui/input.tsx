import * as React from "react";

import { cn } from "../cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-brand selection:text-brand-foreground flex h-9 w-full min-w-0 rounded-md border border-border bg-input/40 px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-brand focus-visible:ring-brand/40 focus-visible:ring-[3px]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
