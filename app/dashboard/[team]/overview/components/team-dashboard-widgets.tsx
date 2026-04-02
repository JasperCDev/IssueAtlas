"use client";

import { useMemo } from "react";
import { differenceInCalendarDays, format, isBefore, startOfDay } from "date-fns";
import { useParams } from "next/navigation";
import {
  RiAlertLine,
  RiArrowRightLine,
  RiArrowUpLine,
  RiCalendarScheduleLine,
  RiCheckboxCircleLine,
  RiFlag2Fill,
  RiHistoryLine,
  RiTimerLine,
} from "@remixicon/react";

import { AssigneeAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  getTeamData,
  PRIORITY_MAP,
  STATUS_MAP_BY_ID,
  STATUS_MAP_BY_NAME,
  type Ticket,
  type User,
} from "@/lib/mock-data";

import {
  SortableWidgetCard,
  type SortableWidgetComponentProps,
  withSortableWidget,
} from "./sortable-widget";

function useOverviewTeamData() {
  const params = useParams<{ team?: string }>();

  return useMemo(() => getTeamData(params?.team), [params?.team]);
}

function getTicketSortValue(ticket: Ticket) {
  if (!ticket.dueDate) return Number.POSITIVE_INFINITY;
  return ticket.dueDate.getTime();
}

