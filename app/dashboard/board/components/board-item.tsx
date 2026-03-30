import { memo } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Ticket, USERS } from "@/lib/mock-data";
import { BoardItemAssignee } from "./board-item-assignee";
import { BoardItemPriority } from "./board-item-priority";
import { BoardItemDueDate } from "./board-item-due-date";
import { cn, switchMap } from "@/lib/utils";
import {
  RiBug2Line,
  RiEmphasis,
  RiHistoryLine,
  RiTaskLine,
} from "@remixicon/react";
import { Badge } from "@/components/ui/badge";

export function BoardItem({
  index,
  ticket,
  column,
  onOpen,
  selected,
}: {
  index: number;
  ticket: Ticket;
  column: string;
  onOpen: (ticketId: string) => void;
  selected: boolean;
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

    onOpen(ticket.id);
  };

  return (
    <div className="w-full" onClick={handleTicketClick}>
      <div
        className={cn(
          "flex flex-col align-start bg-card text-card-foreground p-2 mb-2 rounded-lg cursor-pointer w-full",
          selected
            ? "ring-1 ring-primary bg-primary/5"
            : "ring-1 ring-foreground/10",
        )}
        ref={ref}
        data-dragging={isDragging}
      >
        <p className="mb-4 text-start">{ticket.title}</p>
        <div className="flex flex-row justify-between items-center">
          <Badge variant="secondary" size="lg">
            {ticket.id.toUpperCase()}
            {switchMap(ticket.type, {
              Bug: <RiBug2Line />,
              Task: <RiTaskLine />,
              Story: <RiHistoryLine />,
              Epic: <RiEmphasis />,
            })}
          </Badge>
          <div className="flex flex-row gap-2 items-center">
            <BoardItemAssignee users={USERS} assignedId={ticket.assignedId} />
            <BoardItemPriority priority={ticket.priority} />
            <BoardItemDueDate ticket={ticket} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const MemoBoardItem = memo(BoardItem);
