"use client";

import type { ComponentType, ReactNode } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBinLine } from "@remixicon/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Widget = {
  id: string;
  title: string;
  w: 1 | 2;
  h: 1 | 2;
};

type DragHandleProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

export type SortableWidgetComponentProps<TWidget extends Widget = Widget> = {
  widget: TWidget;
  dragHandleProps: DragHandleProps;
};

const COL_SPAN_CLASS: Record<Widget["w"], string> = {
  1: "col-span-1",
  2: "col-span-2",
};

const ROW_SPAN_CLASS: Record<Widget["h"], string> = {
  1: "row-span-1",
  2: "row-span-2",
};

export function withSortableWidget<TWidget extends Widget = Widget>(
  Component: ComponentType<SortableWidgetComponentProps<TWidget>>,
) {
  return function SortableWidget({ widget }: { widget: TWidget }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: widget.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`${COL_SPAN_CLASS[widget.w]} ${ROW_SPAN_CLASS[widget.h]}`}
      >
        <Component
          widget={widget}
          dragHandleProps={{ attributes, listeners }}
        />
      </div>
    );
  };
}

type SortableWidgetCardProps = {
  title: string;
  dragHandleProps: DragHandleProps;
  children: ReactNode;
};

export function SortableWidgetCard({
  title,
  dragHandleProps,
  children,
}: SortableWidgetCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden" size="sm">
      <RiDeleteBinLine className="size-4 text-muted-foreground absolute top-4 right-4 opacity-0 group-hover:opacity-100" />

      <CardHeader
        className="cursor-grab active:cursor-grabbing select-none"
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
      >
        <CardTitle className="text-xs">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1">{children}</CardContent>
    </Card>
  );
}

function DefaultWidgetCard({
  widget,
  dragHandleProps,
}: SortableWidgetComponentProps) {
  return (
    <SortableWidgetCard title={widget.title} dragHandleProps={dragHandleProps}>
      <CardContent className="flex-1">
        <div className="h-full w-full rounded-md bg-muted" />
      </CardContent>
    </SortableWidgetCard>
  );
}

export const SortableWidget = withSortableWidget(DefaultWidgetCard);
