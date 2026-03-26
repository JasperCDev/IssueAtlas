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
    return TICKET_STATUS_LIST.map((status) => ({
        status,
        users: [
          ...USERS.map((user) => ({
            id: user.id,
            user,
            tickets: TICKETS.filter(
              (ticket) =>
                ticket.statusId === status.id && ticket.assignedId === user.id,
            ),
          })),
          {
            id: "__unassigned__",
            user: null,
            tickets: TICKETS.filter(
              (ticket) =>
                ticket.statusId === status.id && ticket.assignedId === null,
            ),
          },
        ].filter((entry) => entry.tickets.length > 0),
      }));
  }, []);

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div
        className="grid h-full gap-2 grid-cols-5 w-full"
        style={{ gridTemplateColumns: `repeat(${statusRows.length}, minmax(0, 1fr))` }}
      >
        {statusRows.map(({ status, users }) => (
          <div
            key={status.id}
            className={cn(
              "flex h-full min-h-0 flex-col gap-1 rounded-lg p-2",
              status.variant === "blue" && "bg-blue-500/5 dark:bg-blue-500/10",
              status.variant === "green" && "bg-green-500/5 dark:bg-green-500/10",
              status.variant === "neutral" && "bg-secondary/50 dark:bg-secondary/70",
              status.variant === "violet" && "bg-violet-500/5 dark:bg-violet-500/10",
              status.variant === "yellow" && "bg-yellow-500/5 dark:bg-yellow-500/10",
            )}
          >
            <Badge
              size="default"
              variant="outline"
              className={cn(
                "w-fit mb-1 p-1 h-4",
                status.variant === "blue" && "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                status.variant === "green" && "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
                status.variant === "neutral" && "border-border bg-muted/40 text-muted-foreground",
                status.variant === "violet" && "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
                status.variant === "yellow" && "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
              )}
            >
              {status.name}
            </Badge>

            <div className="flex min-h-0 flex-1 flex-col flex-wrap content-start gap-1 pl-1">
              {users.map((entry) => {
                return (
                  <div key={entry.id} className="flex shrink-0 flex-col gap-1">
                    {entry.tickets.map((ticket) => {
                      return (
                        <div
                          key={ticket.id}
                          className="flex items-center"
                          title={ticket.title}
                        >
                          <AssigneeAvatar size="xs" user={entry.user} />
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
