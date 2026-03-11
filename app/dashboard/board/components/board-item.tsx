
import { useSortable } from "@dnd-kit/react/sortable";
import { Ticket } from "@/lib/mock-data";

export function BoardItem({
  index,
  ticket,
  column,
}: {
  index: number;
  ticket: Ticket;
  column: string;
}) {
  const { ref, isDragging } = useSortable({
    id: ticket.id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <div
      className="flex flex-col bg-card text-card-foreground p-2 w-full mb-2 rounded-lg cursor-pointer ring-1 ring-foreground/10"
      ref={ref}
      data-dragging={isDragging}
    >
      <p>{ticket.title}</p>
      <div className="flex flex-row">

      </div>
    </div>
  );
}
