import { OrgVisualizerApp } from "./app/org-visualizer-app";

export class CanvasVisualizer {
  private readonly app: OrgVisualizerApp;

  constructor(canvas: HTMLCanvasElement) {
    this.app = new OrgVisualizerApp(canvas);
  }

  mount() {
    this.app.mount();
  }

  unmount() {
    this.app.unmount();
  }
}

export { ProjectGroup } from "./entities/project-group";
export { SprintGroup } from "./entities/sprint-group";
export { TicketNode } from "./entities/ticket-node";
export { ContainerEntity } from "./entities/container-entity";
export type { DrawContext, Entity, Point, UpdateContext } from "./entities/entity";
export { Scene } from "./scene/scene";
