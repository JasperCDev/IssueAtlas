import { useSortable } from "@dnd-kit/react/sortable";
import { Ticket, USERS } from "@/lib/mock-data";
import { BoardItemAssignee } from "./board-item-assignee";
import { BoardItemPriority } from "./board-item-priority";
import { BoardItemDueDate } from "./board-item-due-date";

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

  const handleTicketClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-interactive="true"]')) {
      return;
    }

    alert("ticket clicked");
  };

  return (
    <div
      className="w-full"
      onClick={handleTicketClick}
    >
      <div
        className="flex flex-col align-start bg-card text-card-foreground p-2 mb-2 rounded-lg cursor-pointer ring-1 ring-foreground/10 w-full"
        ref={ref}
        data-dragging={isDragging}
      >
        <p className="mb-2 text-start">{ticket.title}</p>
        <div className="flex flex-row gap-2 items-center">
          <BoardItemAssignee users={USERS} assignedId={ticket.assignedId} />
          <BoardItemPriority priority={ticket.priority} />
          <BoardItemDueDate dueDate={ticket.dueDate} />
        </div>
      </div>
    </div>
  );
}