function RecentActivityContent({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  const { users, tickets } = useOverviewTeamData();

  const recentTickets = useMemo(() => {
    return [...tickets]
      .sort((a, b) => Number.parseInt(b.id.slice(1)) - Number.parseInt(a.id.slice(1)))
      .slice(0, 7);
  }, [tickets]);

  const findUser = (id: string | null): User | null => {
    if (!id) return null;
    return users.find((user) => user.id === id) ?? null;
  };

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RiHistoryLine size={14} />
            Team updates
          </div>
          <Badge variant="secondary" className="h-5 text-xs">
            Last {recentTickets.length}
          </Badge>
        </div>

        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
          {recentTickets.length === 0 ? (
            <p className="text-xs text-muted-foreground">No recent ticket activity.</p>
          ) : (
            recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center gap-2 rounded-md bg-muted/40 px-2 py-1"
              >
                <AssigneeAvatar
                  size="xs"
                  user={findUser(ticket.assignedId)}
                  title={null}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs">{ticket.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {STATUS_MAP_BY_ID[ticket.statusId]?.name}
                  </p>
                </div>
                <span className="ml-2 shrink-0 text-[11px] text-muted-foreground">
                  {ticket.id.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </SortableWidgetCard>
  );
}

function BlockedIssuesContent({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  const { users, tickets } = useOverviewTeamData();
  const doneStatusId = STATUS_MAP_BY_NAME["DONE"].id;
  const today = startOfDay(new Date());

  const blockedTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        if (ticket.statusId === doneStatusId) return false;
        const isCritical = ticket.priority === 3;
        const isOverdue =
          ticket.dueDate !== null &&
          isBefore(startOfDay(ticket.dueDate), today);
        return isCritical || isOverdue;
      })
      .sort((a, b) => {
        const aCritical = a.priority === 3 ? 1 : 0;
        const bCritical = b.priority === 3 ? 1 : 0;
        if (aCritical !== bCritical) return bCritical - aCritical;
        return getTicketSortValue(a) - getTicketSortValue(b);
      })
      .slice(0, 6);
  }, [tickets, doneStatusId, today]);

  const findUser = (id: string | null): User | null => {
    if (!id) return null;
    return users.find((user) => user.id === id) ?? null;
  };

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RiAlertLine size={14} className="text-destructive" />
            Needs attention
          </div>
          <Badge variant="outline" className="h-5 text-xs">
            {blockedTickets.length} issues
          </Badge>
        </div>

        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
          {blockedTickets.length === 0 ? (
            <p className="text-xs text-muted-foreground">No blockers right now.</p>
          ) : (
            blockedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center gap-2 rounded-md border border-border/60 px-2 py-1"
              >
                <AssigneeAvatar
                  size="xs"
                  user={findUser(ticket.assignedId)}
                  title={null}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs">{ticket.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {ticket.priority !== null ? PRIORITY_MAP[ticket.priority] : "Unprioritized"}
                    {ticket.dueDate ? ` · due ${format(ticket.dueDate, "M/d")}` : ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SortableWidgetCard>
  );
}

function TeamVelocityContent({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  const { tickets } = useOverviewTeamData();
  const doneStatusId = STATUS_MAP_BY_NAME["DONE"].id;
  const today = startOfDay(new Date());

  const currentStart = startOfDay(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000));
  const currentEnd = startOfDay(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));
  const lastStart = startOfDay(new Date(currentStart.getTime() - 14 * 24 * 60 * 60 * 1000));
  const lastEnd = startOfDay(new Date(currentStart.getTime() - 1 * 24 * 60 * 60 * 1000));

  const isInWindow = (dueDate: Date | null, start: Date, end: Date) => {
    if (!dueDate) return false;
    const day = startOfDay(dueDate).getTime();
    return day >= start.getTime() && day <= end.getTime();
  };

  const currentSprintTickets = useMemo(
    () => tickets.filter((ticket) => isInWindow(ticket.dueDate, currentStart, currentEnd)),
    [tickets, currentStart, currentEnd],
  );

  const lastSprintTickets = useMemo(
    () => tickets.filter((ticket) => isInWindow(ticket.dueDate, lastStart, lastEnd)),
    [tickets, lastStart, lastEnd],
  );

  const currentDone = useMemo(
    () => currentSprintTickets.filter((ticket) => ticket.statusId === doneStatusId).length,
    [currentSprintTickets, doneStatusId],
  );

  const lastDone = useMemo(
    () => lastSprintTickets.filter((ticket) => ticket.statusId === doneStatusId).length,
    [lastSprintTickets, doneStatusId],
  );

  const currentTotal = currentSprintTickets.length;
  const lastTotal = lastSprintTickets.length;
  const completionPct = currentTotal === 0 ? 0 : Math.round((currentDone / currentTotal) * 100);
  const lastCompletionPct = lastTotal === 0 ? 0 : Math.round((lastDone / lastTotal) * 100);
  const doneDelta = currentDone - lastDone;
  const pctDelta = completionPct - lastCompletionPct;

  const inFlightCount = currentTotal - currentDone;

  const highPriorityInFlight = useMemo(
    () =>
      currentSprintTickets.filter(
        (ticket) =>
          ticket.statusId !== doneStatusId &&
          (ticket.priority === 2 || ticket.priority === 3),
      ).length,
    [currentSprintTickets, doneStatusId],
  );

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold leading-none">{completionPct}%</p>
            <p className="text-xs text-muted-foreground">current sprint complete</p>
          </div>
          <Badge variant="secondary" className="h-5 text-xs">
            {currentDone}/{currentTotal}
          </Badge>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${completionPct}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-muted/40 px-2 py-1.5">
            <p className="flex items-center gap-1 text-muted-foreground">
              <RiTimerLine size={13} /> In flight
            </p>
            <p className="mt-0.5 font-medium">{inFlightCount}</p>
          </div>
          <div className="rounded-md bg-muted/40 px-2 py-1.5">
            <p className="flex items-center gap-1 text-muted-foreground">
              <RiFlag2Fill size={13} className="text-warning" /> High priority
            </p>
            <p className="mt-0.5 font-medium">{highPriorityInFlight}</p>
          </div>
        </div>

        <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <RiArrowUpLine size={13} className={doneDelta >= 0 ? "text-success" : "text-destructive"} />
          vs last sprint {doneDelta >= 0 ? "+" : ""}{doneDelta} done, {pctDelta >= 0 ? "+" : ""}{pctDelta}%
        </p>

        <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <RiCheckboxCircleLine size={13} className="text-success" />
          Done {currentDone} {currentDone === 1 ? "ticket" : "tickets"}
          <RiArrowRightLine size={13} />
          Remaining {inFlightCount}
        </p>
      </div>
    </SortableWidgetCard>
  );
}

