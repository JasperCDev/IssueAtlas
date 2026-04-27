import { derive } from "@/lib/utils";
import { Component } from "../core/component";
import type { InputState, Rect } from "../core/input-state";
import type { Point, UpdateContext } from "../entities/entity";

class PointerState {
  readonly position: Point = { x: 0, y: 0 };
  isDown = false;
}

const DRAG_THRESHOLD_PX = 50;

export class InputManager extends Component implements InputState {
  private readonly _pointerState = new PointerState();
  private readonly _pointerDownPosition: Point = { x: 0, y: 0 };
  private _queuedClickStart = false;
  private _clickReleasedThisFrame = false;
  private _dragActive = false;
  private _dragEndedThisFrame = false;
  private _dragConsumed = false;
  private _clickConsumed = false;
  private _wheelDeltaY = 0;

  constructor(private readonly _canvas: HTMLCanvasElement) {
    super();
  }

  clicked(rect?: Rect) {
    if (this._clickConsumed) {
      return false;
    }

    if (!rect) {
      return this._clickReleasedThisFrame;
    }

    const isClicked = this._clickReleasedThisFrame && this.isMouseOver(rect);

    if (isClicked) {
      this._clickConsumed = true;
    }

    return isClicked;
  }

  isMouseOver(rect: Rect) {
    return this.isIntersecting(this._pointerState.position, rect);
  }

  isDragging(rect?: Rect) {
    if (this._dragConsumed) {
      return false;
    }

    const isDragging = derive(() => {
      if (!rect) {return this._dragActive;}
      return this._dragActive && this.isIntersecting(this._pointerDownPosition, rect);
    })

    if (isDragging) {
      this._dragConsumed = true;
    }

    return isDragging;
  }

  isDragEnd(rect?: Rect) {
    if (!rect) {
      return this._dragEndedThisFrame;
    }
    return (
      this._dragEndedThisFrame &&
      this.isIntersecting(this._pointerDownPosition, rect)
    );
  }

  getDragDelta(): Point {
    return {
      x: this._pointerState.position.x - this._pointerDownPosition.x,
      y: this._pointerState.position.y - this._pointerDownPosition.y,
    };
  }

  getPointerPosition(): Point {
    return {
      x: this._pointerState.position.x,
      y: this._pointerState.position.y,
    };
  }

  wheel() {
    const deltaY = this._wheelDeltaY;
    this._wheelDeltaY = 0;
    return deltaY;
  }

  mount() {
    this._canvas.addEventListener("pointerdown", this.handlePointerDown);
    this._canvas.addEventListener("pointermove", this.handlePointerMove);
    this._canvas.addEventListener("wheel", this.handleWheel, { passive: false });
    window.addEventListener("pointerup", this.handlePointerUp);
  }

  unmount() {
    this._canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this._canvas.removeEventListener("pointermove", this.handlePointerMove);
    this._canvas.removeEventListener("wheel", this.handleWheel);
    window.removeEventListener("pointerup", this.handlePointerUp);
  }

  override cleanup() {
    this._clickReleasedThisFrame = false;
    this._clickConsumed = false;
    this._dragConsumed = false;
    this._dragEndedThisFrame = false;
  }

  protected override update(context: UpdateContext) {
    void context;
    const deltaX = this._pointerState.position.x - this._pointerDownPosition.x;
    const deltaY = this._pointerState.position.y - this._pointerDownPosition.y;
    this._clickReleasedThisFrame = this._queuedClickStart;
    this._queuedClickStart = false;

    const newIsDrag =
      this._pointerState.isDown &&
      (this._dragActive || Math.hypot(deltaX, deltaY) >= DRAG_THRESHOLD_PX);

    const wasDragging = this._dragActive;
    this._dragActive = newIsDrag;

    if (!this._dragActive && wasDragging) {
      this._dragEndedThisFrame = true;
    }
  }

  private updatePointerPosition(clientX: number, clientY: number) {
    const rect = this._canvas.getBoundingClientRect();

    this._pointerState.position.x = clientX - rect.left;
    this._pointerState.position.y = clientY - rect.top;
  }

  private isIntersecting(a: Rect | Point, b: Rect | Point) {
    const aIsRect = "width" in a && "height" in a;
    const bIsRect = "width" in b && "height" in b;

    if (aIsRect && bIsRect) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }

    if (!aIsRect && bIsRect) {
      return (
        a.x >= b.x &&
        a.x <= b.x + b.width &&
        a.y >= b.y &&
        a.y <= b.y + b.height
      );
    }

    if (aIsRect && !bIsRect) {
      return (
        b.x >= a.x &&
        b.x <= a.x + a.width &&
        b.y >= a.y &&
        b.y <= a.y + a.height
      );
    }

    return a.x === b.x && a.y === b.y;
  }

  private handlePointerDown = (event: PointerEvent) => {
    this.updatePointerPosition(event.clientX, event.clientY);
    this._pointerState.isDown = true;
    this._pointerDownPosition.x = this._pointerState.position.x;
    this._pointerDownPosition.y = this._pointerState.position.y;
  };

  private handlePointerMove = (event: PointerEvent) => {
    this.updatePointerPosition(event.clientX, event.clientY);
  };

  private handlePointerUp = (event: PointerEvent) => {
    this.updatePointerPosition(event.clientX, event.clientY);

    if (this._pointerState.isDown && !this._dragActive) {
      this._queuedClickStart = true;
    }

    this._pointerState.isDown = false;
  };

  private handleWheel = (event: WheelEvent) => {
    this.updatePointerPosition(event.clientX, event.clientY);
    this._wheelDeltaY += event.deltaY;
    event.preventDefault();
  };
}
