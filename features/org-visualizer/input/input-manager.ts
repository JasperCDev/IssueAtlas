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
  private readonly _prevPointerState = new PointerState();
  private _isClick = false;
  private _isDrag = false;
  private _isDragEnd = false;
  private _dragFlag = false;
  private _clickFlag = false;

  constructor(private readonly _canvas: HTMLCanvasElement) {
    super();
  }

  clicked(rect?: Rect) {
    if (this._clickFlag) {
      return false;
    }

    if (!rect) {
      return this._isClick;
    }

    const isClicked = this._isClick && this.isMouseOver(rect);

    if (isClicked) {
      this._clickFlag = true;
    }

    return isClicked;
  }

  isMouseOver(rect: Rect) {
    return (
      this._pointerState.position.x >= rect.x &&
      this._pointerState.position.x <= rect.x + rect.width &&
      this._pointerState.position.y >= rect.y &&
      this._pointerState.position.y <= rect.y + rect.height
    );
  }

  isDragging(rect?: Rect) {
    if (this._dragFlag) {
      return false;
    }

    const isDragging = derive(() => {
      if (!rect) {return this._isDrag;}
      return this._isDrag &&
        this._pointerDownPosition.x >= rect.x &&
        this._pointerDownPosition.x <= rect.x + rect.width &&
        this._pointerDownPosition.y >= rect.y &&
        this._pointerDownPosition.y <= rect.y + rect.height;
    })

    if (isDragging) {
      this._dragFlag = true;
    }

    return isDragging;
  }

  isDragEnd(rect?: Rect) {
    if (!rect) {
      return this._isDragEnd;
    }
    return (
      this._isDragEnd &&
      this._pointerDownPosition.x >= rect.x &&
      this._pointerDownPosition.x <= rect.x + rect.width &&
      this._pointerDownPosition.y >= rect.y &&
      this._pointerDownPosition.y <= rect.y + rect.height
    );
  }

  mount() {
    this._canvas.addEventListener("pointerdown", this.handlePointerDown);
    this._canvas.addEventListener("pointermove", this.handlePointerMove);
    window.addEventListener("pointerup", this.handlePointerUp);
  }

  unmount() {
    this._canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this._canvas.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
  }

  override cleanup() {
    this._prevPointerState.isDown = this._pointerState.isDown;
    this._isClick = false;
    this._clickFlag = false;
    this._dragFlag = false;
    this._isDragEnd = false;
  }

  protected override update(context: UpdateContext) {
    void context;
    const deltaX = this._pointerState.position.x - this._pointerDownPosition.x;
    const deltaY = this._pointerState.position.y - this._pointerDownPosition.y;
    this._isClick =
      this._pointerState.isDown && !this._prevPointerState.isDown;

    const newIsDrag =
      this._pointerState.isDown &&
      (this._isDrag || Math.hypot(deltaX, deltaY) >= DRAG_THRESHOLD_PX);

    const wasDragging = this._isDrag;
    this._isDrag = newIsDrag;

    if (!this._isDrag && wasDragging) {
      this._isDragEnd = true;
    }
  }

  private updatePointerPosition(clientX: number, clientY: number) {
    const rect = this._canvas.getBoundingClientRect();

    this._pointerState.position.x = clientX - rect.left;
    this._pointerState.position.y = clientY - rect.top;
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

  private handlePointerUp = () => {
    this._pointerState.isDown = false;
  };
}
