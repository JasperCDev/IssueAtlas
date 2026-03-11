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
        "w-80 h-full p-4 mb-2 mr-2 rounded-lg",

        isActiveDropTarget
          ? {
              "bg-blue-500/15": status.variant === "blue",
              "bg-green-500/15": status.variant === "green",
              "bg-neutral-200/15": status.variant === "neutral",
            }
          : {
              "bg-blue-500/3": status.variant === "blue",
              "bg-green-500/3": status.variant === "green",
              "bg-neutral-200/3": status.variant === "neutral",
            },
      )}
    >
      <div className="flex flex-row gap-2 items-center mb-4">
        <Badge
          size="lg"
          className={cn('text-secondary-foreground',{
            "bg-blue-300": status.variant === "blue",
            "bg-green-300": status.variant === "green",
            "bg-neutral-200": status.variant === "neutral",
          })}
        >
          {status.name}
        </Badge>
        <span className="text-sm">{count}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
