import type { Project, Sprint, Ticket } from "@/lib/mock-data";

import { ContainerEntity } from "./container-entity";
import type { DrawContext } from "./entity";
import { SprintGroup } from "./sprint-group";

type ProjectGroupOptions = {
  project: Project;
  position: {
    x: number;
    y: number;
  };
  sprints: Sprint[];
  tickets: Ticket[];
};

const SPRINT_VERTICAL_GAP = 72;
const HEADER_OFFSET = 28;

export class ProjectGroup extends ContainerEntity {
  private readonly title: string;

  constructor(options: ProjectGroupOptions) {
    super({
      id: options.project.id,
      position: options.position,
    });

    this.title = options.project.name;

    this.setCurrentSprint(options.project, options.sprints, options.tickets);
  }

  private buildTicketsBySprintId(tickets: Ticket[]) {
    const ticketsBySprintId = new Map<string, Ticket[]>();

    for (let index = 0; index < tickets.length; index += 1) {
      const ticket = tickets[index]!;
      const sprintTickets = ticketsBySprintId.get(ticket.sprintId) ?? [];
      sprintTickets.push(ticket);
      ticketsBySprintId.set(ticket.sprintId, sprintTickets);
    }

    return ticketsBySprintId;
  }

  private setCurrentSprint(project: Project, sprints: Sprint[], tickets: Ticket[]) {
    const projectSprints = sprints.filter((sprint) => sprint.projectId === project.id);
    const projectTickets = tickets.filter((ticket) => ticket.projectId === project.id);
    const currentSprint = projectSprints.find((sprint) => sprint.id === project.currentSprintId);
    const ticketsBySprintId = this.buildTicketsBySprintId(projectTickets);

    this.setChildren(
      (currentSprint ? [currentSprint] : []).map((sprint, index) =>
        new SprintGroup({
          id: sprint.id,
          title: sprint.name,
          position: {
            x: 18,
            y: HEADER_OFFSET + index * SPRINT_VERTICAL_GAP,
          },
          tickets: ticketsBySprintId.get(sprint.id) ?? [],
        }),
      ),
    );
  }

  protected override draw({ context }: DrawContext) {
    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    context.font = "bold 14px monospace";
    context.fillText(this.title, 0, 12);
  }
}