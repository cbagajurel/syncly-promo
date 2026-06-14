import * as React from "react";

import { cn } from "../cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground flex min-h-16 w-full rounded-md border border-border bg-input/40 px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-brand focus-visible:ring-brand/40 focus-visible:ring-[3px]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
