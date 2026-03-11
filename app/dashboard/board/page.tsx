"use client";
import { useEffect, useState, useMemo } from "react";
import { BoardColumn } from "./components/board-column";
import { BoardItem } from "./components/board-item";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import {
  MOCK_TICKET_ROWS,
  STATUS_MAP_BY_ID,
  TICKET_STATUS_LIST,
  TicketStatus,
  type Ticket,
} from "@/lib/mock-data";

const EMPTY_ITEMS = {
  TODO: [],
  "IN PROGRESS": [],
  DONE: [],
} as {
  TODO: Ticket[];
  "IN PROGRESS": Ticket[];
  DONE: Ticket[];
};

type BoardItems = { [key: string]: Ticket[] };
export default function BoardPage() {
  const [boardItems, setBoardItems] =
    useState<BoardItems>(() => {
      const ticketsGrouped: { [key: string]: Ticket[] } = {};
      for (let i = 0; i < MOCK_TICKET_ROWS.length; i++) {
        const ticket = MOCK_TICKET_ROWS[i];

        if (ticketsGrouped[ticket.statusId]) {
          ticketsGrouped[ticket.statusId].push(ticket);
          continue;
        }
        ticketsGrouped[ticket.statusId] = [ticket];
      }
      return ticketsGrouped;
    });

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setBoardItems((items) => move(items, event));
      }}
    >
      <div className="h-full flex min-h-0">
        {Object.entries(boardItems).map(([column, tickets]) => (
          <BoardColumn key={column} id={column} count={tickets.length}>
            {tickets.map((ticket, index) => (
              <BoardItem
                key={ticket.id}
                ticket={ticket}
                index={index}
                column={column}
              />
            ))}
          </BoardColumn>
        ))}
      </div>
    </DragDropProvider>
  );
}
