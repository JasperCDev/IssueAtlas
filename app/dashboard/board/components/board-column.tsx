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
              "bg-chart-1/6": status.variant === "blue",
              "bg-success/6": status.variant === "green",
              "bg-secondary/28": status.variant === "neutral",
              "bg-chart-3/6": status.variant === "violet",
              "bg-chart-4/6": status.variant === "yellow",
            }
          : {},
      )}
    >
      <div className="flex flex-row gap-2 items-center mb-4 p-1">
        <Badge
          size="lg"
          variant="outline"
          className={cn("", {
            "border-chart-1/30 bg-chart-1/15 text-chart-1": status.variant === "blue",
            "border-success/30 bg-success/15 text-success": status.variant === "green",
            "border-border bg-muted/40 text-muted-foreground": status.variant === "neutral",
            "border-chart-3/30 bg-chart-3/15 text-chart-3": status.variant === "violet",
            "border-chart-4/30 bg-chart-4/15 text-chart-4": status.variant === "yellow",
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
