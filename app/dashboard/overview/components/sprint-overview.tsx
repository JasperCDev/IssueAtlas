"use client";

import { useMemo } from "react";

import { AssigneeAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TICKETS, TICKET_STATUS_LIST, USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import {
  SortableWidgetCard,
  type SortableWidgetComponentProps,
  withSortableWidget,
} from "./sortable-widget";

function SprintOverviewContent({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  const statusRows = useMemo(() => {
    const statusOrder: Record<string, number> = {
      TODO: 0,
      "IN PROGRESS": 1,
      "IN TESTING": 2,
      DONE: 3,
    };

    return [...TICKET_STATUS_LIST]
      .sort(
        (a, b) =>
          (statusOrder[a.name] ?? Number.MAX_SAFE_INTEGER) -
          (statusOrder[b.name] ?? Number.MAX_SAFE_INTEGER),
      )
      .map((status) => ({
        status,
        users: USERS.map((user) => ({
          ...user,
          tickets: TICKETS.filter(
            (ticket) =>
              ticket.statusId === status.id && ticket.assignedId === user.id,
          ),
        })).filter((user) => user.tickets.length > 0),
      }));
  }, []);

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div className="grid h-full grid-cols-4 gap-2">
        {statusRows.map(({ status, users }) => (
          <div
            key={status.id}
            className="flex h-full min-h-0 w-25 flex-col gap-1"
          >
            <Badge
              size="default"
              variant="outline"
              className={cn(
                "w-fit mb-2",
                status.variant === "blue" && "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                status.variant === "green" && "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
                status.variant === "neutral" && "border-border bg-muted/40 text-muted-foreground",
                status.variant === "yellow" && "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
              )}
            >
              {status.name}
            </Badge>

            <div className="flex min-h-0 flex-1 flex-col flex-wrap content-start gap-1">
              {users.map((user) => {
                return (
                  <div key={user.id} className="flex shrink-0 flex-col gap-1">
                    {user.tickets.map((ticket) => {
                      return (
                        <div
                          key={ticket.id}
                          className="flex items-center"
                          title={ticket.title}
                        >
                          <AssigneeAvatar size="xs" user={user} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SortableWidgetCard>
  );
}

export const SprintOverviewWidget = withSortableWidget(SprintOverviewContent);
