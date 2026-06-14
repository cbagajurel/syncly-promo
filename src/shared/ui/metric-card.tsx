import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../cn";

export interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
  visual?: ReactNode;
}

export function MetricCard({
  label,
  value,
  delta,
  trend = "neutral",
  icon,
  visual,
}: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5">
      <div className="relative">
        <div className="mb-3 flex items-start justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          {icon && (
            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold tracking-tight tabular-nums lg:text-3xl">
              {value}
            </span>
            {delta && (
              <span
                className={cn(
                  "mb-1 flex items-center gap-1 text-sm font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground",
                )}
              >
                {trend === "up" && <TrendingUp className="size-3.5" />}
                {trend === "down" && <TrendingDown className="size-3.5" />}
                {delta}
              </span>
            )}
          </div>
          {visual && <span className="text-brand/70 shrink-0">{visual}</span>}
        </div>
      </div>
    </div>
  );
}
