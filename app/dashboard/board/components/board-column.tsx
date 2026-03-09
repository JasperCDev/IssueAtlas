import { cn } from "@/lib/utils";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";

export function BoardColumn({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: string;
}) {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div ref={ref} className={cn("w-80 h-full border-r p-4 mb-2", isDropTarget && "bg-muted")}>
      <h2 className="text-base font-semibold">{id}</h2>
      {children}
    </div>
  );
}
