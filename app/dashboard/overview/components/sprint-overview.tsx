"use client";

import { useMemo } from "react";

import { AssigneeAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  TICKETS,
  TICKET_STATUS_LIST,
  Ticket,
  USERS,
  User,
} from "@/lib/mock-data";
import { cn, derive } from "@/lib/utils";

import {
  SortableWidgetCard,
  type SortableWidgetComponentProps,
  withSortableWidget,
} from "./sortable-widget";

function groupTicketsByUser(
  tickets: Ticket[],
  user: User | null,
): Array<{ user: User | null; tickets: Ticket[] }> {
  const groups: Array<{ user: User | null; tickets: Ticket[] }> = [];

  for (let i = 0; i < tickets.length; i += 9) {
    const groupTickets = tickets.slice(i, Math.min(i + 9, tickets.length));
    groups.push({
      user,
      tickets: groupTickets,
    });
  }

  return groups;
}

function SprintOverviewContent({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  const statusRows = useMemo(() => {
    return TICKET_STATUS_LIST.map((status) => ({
      status,
      ticketGroups: derive(() => {
        const tickets = TICKETS.filter(
          (ticket) => ticket.statusId === status.id,
        );
        const ticketGroups: Array<{ user: User | null; tickets: Ticket[] }> =
          [];
        const seenTicketIds = new Set<string>();

        // Group by assigned users
        for (const user of USERS) {
          const userTickets = tickets.filter(
            (ticket) => ticket.assignedId === user.id,
          );
          if (userTickets.length > 0) {
            userTickets.forEach((t) => seenTicketIds.add(t.id));
            ticketGroups.push(...groupTicketsByUser(userTickets, user));
          }
        }

        // Group unassigned tickets (excluding any already seen)
        const unassignedTickets = tickets.filter(
          (ticket) => ticket.assignedId === null && !seenTicketIds.has(ticket.id),
        );
        if (unassignedTickets.length > 0) {
          ticketGroups.push(...groupTicketsByUser(unassignedTickets, null));
        }

        return ticketGroups;
      }),
    }));
  }, []);

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div
        className="grid h-full gap-2 grid-cols-5 w-full"
        style={{
          gridTemplateColumns: `repeat(${statusRows.length}, minmax(0, 1fr))`,
        }}
      >
        {statusRows.map(({ status, ticketGroups }) => (
          <div
            key={status.id}
            className={cn(
              "flex h-full min-h-0 flex-col gap-1 rounded-lg p-2 pb-0",
              status.variant === "blue" && "bg-blue-500/5 dark:bg-blue-500/10",
              status.variant === "green" &&
                "bg-green-500/5 dark:bg-green-500/10",
              status.variant === "neutral" &&
                "bg-secondary/50 dark:bg-secondary/70",
              status.variant === "violet" &&
                "bg-violet-500/5 dark:bg-violet-500/10",
              status.variant === "yellow" &&
                "bg-yellow-500/5 dark:bg-yellow-500/10",
            )}
          >
            <Badge
              size="default"
              variant="outline"
              className={cn(
                "w-fit mb-1 p-1 h-4",
                status.variant === "blue" &&
                  "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                status.variant === "green" &&
                  "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
                status.variant === "neutral" &&
                  "border-border bg-muted/40 text-muted-foreground",
                status.variant === "violet" &&
                  "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
                status.variant === "yellow" &&
                  "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
              )}
            >
              {status.name}
            </Badge>

            <div className="flex min-h-0 flex-1 flex-col flex-wrap content-start gap-1 pl-1">
              {ticketGroups.map((ticketGroup) => {
                return (
                  <div key={ticketGroup.tickets[0].id} className="flex shrink-0 flex-col gap-1">
                    {ticketGroup.tickets.map((ticket) => {
                      return (
                        <div
                          key={ticket.id}
                          className="flex items-center"
                          title={ticket.title}
                        >
                          <AssigneeAvatar size="xs" user={ticketGroup.user} />
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
