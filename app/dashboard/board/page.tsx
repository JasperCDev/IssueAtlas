"use client";
import { useState } from "react";
import { BoardColumn } from "./components/board-column";
import { BoardItem } from "./components/board-item";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

export default function BoardPage() {
  const [items, setItems] = useState({
    TODO: ["A0", "A1", "A2"],
    ["IN PROGRESS"]: ["B0", "B1"],
    DONE: [],
  });

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="h-full flex min-h-0">
        {Object.entries(items).map(([column, items]) => (
          <BoardColumn key={column} id={column}>
            {items.map((id, index) => (
              <BoardItem key={id} id={id} index={index} column={column} />
            ))}
          </BoardColumn>
        ))}
      </div>
    </DragDropProvider>
  );
}
