"use client";
import { useCallback, useMemo, useState } from "react";
import { BoardColumn } from "./components/board-column";
import { MemoBoardItem } from "./components/board-item";
import { TicketPanel } from "./components/ticket-panel";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { TICKETS, type Ticket } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type BoardItems = { [key: string]: Ticket[] };
export default function BoardPage() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [boardItems, setBoardItems] = useState<BoardItems>(() => {
    const ticketsGrouped: { [key: string]: Ticket[] } = {};
    for (let i = 0; i < TICKETS.length; i++) {
      const ticket = TICKETS[i];

      if (ticketsGrouped[ticket.statusId]) {
        ticketsGrouped[ticket.statusId].push(ticket);
        continue;
      }
      ticketsGrouped[ticket.statusId] = [ticket];
    }
    return ticketsGrouped;
  });

  const [ticketPanelOpen, setTicketPanelOpen] = useState(false);
  const [ticketPanelAnimatingOpen, setTicketPanelAnimatingOpen] = useState(false);

  const handleOpenTicket = useCallback((ticketId: string) => {
    setSelectedTicketId(ticketId);
    setTicketPanelAnimatingOpen(true);
  }, []);

  const selectedTicket = useMemo(() => {
    if (!selectedTicketId) {
      return null;
    }

    return TICKETS.find((ticket) => ticket.id === selectedTicketId) ?? null;
  }, [selectedTicketId]);

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          setBoardItems((items) => move(items, event));
        }}
      >
        <div className={cn("h-full min-h-0 flex", ticketPanelOpen && "pr-96")}>
          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="flex h-full min-h-0 min-w-max">
              {Object.entries(boardItems).map(([column, tickets]) => {
                return (
                  <BoardColumn key={column} id={column} count={tickets.length}>
                    {!tickets.length
                      ? "No tickets."
                      : tickets.map((ticket, index) => {
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
      </DragDropProvider>
      <TicketPanel
        ticket={selectedTicket}
        open={ticketPanelAnimatingOpen}
        onAnimationEnd={(open) => {
          if (open) {
            setTicketPanelOpen(true);
            return;
          }

          setSelectedTicketId(null);
        }}
        onOpenChange={(open) => {
          if (!open) {
            setTicketPanelAnimatingOpen(false);
            setTicketPanelOpen(false);
          }
        }}
      />
    </>
  );
}
