import { useSortable } from "@dnd-kit/react/sortable";

export function BoardItem({
  index,
  id,
  column,
}: {
  index: number;
  id: string;
  column: string;
}) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <button
      className="bg-card text-card-foreground p-2 w-full mb-2 rounded-lg cursor-pointer ring-1 ring-foreground/10"
      ref={ref}
      data-dragging={isDragging}
    >
      {id}
    </button>
  );
}
