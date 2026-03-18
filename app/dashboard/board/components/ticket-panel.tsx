"use client";

import {
  RiBug2Line,
  RiCalendarLine,
  RiCloseLine,
  RiEmphasis,
  RiFlag2Fill,
  RiHistoryLine,
  RiTaskLine,
  RiUserLine,
} from "@remixicon/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PRIORITY_MAP,
  STATUS_MAP_BY_ID,
  USERS,
  type Ticket,
} from "@/lib/mock-data";
import { cn, switchMap } from "@/lib/utils";

function getPriorityClassName(priority: number | null) {
  return switchMap(priority ?? -1, {
    [-1]: "text-muted-foreground",
    0: "text-muted-foreground",
    1: "text-warning",
    2: "text-primary",
    3: "text-destructive",
  });
}

function formatDueDate(value: Date | null) {
  if (!value) {
    return "No due date";
  }

  return value.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]?.toUpperCase() ?? ""}${lastName[0]?.toUpperCase() ?? ""}`;
}

export function TicketPanel({
  ticket,
  open,
  onOpenChange,
  onAnimationEnd,
}: {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnimationEnd?: (open: boolean) => void;
}) {
  const status = ticket ? STATUS_MAP_BY_ID[ticket.statusId] : null;
  const assignee = ticket
    ? (USERS.find((user) => user.id === ticket.assignedId) ?? null)
    : null;

  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-50 flex h-dvh w-100 flex-col border-l bg-background p-4 shadow-lg",
        open
          ? "animate-ticket-panel-in"
          : "animate-ticket-panel-out pointer-events-none",
      )}
      aria-hidden={!open}
      onAnimationEnd={onAnimationEnd ? () => onAnimationEnd(open) : undefined}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs text-muted-foreground">
            {ticket ? ticket.id.toUpperCase() : ""}
          </p>
          <h2 className="text-sm font-semibold leading-tight">
            {ticket?.title ?? ""}
          </h2>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onOpenChange(false)}
          aria-label="Close ticket panel"
        >
          <RiCloseLine />
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{status?.name ?? ""}</Badge>
        <Badge variant="outline">
          {ticket?.type ?? ""}
          {ticket
            ? switchMap(ticket.type, {
                Bug: <RiBug2Line />,
                Task: <RiTaskLine />,
                Story: <RiHistoryLine />,
                Epic: <RiEmphasis />,
              })
            : null}
        </Badge>
        <Badge variant="outline">
          <RiFlag2Fill
            className={getPriorityClassName(ticket?.priority ?? null)}
          />
          {ticket?.priority !== null && ticket?.priority !== undefined
            ? PRIORITY_MAP[ticket.priority]
            : ""}
        </Badge>
      </div>

      <Separator className="mb-4" />

      <div className="space-y-4 text-xs">
        <div>
          <p className="mb-2 text-muted-foreground">Assignee</p>
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback userId={assignee?.id}>
                {assignee ? (
                  <span>
                    {getInitials(assignee.firstName, assignee.lastName)}
                  </span>
                ) : (
                  <RiUserLine size={14} />
                )}
              </AvatarFallback>
            </Avatar>
            <span>
              {assignee ? `${assignee.firstName} ${assignee.lastName}` : ""}
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-muted-foreground">Due date</p>
          <div className="flex items-center gap-2">
            <RiCalendarLine size={14} className="text-muted-foreground" />
            <span>{ticket ? formatDueDate(ticket.dueDate) : ""}</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-muted-foreground">Description</p>
          <div className="rounded-md border bg-card px-3 py-2 text-card-foreground">
            {ticket?.description ?? ""}
          </div>
        </div>
      </div>
    </div>
  );
}
