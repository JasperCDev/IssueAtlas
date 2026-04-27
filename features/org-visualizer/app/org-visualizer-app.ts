import {
  PROJECT_LIST,
  SPRINTS,
  TICKETS,
  TICKET_STATUS_LIST,
} from "@/lib/mock-data";
import { Component } from "../core/component";
import { Camera } from "../core/camera";
import { TicketGrid } from "../entities/ticket-grid";
import { InputManager } from "../input/input-manager";
import { Scene } from "../scene/scene";

export class OrgVisualizerApp {
  private readonly context: CanvasRenderingContext2D;
  private readonly scene = new Scene();
  private readonly input: InputManager;
  private readonly components: Component[];
  private readonly camera = new Camera();
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
    this.scene.replaceEntities([
      new TicketGrid({
        position: {
          x: 24,
          y: 80,
        },
        projects: PROJECT_LIST,
        sprints: SPRINTS,
        tickets: TICKETS,
        statuses: TICKET_STATUS_LIST,
      }),
    ]);
  }

  private frame = (time: number) => {
    const deltaTime =
      this.lastFrameTime === 0 ? 0 : (time - this.lastFrameTime) / 1000;
    this.lastFrameTime = time;

    for (let index = 0; index < this.components.length; index += 1) {
      this.components[index]?._update({
        deltaTime,
        input: this.input,
        worldPosition: { x: 0, y: 0 },
      });
    }

    this.camera.updatePan(
      this.input.isDragging(),
      this.input.isDragEnd(),
      this.input.getDragDelta(),
    );

    const wheelDeltaY = this.input.wheel();
    this.camera.zoomAt(this.input.getPointerPosition(), wheelDeltaY);

    const updateContext = {
      deltaTime,
      input: this.camera.adaptInputToWorldSpace(this.input),
      worldPosition: { x: 0, y: 0 },
    };

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.scene.update(updateContext);

    if (this.input.clicked()) {
      alert("background clicked!");
    }

    for (let index = 0; index < this.components.length; index += 1) {
      this.components[index]?.cleanup();
    }

    this.context.save();
    this.camera.apply(this.context);
    this.scene.draw({
      context: this.context,
    });
    this.context.restore();

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
