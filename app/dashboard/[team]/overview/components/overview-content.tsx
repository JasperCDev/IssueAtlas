"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import {
  type Widget,
} from "./sortable-widget";
import { SprintOverviewWidget } from "./sprint-overview";
import {
  BlockedIssuesWidget,
  CycleTimeWidget,
  MyTasksWidget,
  TeamVelocityWidget,
} from "./team-dashboard-widgets";

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

const WIDGET_COMPONENTS = {
  sprint: SprintOverviewWidget,
  activity: MyTasksWidget,
  velocity: TeamVelocityWidget,
  blocked: BlockedIssuesWidget,
  cycle: CycleTimeWidget,
} satisfies Record<string, ComponentType<{ widget: Widget }>>;

type DashboardWidget = Widget & {
  component: keyof typeof WIDGET_COMPONENTS;
};

const initialWidgets: DashboardWidget[] = [
  { id: "sprint", title: "Sprint Overview", w:2, h: 1, component: "sprint" },
  { id: "tasks", title: "Recent Activity", w: 1, h: 2, component: "activity" },
  { id: "velocity", title: "Sprint Velocity", w: 1, h: 1, component: "velocity" },
  { id: "blocked", title: "Blocked Issues", w: 1, h: 1, component: "blocked" },
  { id: "cycle", title: "Cycle Time", w: 2, h: 1, component: "cycle" },
];

export function OverviewContent() {
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
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-1"
        >
          {widgets.map((widget) => {
            const WidgetComponent = WIDGET_COMPONENTS[widget.component];

            return <WidgetComponent key={widget.id} widget={widget} />;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
