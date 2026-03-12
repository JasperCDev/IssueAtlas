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

function toInputDateValue(value: Date | null) {
  if (!value) return "";
  return format(value, "yyyy-MM-dd");
}

export function BoardItemDueDate({ dueDate }: { dueDate: Date | null }) {
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(dueDate);

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

  const isPastDue = useMemo(() => {
    if (!selectedDueDate) {
      return false;
    }

    return isBefore(startOfDay(selectedDueDate), startOfDay(new Date()));
  }, [selectedDueDate]);

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
        <Badge
          size="lg"
          variant={isPastDue ? "destructive" : "outline"}
        >
          <RiCalendarLine
            size="16"
            className={
              selectedDueDate
                ? isPastDue
                  ? "text-destructive"
                  : ""
                : "text-muted-foreground"
            }
          />{" "}
          {displayValue}
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

              const parsedDate = parse(event.target.value, "yyyy-MM-dd", new Date());

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
