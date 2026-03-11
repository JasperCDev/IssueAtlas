import { useSortable } from "@dnd-kit/react/sortable";
import { Ticket, USERS } from "@/lib/mock-data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useMemo } from "react";
import { RiUserLine } from "@remixicon/react";

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

  const user = useMemo(() => {
    if (!ticket.assignedId) return null;
    return USERS.find((u) => u.id === ticket.assignedId) || null;
  }, [ticket.assignedId]);

  return (
    <div
      className="flex flex-col bg-card text-card-foreground p-2 w-full mb-2 rounded-lg cursor-pointer ring-1 ring-foreground/10"
      ref={ref}
      data-dragging={isDragging}
    >
      <p>{ticket.title}</p>
      <div className="flex flex-row">
        <Avatar size="sm">
          <AvatarFallback>
            {user ? (
              user.firstName[0].toUpperCase() + user.firstName[1].toUpperCase()
            ) : (
              <RiUserLine size="16" />
            )}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
