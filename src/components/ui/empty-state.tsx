import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

/** Shared empty state for cart, catalog, and every category/filter page — no emoji, one visual language. */
export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, onActionClick, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-20 px-4 text-center ${className}`}>
      <div className="flex items-center justify-center h-16 w-16 rounded-full" style={{ background: "#132A20" }}>
        <Icon className="h-8 w-8" style={{ color: "#4CC95F" }} strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="text-xl font-bold" style={{ color: "#F5F2EC" }}>{title}</h3>
        {description && <p className="text-muted-foreground text-sm mt-1 max-w-xs">{description}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link href={actionHref} onClick={onActionClick}>
          <Button className="btn-primary text-white gap-2 mt-2">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
