"use client";

import { useState } from "react";
import {
  SortableWidget,
  type Widget,
} from "./components/sortable-widget";
import { SprintOverviewWidget } from "./components/sprint-overview";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const initialWidgets: Widget[] = [
  { id: "sprint", title: "Sprint Overview", w: 2, h: 1 },
  { id: "tasks", title: "My Tasks", w: 1, h: 2 },
  { id: "velocity", title: "Team Velocity", w: 1, h: 1 },
  { id: "blocked", title: "Blocked Issues", w: 1, h: 1 },
  { id: "cycle", title: "Cycle Time", w: 2, h: 1 },
];

export default function Dashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setWidgets((prev) => {
      const oldIndex = prev.findIndex((w) => w.id === active.id);
      const newIndex = prev.findIndex((w) => w.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={widgets.map((w) => w.id)}
        strategy={rectSortingStrategy}
      >
        <div
          className="grid gap-4 auto-rows-[260px]
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {widgets.map((widget) =>
            widget.id === "sprint" ? (
              <SprintOverviewWidget key={widget.id} widget={widget} />
            ) : (
              <SortableWidget key={widget.id} widget={widget} />
            ),
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
