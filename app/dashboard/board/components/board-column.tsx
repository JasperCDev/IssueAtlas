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

  // `isDropTarget` can briefly switch to item targets; keep the column active
  // when hovering sortable items that belong to this column group.
  const isColumnTarget = target?.id === id;
  const targetGroup = (target as { group?: string } | null | undefined)?.group;
  const isGroupTarget = targetGroup === id;
  const isActiveDropTarget = isDropTarget || isColumnTarget || isGroupTarget;

  const status = STATUS_MAP_BY_ID[id];
  return (
    <div
      ref={ref}
      className={cn(
        "w-80 h-auto p-2 mb-2 mr-2 rounded-lg first:pl-0 last:pr-0 overflow-y-auto",

        isActiveDropTarget
          ? {
              "bg-blue-500/5": status.variant === "blue",
              "bg-green-500/5": status.variant === "green",
              "bg-secondary/50": status.variant === "neutral",
            }
          : {
              // "bg-blue-500/3": status.variant === "blue",
              // "bg-green-500/3": status.variant === "green",
              // "bg-secondary/3": status.variant === "neutral",
            },
      )}
    >
      <div className="flex flex-row gap-2 items-center mb-4">
        <Badge
          size="lg"
          className={cn('',{
            "bg-blue-500": status.variant === "blue",
            "bg-green-500": status.variant === "green",
            "bg-secondary text-secondary-foreground": status.variant === "neutral",
          })}
        >
          {status.name}
        </Badge>
        <span className="text-base font-semibold">{count}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