function CycleTimeContent({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  const { tickets } = useOverviewTeamData();
  const doneStatusId = STATUS_MAP_BY_NAME["DONE"].id;
  const today = startOfDay(new Date());

  const activeTickets = useMemo(
    () => tickets.filter((ticket) => ticket.statusId !== doneStatusId),
    [tickets, doneStatusId],
  );

  const activeWithDueDate = useMemo(
    () => activeTickets.filter((ticket) => ticket.dueDate !== null),
    [activeTickets],
  );

  const avgDaysToDue = useMemo(() => {
    if (activeWithDueDate.length === 0) return null;

    const totalDays = activeWithDueDate.reduce((sum, ticket) => {
      return sum + differenceInCalendarDays(startOfDay(ticket.dueDate as Date), today);
    }, 0);

    return Math.round(totalDays / activeWithDueDate.length);
  }, [activeWithDueDate, today]);

  const overdueCount = useMemo(
    () =>
      activeWithDueDate.filter((ticket) =>
        isBefore(startOfDay(ticket.dueDate as Date), today),
      ).length,
    [activeWithDueDate, today],
  );

  const dueSoonCount = useMemo(
    () =>
      activeWithDueDate.filter((ticket) => {
        const days = differenceInCalendarDays(startOfDay(ticket.dueDate as Date), today);
        return days >= 0 && days <= 7;
      }).length,
    [activeWithDueDate, today],
  );

  const nextDueTickets = useMemo(
    () =>
      [...activeWithDueDate]
        .sort((a, b) => getTicketSortValue(a) - getTicketSortValue(b))
        .slice(0, 5),
    [activeWithDueDate],
  );

  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md bg-muted/40 px-2 py-1.5">
            <p className="text-[11px] text-muted-foreground">Avg to due</p>
            <p className="text-sm font-semibold">
              {avgDaysToDue === null ? "-" : `${avgDaysToDue}d`}
            </p>
          </div>
          <div className="rounded-md bg-muted/40 px-2 py-1.5">
            <p className="text-[11px] text-muted-foreground">Due in 7d</p>
            <p className="text-sm font-semibold">{dueSoonCount}</p>
          </div>
          <div className="rounded-md bg-muted/40 px-2 py-1.5">
            <p className="text-[11px] text-muted-foreground">Overdue</p>
            <p className="text-sm font-semibold text-destructive">{overdueCount}</p>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
          {nextDueTickets.length === 0 ? (
            <p className="text-xs text-muted-foreground">No active due dates.</p>
          ) : (
            nextDueTickets.map((ticket) => {
              const dueDate = ticket.dueDate as Date;
              const dueDelta = differenceInCalendarDays(startOfDay(dueDate), today);
              const dueText = dueDelta < 0 ? `${Math.abs(dueDelta)}d late` : `${dueDelta}d left`;

              return (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between rounded-md border border-border/60 px-2 py-1"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs">{ticket.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {STATUS_MAP_BY_ID[ticket.statusId]?.name}
                    </p>
                  </div>
                  <div className="ml-2 text-right text-[11px]">
                    <p className={dueDelta < 0 ? "text-destructive" : "text-muted-foreground"}>
                      {dueText}
                    </p>
                    <p className="text-muted-foreground">{format(dueDate, "M/d")}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <RiCalendarScheduleLine size={13} />
          Active tickets with due dates: {activeWithDueDate.length}
        </p>
      </div>
    </SortableWidgetCard>
  );
}

export const MyTasksWidget = withSortableWidget(RecentActivityContent);
export const BlockedIssuesWidget = withSortableWidget(BlockedIssuesContent);
export const TeamVelocityWidget = withSortableWidget(TeamVelocityContent);
export const CycleTimeWidget = withSortableWidget(CycleTimeContent);
