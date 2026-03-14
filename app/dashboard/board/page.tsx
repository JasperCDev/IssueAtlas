"use client";
import { useState } from "react";
import { BoardColumn } from "./components/board-column";
import { BoardItem } from "./components/board-item";
import { TicketPanel } from "./components/ticket-panel";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { TICKETS, type Ticket } from "@/lib/mock-data";
import { derive } from "@/lib/utils";

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

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          setBoardItems((items) => move(items, event));
        }}
      >
        <div className="h-full flex min-h-0">
          {Object.entries(boardItems).map(([column, tickets]) => {
            return (
              <BoardColumn key={column} id={column} count={tickets.length}>
                {derive(() => {
                  if (!tickets.length) {
                    return "No tickets.";
                  }
                  return tickets.map((ticket, index) => {
                    return (
                      <BoardItem
                        key={ticket.id}
                        ticket={ticket}
                        index={index}
                        column={column}
                        onOpen={() => setSelectedTicketId(ticket.id)}
                        selected={ticket.id === selectedTicketId}
                      />
                    );
                  });
                })}
              </BoardColumn>
            );
          })}
        </div>
      </DragDropProvider>
      <TicketPanel
        ticket={TICKETS.find((ticket) => ticket.id === selectedTicketId) || null}
        open={selectedTicketId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTicketId(null);
        }}
      />
    </>
  );
}
