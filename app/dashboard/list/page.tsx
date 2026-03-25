"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TICKETS, USERS, STATUS_MAP_BY_ID, PRIORITY_MAP, type Ticket } from "@/lib/mock-data";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { RiBug2Line, RiTaskLine, RiHistoryLine, RiEmphasis } from "@remixicon/react";
import { switchMap, cn } from "@/lib/utils";
import { format } from "date-fns";

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium">{row.original.id.toUpperCase()}</span>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="max-w-sm truncate">{row.original.title}</span>,
  },
  {
    accessorKey: "statusId",
    header: "Status",
    cell: ({ row }) => {
      const status = STATUS_MAP_BY_ID[row.original.statusId];
      return (
        <Badge
          className={cn({
            "bg-blue-500": status.variant === "blue",
            "bg-green-500": status.variant === "green",
            "bg-secondary text-secondary-foreground": status.variant === "neutral",
            "bg-yellow-500": status.variant === "yellow",
          })}
        >
          {status.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.original.priority;
      if (priority === null) return <span className="text-muted-foreground">-</span>;
      return <span className="text-xs">{PRIORITY_MAP[priority]}</span>;
    },
  },
  {
    accessorKey: "assignedId",
    header: "Assignee",
    cell: ({ row }) => {
      const assignedId = row.original.assignedId;
      if (!assignedId) return <span className="text-muted-foreground">Unassigned</span>;
      const user = USERS.find((u) => u.id === assignedId);
      return <span className="text-xs">{user ? `${user.firstName} ${user.lastName}` : "Unknown"}</span>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      if (!dueDate) return <span className="text-muted-foreground">-</span>;
      return <span className="text-xs">{format(dueDate, "MMM dd")}</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {switchMap(row.original.type, {
          Bug: <RiBug2Line size={14} />,
          Task: <RiTaskLine size={14} />,
          Story: <RiHistoryLine size={14} />,
          Epic: <RiEmphasis size={14} />,
        })}
        <span className="text-xs">{row.original.type}</span>
      </div>
    ),
  },
];

export default function ListPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Tickets</h1>
        <p className="text-sm text-muted-foreground">Manage all project tickets</p>
      </div>
      <DataTable columns={columns} data={TICKETS} />
    </div>
  );
}