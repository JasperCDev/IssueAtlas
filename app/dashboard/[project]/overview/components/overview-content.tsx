"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import {
  GridLayout,
  useContainerWidth,
  type Layout,
  type LayoutItem,
} from "react-grid-layout";
import { type Widget } from "./sortable-widget";
import { SprintOverviewWidget } from "./sprint-overview";
import {
  BlockedIssuesWidget,
  CycleTimeWidget,
  MyTasksWidget,
  ProjectVelocityWidget,
} from "./project-dashboard-widgets";

const GRID_COLUMNS = 4;

const WIDGET_COMPONENTS = {
  sprint: SprintOverviewWidget,
  activity: MyTasksWidget,
  velocity: ProjectVelocityWidget,
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

function buildBreakpointLayout(
  widgets: DashboardWidget[],
  columns: number,
): Layout {
  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;

  return widgets.map((widget) => {
    const width = Math.min(widget.w, columns);

    if (cursorX + width > columns) {
      cursorX = 0;
      cursorY += rowHeight;
      rowHeight = 0;
    }

    const layoutItem: LayoutItem = {
      i: widget.id,
      x: cursorX,
      y: cursorY,
      w: width,
      h: widget.h,
      minW: Math.min(width, columns),
      maxW: Math.min(width, columns),
      minH: widget.h,
      maxH: widget.h,
      static: false,
    };

    cursorX += width;
    rowHeight = Math.max(rowHeight, widget.h);

    if (cursorX >= columns) {
      cursorX = 0;
      cursorY += rowHeight;
      rowHeight = 0;
    }

    return layoutItem;
  });
}

export function OverviewContent() {
  const { width, containerRef, mounted } = useContainerWidth();

  const [layout, setLayout] = useState<Layout>(() =>
    buildBreakpointLayout(initialWidgets, GRID_COLUMNS),
  );

  return (
    <div ref={containerRef} className="pt-1">
      {mounted ? (
        <GridLayout
          className="dashboard-widget-grid"
          layout={layout}
          width={width}
          gridConfig={{
            cols: GRID_COLUMNS,
            margin: [16, 16],
            containerPadding: [0, 0],
            rowHeight: 260,
          }}
          dragConfig={{ handle: ".widget-drag-handle" }}
          resizeConfig={{ enabled: false }}
          onLayoutChange={(nextLayout: Layout) => setLayout(nextLayout)}
        >
          {initialWidgets.map((widget) => {
            const WidgetComponent = WIDGET_COMPONENTS[widget.component];

            return (
              <div key={widget.id}>
                <WidgetComponent widget={widget} />
              </div>
            );
          })}
        </GridLayout>
      ) : null}
    </div>
  );
}
