import type { Project, Sprint, Ticket, TicketStatus } from "@/lib/mock-data";
import { mapStringToNumber } from "@/lib/utils";

import { hexToRgb } from "../utils";
import {
  Entity,
  type DrawContext,
  type Point,
  type UpdateContext,
} from "./entity";

const VISUALIZER_COLOR_TOKENS = [
  "--primary",
  "--success",
  "--warning",
  "--destructive",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
] as const;

type TicketGridOptions = {
  position: Point;
  projects: Project[];
  sprints: Sprint[];
  tickets: Ticket[];
  statuses: TicketStatus[];
};

type TicketCell = {
  id: string;
  assignedId: string | null;
  x: number;
  y: number;
};

export class TicketGrid extends Entity {
  private _ticketCells: TicketCell[] = [];

  constructor(private options: TicketGridOptions) {
    super({
      id: "ticket-grid",
      position: options.position,
    });
  }

  protected override update(context: UpdateContext) {
    for (let i = 0; i < this._ticketCells.length; i += 1) {
      const cell = this._ticketCells[i]!;

      if (
        context.input.clicked({
          x: context.worldPosition.x + cell.x,
          y: context.worldPosition.y + cell.y,
          width: 8,
          height: 8,
        })
      ) {
        window.alert(`Ticket clicked: ${cell.id}`);
        return;
      }
    }
  }

  protected override draw({ context }: DrawContext) {
    this._ticketCells = [];
    const sprints = this.options.sprints.map((sprint) => {
      return {
        ...sprint,
        projects: this.options.projects.map((project) => {
          return {
            ...project,
            tickets: this.options.tickets
              .filter((ticket) => {
                if (ticket.sprintId !== sprint.id) {
                  return false;
                }
                if (ticket.projectId !== project.id) {
                  return false;
                }
                return true;
              })
              .reduce(
                (acc, ticket) => {
                  this.options.statuses.forEach((status) => {
                    if (ticket.statusId === status.id) {
                      acc[status.name].push(ticket);
                    }
                  });
                  return acc;
                },
                Object.fromEntries(
                  this.options.statuses.map((s) => [s.name, [] as Ticket[]]),
                ),
              ),
          };
        }),
      };
    });
    let x = 0;
    let y = 0;
    for (let sprintIndex = 0; sprintIndex < sprints.length; sprintIndex += 1) {
      const sprint = sprints[sprintIndex]!;
      const sprintDateLabel = `${sprint.start.toLocaleDateString()} - ${sprint.end.toLocaleDateString()}`;

      context.fillStyle = "rgba(255, 255, 255, 0.72)";
      context.font = "16px monospace";
      context.fillText(sprintDateLabel, x, y, 300);
      y += 24;
      for (
        let projectIndex = 0;
        projectIndex < sprint.projects.length;
        projectIndex += 1
      ) {
        const project = sprint.projects[projectIndex]!;
        context.fillStyle = "rgba(255, 255, 255, 0.72)";
        context.font = "12px monospace";
        context.fillText(project.name, x, y, 300);
        y += 18;
        const tempY = y;
        for (
          let statusIndex = 0;
          statusIndex < this.options.statuses.length;
          statusIndex += 1
        ) {
          const status = this.options.statuses[statusIndex]!;
          const tickets = project.tickets[
            status.name as keyof typeof project.tickets
          ] as Ticket[];
          context.fillStyle = "rgba(255, 255, 255, 0.72)";
          context.font = "12px monospace";
          context.fillText(status.name, x, y, 100);
          y += 18;
          tickets.forEach((ticket) => {
            const fillStyle = this.resolveFillStyle(ticket.assignedId);
            context.fillStyle = fillStyle;
            context.fillRect(x, y, 8, 8);
            this._ticketCells.push({ id: ticket.id, assignedId: ticket.assignedId, x, y });
            y += 12;
          });
          x += 116;
          y = tempY;
        }
        y -= 18;
      }
      x += 300;
      y = 0;
    }
  }
  private resolveFillStyle(assignedId: string | null) {
    const styles = getComputedStyle(document.documentElement);

    if (!assignedId) {
      return styles.getPropertyValue("--muted").trim() || "#fafafa";
    }

    const token =
      VISUALIZER_COLOR_TOKENS[
        mapStringToNumber(assignedId, VISUALIZER_COLOR_TOKENS.length - 1)
      ];
    const value = styles.getPropertyValue(token).trim();

    return hexToRgb(value);
  }
}
