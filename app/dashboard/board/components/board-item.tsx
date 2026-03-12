import { useSortable } from "@dnd-kit/react/sortable";
import { PRIORITY_MAP, Ticket, USERS } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMemo } from "react";
import { RiFlag2Fill, RiUserLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";

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
      <p className="mb-2">{ticket.title}</p>
      <div className="flex flex-row gap-2 items-center">
        <Avatar size="sm">
          <AvatarFallback>
            {user ? (
              <span className="text-xs">{user.firstName[0].toUpperCase() + user.firstName[1].toUpperCase()}</span>
            ) : (
              <RiUserLine size="16" />
            )}
          </AvatarFallback>
        </Avatar>
        <Badge size="lg" variant="outline"><RiFlag2Fill size="16" /> {PRIORITY_MAP[ticket.priority]}</Badge>
      </div>
    </div>
  );
}
