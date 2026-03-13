import { useState } from "react";
import { RiFlag2Fill } from "@remixicon/react";

import { PRIORITY_MAP } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { ButtonFragment } from "@/components/ui/button-fragment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { switchMap } from "@/lib/utils";

function getPriorityClassName(priority: number | null) {
  return switchMap(priority ?? -1, {
    [-1]: "text-muted-foreground",
    0: "text-muted-foreground",
    1: "text-warning",
    2: "text-primary",
    3: "text-destructive",
  });
}

export function BoardItemPriority({ priority }: { priority: number | null }) {
  const [selectedPriority, setSelectedPriority] = useState<number | null>(
    priority,
  );

  const priorityClassName = getPriorityClassName(selectedPriority);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <ButtonFragment
            aria-label="Open priority details"
            className="inline-flex"
            data-interactive="true"
          />
        }
      >
        <Badge size="lg" variant="outline">
          <RiFlag2Fill size="16" className={priorityClassName} />{" "}
          {selectedPriority !== null ? PRIORITY_MAP[selectedPriority] : " "}
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" data-interactive="true">
        <DropdownMenuItem onClick={() => setSelectedPriority(null)}>
          <RiFlag2Fill className={getPriorityClassName(null)} />
          None
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedPriority(0)}>
          <RiFlag2Fill className={getPriorityClassName(0)} />
          Low
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedPriority(1)}>
          <RiFlag2Fill className={getPriorityClassName(1)} />
          Medium
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedPriority(2)}>
          <RiFlag2Fill className={getPriorityClassName(2)} />
          High
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedPriority(3)}>
          <RiFlag2Fill className={getPriorityClassName(3)} />
          Critical
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
