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
