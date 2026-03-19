"use client";

import {
  RiBug2Line,
  RiCalendarLine,
  RiEmphasis,
  RiFlag2Fill,
  RiHistoryLine,
  RiTaskLine,
  RiUserLine,
} from "@remixicon/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PRIORITY_MAP, STATUS_MAP_BY_ID, USERS, type Ticket } from "@/lib/mock-data";
import { switchMap } from "@/lib/utils";

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

export function TicketPanelDetails({ ticket }: { ticket: Ticket | null }) {
  const status = ticket ? STATUS_MAP_BY_ID[ticket.statusId] : null;
  const assignee = ticket
    ? (USERS.find((user) => user.id === ticket.assignedId) ?? null)
    : null;

  return (
    <>
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
    </>
  );
}
