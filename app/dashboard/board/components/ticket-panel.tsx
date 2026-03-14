"use client";

import { format } from "date-fns";
import { RiBug2Line, RiCalendarLine, RiEmphasis, RiFlag2Fill, RiHistoryLine, RiTaskLine, RiUserLine } from "@remixicon/react";

import {
  PRIORITY_MAP,
  STATUS_MAP_BY_ID,
  USERS,
  type Ticket,
} from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn, switchMap } from "@/lib/utils";

function getPriorityClassName(priority: number | null) {
  if (priority === null || priority === 0) return "text-muted-foreground";
  if (priority === 1) return "text-warning";
  if (priority === 2) return "text-primary";
  return "text-destructive";
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]?.toUpperCase() ?? ""}${lastName[0]?.toUpperCase() ?? ""}`;
}

export function TicketPanel({
  ticket,
  open,
  onOpenChange,
}: {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const status = ticket ? STATUS_MAP_BY_ID[ticket.statusId] : null;
  const assignee = ticket?.assignedId
    ? USERS.find((u) => u.id === ticket.assignedId) ?? null
    : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent side="right" showOverlay={false} className="sm:max-w-md flex flex-col gap-0 p-0">
        {ticket && (
          <>
            <SheetHeader className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground font-mono">
                  {ticket.id.toUpperCase()}
                </span>
                {status && (
                  <Badge
                    size="lg"
                    className={cn({
                      "bg-blue-500": status.variant === "blue",
                      "bg-green-500": status.variant === "green",
                      "bg-secondary text-secondary-foreground":
                        status.variant === "neutral",
                    })}
                  >
                    {status.name}
                  </Badge>
                )}
              </div>
              <SheetTitle className="text-base font-semibold leading-snug pr-8">
                {ticket.title}
              </SheetTitle>
            </SheetHeader>

            <Separator />

            <div className="flex flex-col gap-5 px-6 py-5 overflow-y-auto flex-1">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Description
                </span>
                {ticket.description ? (
                  <p className="text-sm text-foreground leading-relaxed">
                    {ticket.description}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    No description
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Assignee
                </span>
                {assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback userId={assignee.id}>
                        <span className="text-xs">
                          {getInitials(assignee.firstName, assignee.lastName)}
                        </span>
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">
                      {assignee.firstName} {assignee.lastName}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <RiUserLine size={14} />
                    <span className="text-xs">Unassigned</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Type
                </span>
                <div className="flex items-center gap-1.5">
                  {switchMap(ticket.type, {
                    Bug: <RiBug2Line size={14} className="text-destructive" />,
                    Task: <RiTaskLine size={14} className="text-primary" />,
                    Story: <RiHistoryLine size={14} className="text-muted-foreground" />,
                    Epic: <RiEmphasis size={14} className="text-warning" />,
                  })}
                  <span className="text-xs">{ticket.type}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Priority
                </span>
                <div className="flex items-center gap-1.5">
                  <RiFlag2Fill
                    size={14}
                    className={getPriorityClassName(ticket.priority)}
                  />
                  <span className="text-xs">
                    {ticket.priority !== null
                      ? PRIORITY_MAP[ticket.priority]
                      : "None"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Due date
                </span>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <RiCalendarLine size={14} />
                  <span className="text-xs">
                    {ticket.dueDate
                      ? format(ticket.dueDate, "MMM d, yyyy")
                      : "No due date"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
