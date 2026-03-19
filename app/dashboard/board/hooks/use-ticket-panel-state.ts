import { useCallback, useMemo, useState } from "react";

import type { Ticket } from "@/lib/mock-data";

export function useTicketPanelState(tickets: Ticket[]) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketPanelOpen, setTicketPanelOpen] = useState(false);
  const [ticketPanelAnimatingOpen, setTicketPanelAnimatingOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"view" | "create">("view");

  const handleOpenTicket = useCallback((ticketId: string) => {
    setPanelMode("view");
    setSelectedTicketId(ticketId);
    setTicketPanelAnimatingOpen(true);
  }, []);

  const handleOpenCreateForm = useCallback(() => {
    setPanelMode("create");
    setSelectedTicketId(null);
    setTicketPanelAnimatingOpen(true);
  }, []);

  const handleTicketPanelAnimationEnd = useCallback((open: boolean) => {
    if (open) {
      setTicketPanelOpen(true);
      return;
    }

    setSelectedTicketId(null);
  }, []);

  const handleTicketPanelOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setTicketPanelAnimatingOpen(false);
      setTicketPanelOpen(false);
    }
  }, []);

  const selectedTicket = useMemo(() => {
    if (!selectedTicketId) {
      return null;
    }

    return tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;
  }, [tickets, selectedTicketId]);

  return {
    selectedTicketId,
    selectedTicket,
    ticketPanelOpen,
    ticketPanelAnimatingOpen,
    panelMode,
    handleOpenTicket,
    handleOpenCreateForm,
    handleTicketPanelAnimationEnd,
    handleTicketPanelOpenChange,
  };
}