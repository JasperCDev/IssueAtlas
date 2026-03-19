"use client";

import { RiCloseLine } from "@remixicon/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { type Ticket } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import {
  CreateTicketForm,
  type CreateTicketInput,
} from "./create-ticket-form";
import { TicketPanelDetails } from "./ticket-panel-details";

export type { CreateTicketInput } from "./create-ticket-form";

export function TicketPanel({
  ticket,
  open,
  mode = "view",
  onOpenChange,
  onAnimationEnd,
  onCreateTicket,
}: {
  ticket: Ticket | null;
  open: boolean;
  mode?: "view" | "create";
  onOpenChange: (open: boolean) => void;
  onAnimationEnd?: (open: boolean) => void;
  onCreateTicket?: (input: CreateTicketInput) => void;
}) {
  const [hasOpened, setHasOpened] = useState(false);
  if (open && !hasOpened) setHasOpened(true);

  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-50 flex h-dvh w-100 flex-col border-l bg-background p-4 shadow-lg",
        open
          ? "animate-ticket-panel-in"
          : hasOpened
            ? "animate-ticket-panel-out pointer-events-none"
            : "translate-x-full pointer-events-none",
      )}
      aria-hidden={!open}
      onAnimationEnd={onAnimationEnd ? () => onAnimationEnd(open) : undefined}
    >
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          {mode === "create" ? (
            <h2 className="text-sm font-semibold leading-tight">New Ticket</h2>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                {ticket ? ticket.id.toUpperCase() : ""}
              </p>
              <h2 className="text-sm font-semibold leading-tight">
                {ticket?.title ?? ""}
              </h2>
            </>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onOpenChange(false)}
          aria-label="Close ticket panel"
        >
          <RiCloseLine />
        </Button>
      </div>

      {mode === "create" ? (
        <CreateTicketForm
          onCreateTicket={onCreateTicket!}
          onClose={() => onOpenChange(false)}
        />
      ) : (
        <TicketPanelDetails ticket={ticket} />
      )}
    </div>
  );
}
