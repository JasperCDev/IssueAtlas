"use client";

import { RiUserLine } from "@remixicon/react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { TICKETS, TICKET_STATUS_LIST, USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import {
  SortableWidgetCard,
  type SortableWidgetComponentProps,
  withSortableWidget,
} from "./sortable-widget";

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]?.toUpperCase() ?? ""}${lastName[0]?.toUpperCase() ?? ""}`;
}

const usersById = new Map(USERS.map((user) => [user.id, user]));

const statusRows = TICKET_STATUS_LIST.map((status) => ({
  status,
  tickets: TICKETS.filter((ticket) => ticket.statusId === status.id),
}));

function SprintOverviewContent({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div className="grid h-full grid-cols-4 gap-2">
        {statusRows.map(({ status, tickets }) => (
          <div key={status.id} className="flex flex-col gap-1 w-25">
            <h6
              className={cn(
                "text-xs font-semibold",
                status.variant === "blue" && "text-blue-500",
                status.variant === "green" && "text-green-500",
                status.variant === "yellow" && "text-yellow-500",
              )}
            >
              {status.name}
            </h6>

            <div className="flex flex-col gap-1">
              {tickets.map((ticket) => {
                const user = ticket.assignedId ? usersById.get(ticket.assignedId) : null;
                return (
                  <div key={ticket.id} className="flex items-center" title={ticket.title}>
                    <Avatar size="xs">
                      {user ? (
                        <AvatarFallback userId={user.id}>
                          {getInitials(user.firstName, '')}
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback>
                          <RiUserLine size={8} />
                        </AvatarFallback>
                      )}
                    </Avatar>

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

