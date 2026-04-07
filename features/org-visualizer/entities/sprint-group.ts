import type { Ticket } from "@/lib/mock-data";

import { ContainerEntity } from "./container-entity";
import type { DrawContext } from "./entity";
import { TicketNode } from "./ticket-node";

type SprintGroupOptions = {
  id: string;
  title: string;
  position: {
    x: number;
    y: number;
  };
  tickets: Ticket[];
};

const TICKETS_PER_ROW = 12;
const TICKET_SIZE = 8;
const TICKET_GAP = 6;
const HEADER_OFFSET = 22;

export class SprintGroup extends ContainerEntity {
  private readonly title: string;

  constructor(options: SprintGroupOptions) {
    super({
      id: options.id,
      position: options.position,
    });

    this.title = options.title;

    this.setChildren(
      options.tickets.map((ticket, index) => {
        const column = index % TICKETS_PER_ROW;
        const row = Math.floor(index / TICKETS_PER_ROW);

        return new TicketNode({
          id: ticket.id,
          position: {
            x: column * (TICKET_SIZE + TICKET_GAP),
            y: HEADER_OFFSET + row * (TICKET_SIZE + TICKET_GAP),
          },
          size: TICKET_SIZE,
          assignedId: ticket.assignedId,
        });
      }),
    );
  }


  protected override draw({ context }: DrawContext) {
    context.fillStyle = "rgba(255, 255, 255, 0.72)";
    context.font = "12px monospace";
    context.fillText(this.title, 0, 10);
  }
}