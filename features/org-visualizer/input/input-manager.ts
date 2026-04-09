import { Component } from "../core/component";
import type { InputState, Rect } from "../core/input-state";
import type { Point, UpdateContext } from "../entities/entity";

class PointerState {
  readonly position: Point = { x: 0, y: 0 };
  isDown = false;
}

export class InputManager extends Component implements InputState {
  private readonly pointerState = new PointerState();
  private readonly previousPointerState = new PointerState();

  constructor(private readonly target: HTMLCanvasElement) {
    super();
  }

  clicked(bounds: Rect) {
    return (
      this.pointerState.isDown &&
      !this.previousPointerState.isDown &&
      this.pointerState.position.x >= bounds.x &&
      this.pointerState.position.x <= bounds.x + bounds.width &&
      this.pointerState.position.y >= bounds.y &&
      this.pointerState.position.y <= bounds.y + bounds.height
    );
  }

  mount() {
    this.target.addEventListener("pointerdown", this.handlePointerDown);
    window.addEventListener("pointerup", this.handlePointerUp);
  }

  unmount() {
    this.target.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointerup", this.handlePointerUp);
  }

  protected override update(context: UpdateContext) {
    void context;
    this.previousPointerState.isDown = this.pointerState.isDown;
  }

  private updatePointerPosition(clientX: number, clientY: number) {
    const bounds = this.target.getBoundingClientRect();

    this.pointerState.position.x = clientX - bounds.left;
    this.pointerState.position.y = clientY - bounds.top;
  }

  private handlePointerDown = (event: PointerEvent) => {
    this.updatePointerPosition(event.clientX, event.clientY);
    this.pointerState.isDown = true;
  };

  private handlePointerUp = () => {
    this.pointerState.isDown = false;
  };
}