"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { AssigneeAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTeamData, TICKET_STATUS_LIST, Ticket, User } from "@/lib/mock-data";
import { cn, derive } from "@/lib/utils";
import { BoardItemPreview } from "@/app/dashboard/board/components/board-item-preview";

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
  const params = useParams<{ team?: string }>();
  const { users, tickets } = useMemo(
    () => getTeamData(params?.team),
    [params?.team],
  );

  const statusRows = useMemo(() => {
    return TICKET_STATUS_LIST.map((status) => ({
      status,
      ticketGroups: derive(() => {
        const statusTickets = tickets.filter(
          (ticket) => ticket.statusId === status.id,
        );
        const ticketGroups: Array<{ user: User | null; tickets: Ticket[] }> =
          [];
        const seenTicketIds = new Set<string>();

        for (const user of users) {
          const userTickets = statusTickets.filter(
            (ticket) => ticket.assignedId === user.id,
          );
          if (userTickets.length > 0) {
            userTickets.forEach((t) => seenTicketIds.add(t.id));
            ticketGroups.push(...groupTicketsByUser(userTickets, user));
          }
        }

        const unassignedTickets = statusTickets.filter(
          (ticket) =>
            ticket.assignedId === null && !seenTicketIds.has(ticket.id),
        );
        if (unassignedTickets.length > 0) {
          ticketGroups.push(...groupTicketsByUser(unassignedTickets, null));
        }

        return ticketGroups;
      }),
    }));
  }, [tickets, users]);

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <TooltipProvider delay={300}>
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
                status.variant === "blue" &&
                  "bg-chart-1/6",
                status.variant === "green" &&
                  "bg-success/6",
                status.variant === "neutral" &&
                  "bg-secondary/28",
                status.variant === "violet" &&
                  "bg-chart-3/6",
                status.variant === "yellow" &&
                  "bg-chart-4/6",
              )}
            >
              <Badge
                size="default"
                variant="outline"
                className={cn(
                  "w-fit mb-1 p-1 h-4",
                  status.variant === "blue" &&
                    "border-chart-1/30 bg-chart-1/15 text-chart-1",
                  status.variant === "green" &&
                    "border-success/30 bg-success/15 text-success",
                  status.variant === "neutral" &&
                    "border-border bg-muted/40 text-muted-foreground",
                  status.variant === "violet" &&
                    "border-chart-3/30 bg-chart-3/15 text-chart-3",
                  status.variant === "yellow" &&
                    "border-chart-4/30 bg-chart-4/15 text-chart-4",
                )}
              >
                {status.name}
              </Badge>

              <div className="flex min-h-0 flex-1 flex-col flex-wrap content-start gap-1 pl-1">
                {ticketGroups.map((ticketGroup) => {
                  return (
                    <div
                      key={ticketGroup.tickets[0].id}
                      className="flex shrink-0 flex-col gap-1"
                    >
                      {ticketGroup.tickets.map((ticket) => {
                        return (
                          <Tooltip key={ticket.id}>
                            <TooltipTrigger
                              render={<div className="flex items-center" />}
                            >
                              <AssigneeAvatar
                                size="xs"
                                user={ticketGroup.user}
                                title={null}
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              align="center"
                              className="max-w-none items-start [&>svg]:hidden"
                            >
                              <BoardItemPreview
                                ticket={ticket}
                                user={ticketGroup.user}
                              />
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </SortableWidgetCard>
  );
}

export const SprintOverviewWidget = withSortableWidget(SprintOverviewContent);
