import { useMemo, useState } from "react";
import { RiCalendarLine } from "@remixicon/react";
import { format, isBefore, isValid, parse, startOfDay } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { ButtonFragment } from "@/components/ui/button-fragment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { STATUS_MAP_BY_NAME, Ticket } from "@/lib/mock-data";
import { derive } from "@/lib/utils";

function toInputDateValue(value: Date | null) {
  if (!value) return "";
  return format(value, "yyyy-MM-dd");
}

export function BoardItemDueDate({ ticket }: { ticket: Ticket }) {
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(
    ticket.dueDate,
  );

  const inputValue = useMemo(
    () => toInputDateValue(selectedDueDate),
    [selectedDueDate],
  );

  const displayValue = useMemo(() => {
    if (!selectedDueDate) {
      return null;
    }
    return format(selectedDueDate, "M/d");
  }, [selectedDueDate]);

  const textColor = derive(() => {
    if (!selectedDueDate) {
      return "";
    }
    if (ticket.statusId === STATUS_MAP_BY_NAME["DONE"].id) {
      return "text-success";
    }
    const isPastDue = isBefore(
      startOfDay(selectedDueDate),
      startOfDay(new Date()),
    );
    if (isPastDue) {
      return "text-destructive";
    }
    return "text-foreground";
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <ButtonFragment
            aria-label="Open due date details"
            className="inline-flex"
            data-interactive="true"
          />
        }
      >
        <Badge size="lg" variant="outline">
          <RiCalendarLine
            size="16"
            className={selectedDueDate === null ? "text-muted-foreground" : ""}
          />
          {selectedDueDate !== null ? (
            <span className={textColor}>{displayValue}</span>
          ) : null}
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" data-interactive="true">
        <div className="p-2" data-interactive="true">
          <Input
            type="date"
            value={inputValue}
            data-interactive="true"
            onChange={(event) => {
              if (!event.target.value) {
                setSelectedDueDate(null);
                return;
              }

              const parsedDate = parse(
                event.target.value,
                "yyyy-MM-dd",
                new Date(),
              );

              if (!isValid(parsedDate)) {
                return;
              }

              setSelectedDueDate(parsedDate);
            }}
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setSelectedDueDate(null)}>
          Clear due date
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
