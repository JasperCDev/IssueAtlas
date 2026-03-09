"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiDeleteBinLine } from "@remixicon/react";

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
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

type Widget = {
  id: string;
  title: string;
  w: 1 | 2;
  h: 1 | 2;
};

const initialWidgets: Widget[] = [
  { id: "sprint", title: "Sprint Burndown", w: 2, h: 1 },
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
          {widgets.map((widget) => (
            <SortableWidget key={widget.id} widget={widget} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableWidget({ widget }: { widget: Widget }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.id});

  const style = {
    // transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`col-span-${widget.w} row-span-${widget.h}`}
    >
      <Card className="h-full flex flex-col overflow-hidden">
        <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 group-hover:opacity-100" />

        <CardHeader
          className="cursor-grab active:cursor-grabbing select-none"
          {...attributes}
          {...listeners}
        >
          <CardTitle className="text-sm">{widget.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="h-full w-full rounded-md bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}
