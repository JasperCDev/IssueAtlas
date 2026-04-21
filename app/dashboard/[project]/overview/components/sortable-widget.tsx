"use client";

import type { ComponentType, ReactNode } from "react";
import { RiDeleteBinLine } from "@remixicon/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Widget = {
  id: string;
  title: string;
  w: 1 | 2 | 3 | 4;
  h: 1 | 2;
};

export type SortableWidgetComponentProps<TWidget extends Widget = Widget> = {
  widget: TWidget;
};

export function withSortableWidget<TWidget extends Widget = Widget>(
  Component: ComponentType<SortableWidgetComponentProps<TWidget>>,
) {
  return function SortableWidget({ widget }: { widget: TWidget }) {
    return (
      <div className="h-full">
        <Component widget={widget} />
      </div>
    );
  };
}

type SortableWidgetCardProps = {
  title: string;
  children: ReactNode;
};

export function SortableWidgetCard({
  title,
  children,
}: SortableWidgetCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden" size="xs">
      <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 group-hover:opacity-100" />

      <CardHeader className="widget-drag-handle cursor-grab active:cursor-grabbing select-none touch-none">
        <CardTitle className="text-xs">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1">{children}</CardContent>
    </Card>
  );
}

function DefaultWidgetCard({
  widget,
}: SortableWidgetComponentProps) {
  return (
    <SortableWidgetCard title={widget.title}>
      <CardContent className="flex-1">
        <div className="h-full w-full rounded-md bg-muted" />
      </CardContent>
    </SortableWidgetCard>
  );
}

export const SortableWidget = withSortableWidget(DefaultWidgetCard);
