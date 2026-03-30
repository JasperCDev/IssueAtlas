"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_TEAM_ID, TEAM_LIST } from "@/lib/mock-data";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const dashboardIndex = segments.indexOf("dashboard");
  const maybeTeam = segments[dashboardIndex + 1];
  const isTeamRoute = TEAM_LIST.some((team) => team.id === maybeTeam);
  const teamId = isTeamRoute ? maybeTeam! : DEFAULT_TEAM_ID;
  const section = isTeamRoute
    ? (segments[dashboardIndex + 2] ?? "overview")
    : (segments[dashboardIndex + 1] ?? "overview");

  const tabItems = useMemo(
    () => ({
      overview: {
        value: "overview",
        href: `/dashboard/${teamId}/overview`,
        label: "Overview",
      },
      board: {
        value: "board",
        href: `/dashboard/${teamId}/board`,
        label: "Board",
      },
      list: {
        value: "list",
        href: `/dashboard/${teamId}/list`,
        label: "List",
      },
    }),
    [teamId],
  );

  const [tabOrder, setTabOrder] = useState<Array<keyof typeof tabItems>>([
    "overview",
    "board",
    "list",
  ]);

  const tabs = tabOrder
    .map((key) => tabItems[key])
    .filter((tab) => tab !== undefined);

  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTabId(null);

    if (!over || active.id === over.id) return;

    setTabOrder((prev) => {
      const oldIndex = prev.findIndex((tab) => tab === active.id);
      const newIndex = prev.findIndex((tab) => tab === over.id);

      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveTabId(String(event.active.id));
  }

  function handleDragCancel() {
    setActiveTabId(null);
  }

  const activeTabLabel =
    tabs.find((tab) => tab.value === activeTabId)?.label ?? null;

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <DashboardSidebar />
      <SidebarInset className="p-4 min-w-0 h-svh overflow-hidden bg-background flex flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2">
          <SidebarTrigger />
          <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
            <Tabs value={section}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragCancel={handleDragCancel}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tabs.map((tab) => tab.value)}
                  strategy={horizontalListSortingStrategy}
                >
                  <TabsList variant="line" className="min-w-max">
                    {tabs.map((tab) => (
                      <SortableTab key={tab.value} tab={tab} />
                    ))}
                  </TabsList>
                </SortableContext>
                <DragOverlay>
                  {activeTabLabel ? <TabDragPreview label={activeTabLabel} /> : null}
                </DragOverlay>
              </DndContext>
            </Tabs>
          </div>
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto pr-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function SortableTab({
  tab,
}: {
  tab: { value: string; href: string; label: string };
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: tab.value });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <TabsTrigger
      ref={setNodeRef}
      style={style}
      nativeButton={false}
      value={tab.value}
      render={(props) => (
        <Link href={tab.href} {...props} {...attributes} {...listeners}>
          {tab.label}
        </Link>
      )}
    />
  );
}

function TabDragPreview({ label }: { label: string }) {
  return (
    <div className="h-8 rounded-md bg-card/80 px-3 text-sm text-foreground/80 inline-flex items-center">
      {label}
    </div>
  );
}
