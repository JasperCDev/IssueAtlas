import { format } from "date-fns";
import {
  RiBug2Line,
  RiCalendarLine,
  RiEmphasis,
  RiFlag2Fill,
  RiHistoryLine,
  RiTaskLine,
} from "@remixicon/react";

import { PRIORITY_MAP, type Ticket, type User } from "@/lib/mock-data";
import { switchMap } from "@/lib/utils";

function getPriorityClassName(priority: number | null) {
  if (priority === null || priority === 0) return "text-inherit";
  if (priority === 1) return "text-warning";
  if (priority === 2) return "text-primary";
  return "text-destructive";
}

export function BoardItemPreview(props: {
  ticket: Ticket;
  user: User | null;
}) {
  return (
    <div className="text-xs text-inherit">
      <p className="mb-2 text-start leading-snug text-inherit">{props.ticket.title}</p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="inline-flex items-center gap-1 text-inherit">
          {switchMap(props.ticket.type, {
            Bug: <RiBug2Line size={14} />,
            Task: <RiTaskLine size={14} />,
            Story: <RiHistoryLine size={14} />,
            Epic: <RiEmphasis size={14} />,
          })}
          {props.ticket.id.toUpperCase()}
        </span>
        {props.ticket.priority !== null && (
          <span className="inline-flex items-center gap-1">
            <RiFlag2Fill size={14} className={getPriorityClassName(props.ticket.priority)} />
            {PRIORITY_MAP[props.ticket.priority]}
          </span>
        )}
        {props.ticket.dueDate !== null && (
          <span className="inline-flex items-center gap-1">
            <RiCalendarLine size={14} />
            {format(props.ticket.dueDate, "M/d")}
          </span>
        )}
      </div>
    </div>
  );
}
