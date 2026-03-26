"use client";

import { useMemo, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useParams } from "next/navigation";

import {
  getTeamData,
  TICKET_STATUS_LIST,
  type Ticket,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useTicketPanelState } from "@/app/dashboard/board/hooks/use-ticket-panel-state";
import { TicketBoardHeader } from "@/app/dashboard/board/components/ticket-board-header";

import { BoardColumn } from "./board-column";
import { MemoBoardItem } from "./board-item";
import { TicketPanel, type CreateTicketInput } from "./ticket-panel";

type BoardItems = { [key: string]: Ticket[] };

export const UNASSIGNED_ASSIGNEE_ID = "__unassigned__";

export function TicketBoard() {
  const params = useParams<{ team?: string }>();
  const { users, tickets } = useMemo(
    () => getTeamData(params?.team),
    [params?.team],
  );
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([]);

  const handleAssigneeToggle = (assigneeId: string) => {
    setSelectedAssigneeIds((current) =>
      current.includes(assigneeId)
        ? current.filter((id) => id !== assigneeId)
        : [...current, assigneeId],
    );
  };

  const [boardItems, setBoardItems] = useState<BoardItems>(() => {
    const ticketsGrouped: BoardItems = Object.fromEntries(
      TICKET_STATUS_LIST.map((status) => [status.id, [] as Ticket[]]),
    );

    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i];
      (ticketsGrouped[ticket.statusId] ??= []).push(ticket);
    }

    return ticketsGrouped;
  });

  const allTickets = useMemo(
    () => Object.values(boardItems).flat(),
    [boardItems],
  );

  const handleCreateTicket = (input: CreateTicketInput) => {
    setBoardItems((current) => {
      const next = { ...current };
      const maxId = Object.values(current)
        .flat()
        .reduce((acc, ticket) => {
          const match = /^t(\d+)$/.exec(ticket.id);
          if (!match) return acc;
          return Math.max(acc, Number(match[1]));
        }, -1);

      const newTicket: Ticket = {
        id: `t${maxId + 1}`,
        title: input.title,
        description: input.description,
        priority: input.priority,
        statusId: input.statusId,
        assignedId: input.assignedId,
        dueDate: input.dueDate,
        type: input.type,
      };

      const targetColumn = next[input.statusId] ?? [];
      next[input.statusId] = [newTicket, ...targetColumn];

      return next;
    });
  };

  const visibleBoardItems = useMemo<BoardItems>(() => {
    if (selectedAssigneeIds.length === 0) return boardItems;
    const result: BoardItems = {};

    for (const status of TICKET_STATUS_LIST) {
      const column = status.id;
      const tickets = boardItems[column] ?? [];
      result[column] = tickets.filter((ticket) => {
        if (ticket.assignedId === null) {
          return selectedAssigneeIds.includes(UNASSIGNED_ASSIGNEE_ID);
        }
        return selectedAssigneeIds.includes(ticket.assignedId);
      });
    }
    return result;
  }, [boardItems, selectedAssigneeIds]);

  const {
    selectedTicketId,
    selectedTicket,
    ticketPanelOpen,
    ticketPanelAnimatingOpen,
    panelMode,
    handleOpenTicket,
    handleOpenCreateForm,
    handleTicketPanelAnimationEnd,
    handleTicketPanelOpenChange,
  } = useTicketPanelState(allTickets);

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          setBoardItems((items) => move(items, event));
        }}
      >
        <div className={cn("h-full min-h-0 flex", ticketPanelOpen && "pr-98")}>
          <div className="min-w-0 min-h-0 flex-1 flex flex-col gap-3">
            <TicketBoardHeader
              users={users}
              selectedAssigneeIds={selectedAssigneeIds}
              onAssigneeToggle={handleAssigneeToggle}
              onAddTicketClick={handleOpenCreateForm}
            />
            <div className="min-w-0 min-h-0 flex-1 overflow-x-auto">
              <div className="flex h-full min-h-0 min-w-max gap-4">
                {TICKET_STATUS_LIST.map(({ id: column }) => {
                  const tickets = boardItems[column] ?? [];
                  const visibleIds = new Set(
                    visibleBoardItems[column]?.map((t) => t.id) ?? [],
                  );
                  const visibleTickets = tickets.filter((t) =>
                    visibleIds.has(t.id),
                  );

                  return (
                    <BoardColumn key={column} id={column} count={visibleTickets.length}>
                      {!visibleTickets.length
                        ? "No tickets."
                        : tickets.map((ticket, index) => {
                            if (!visibleIds.has(ticket.id)) return null;
                            return (
                              <MemoBoardItem
                                key={ticket.id}
                                ticket={ticket}
                                index={index}
                                column={column}
                                onOpen={handleOpenTicket}
                                selected={ticket.id === selectedTicketId}
                              />
                            );
                          })}
                    </BoardColumn>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </DragDropProvider>
      <TicketPanel
        ticket={selectedTicket}
        open={ticketPanelAnimatingOpen}
        mode={panelMode}
        onAnimationEnd={handleTicketPanelAnimationEnd}
        onOpenChange={handleTicketPanelOpenChange}
        onCreateTicket={handleCreateTicket}
      />
    </>
  );
}