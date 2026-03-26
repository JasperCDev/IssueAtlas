import { Badge } from "@/components/ui/badge";
import { STATUS_MAP_BY_ID } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useDragOperation, useDroppable } from "@dnd-kit/react";

export function BoardColumn({
  children,
  id,
  count,
}: {
  children?: React.ReactNode;
  id: string;
  count: number;
}) {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });
  const { target } = useDragOperation();

  const isColumnTarget = target?.id === id;
  const targetGroup = (target as { group?: string } | null | undefined)?.group;
  const isGroupTarget = targetGroup === id;
  const isActiveDropTarget = isDropTarget || isColumnTarget || isGroupTarget;

  const status = STATUS_MAP_BY_ID[id];
  return (
    <div
      ref={ref}
      className={cn(
        "w-80 h-full min-h-0 p-0 rounded-lg flex flex-col",

        isActiveDropTarget
          ? {
              "bg-blue-500/5 dark:bg-blue-500/10": status.variant === "blue",
              "bg-green-500/5 dark:bg-green-500/10": status.variant === "green",
              "bg-secondary/50 dark:bg-secondary/70": status.variant === "neutral",
              "bg-yellow-500/5 dark:bg-yellow-500/10": status.variant === "yellow",
            }
          : {},
      )}
    >
      <div className="flex flex-row gap-2 items-center mb-4 p-1">
        <Badge
          size="lg"
          variant="outline"
          className={cn("", {
            "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400": status.variant === "blue",
            "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400": status.variant === "green",
            "border-border bg-muted/40 text-muted-foreground": status.variant === "neutral",
            "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400": status.variant === "yellow",
          })}
        >
          {status.name}
        </Badge>
        <span className="text-base font-semibold">{count}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-1 pr-2">{children}</div>
    </div>
  );
}
