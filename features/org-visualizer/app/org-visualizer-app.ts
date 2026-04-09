import { PROJECT_LIST, SPRINTS, TICKETS } from "@/lib/mock-data";
import { Component } from "../core/component";
import { ProjectGroup } from "../entities/project-group";
import { InputManager } from "../input/input-manager";
import { Scene } from "../scene/scene";

export class OrgVisualizerApp {
  private readonly context: CanvasRenderingContext2D;
  private readonly scene = new Scene();
  private readonly input: InputManager;
  private readonly components: Component[];
  private animationFrameId: number | null = null;
  private lastFrameTime = 0;

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get canvas context");
    }

    this.context = context;
    this.input = new InputManager(canvas);
    this.components = [this.input];
  }

  private resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private rebuildScene() {
    const projectGroups = PROJECT_LIST.map((project, index) =>
      new ProjectGroup({
        project,
        position: {
          x: 24,
          y: 32 + index * 112,
        },
        sprints: SPRINTS,
        tickets: TICKETS,
      }),
    );

    this.scene.replaceEntities(projectGroups);
  }

  private frame = (time: number) => {
    const deltaTime = this.lastFrameTime === 0 ? 0 : (time - this.lastFrameTime) / 1000;
    this.lastFrameTime = time;
    const updateContext = {
      deltaTime,
      input: this.input,
      worldPosition: { x: 0, y: 0 },
    };

    for (let index = 0; index < this.components.length; index += 1) {
      this.components[index]?._update(updateContext);
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.scene.update(updateContext);

    this.scene.draw({
      context: this.context,
    });

    this.animationFrameId = window.requestAnimationFrame(this.frame);
  };

  private handleResize = () => {
    this.resizeCanvas();
  };

  mount() {
    this.resizeCanvas();
    this.rebuildScene();
    this.input.mount();
    window.addEventListener("resize", this.handleResize);
    this.animationFrameId = window.requestAnimationFrame(this.frame);
  }

  unmount() {
    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    window.removeEventListener("resize", this.handleResize);
    this.input.unmount();
  }
}