import type { InputState, Rect } from "../core/input-state";
import type { Point } from "../entities/entity";
import { clamp } from "../utils";

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.0015;

export class Camera {
  private readonly _offset: Point = { x: 0, y: 0 };
  private readonly _panStartOffset: Point = { x: 0, y: 0 };
  private _zoom = 1;
  private _isPanning = false;

  get offset(): Point {
    return {
      x: this._offset.x,
      y: this._offset.y,
    };
  }

  get zoom() {
    return this._zoom;
  }

  screenToWorld(point: Point): Point {
    return {
      x: (point.x - this._offset.x) / this._zoom,
      y: (point.y - this._offset.y) / this._zoom,
    };
  }

  worldToScreen(point: Point): Point {
    return {
      x: this._offset.x + point.x * this._zoom,
      y: this._offset.y + point.y * this._zoom,
    };
  }

  worldToScreenRect(rect: Rect): Rect {
    const origin = this.worldToScreen(rect);

    return {
      x: origin.x,
      y: origin.y,
      width: rect.width * this._zoom,
      height: rect.height * this._zoom,
    };
  }

  adaptInputToWorldSpace(input: InputState): InputState {
    return {
      clicked: (rect) => {
        if (!rect) {
          return input.clicked();
        }

        return input.clicked(this.worldToScreenRect(rect));
      },
      isMouseOver: (rect) => input.isMouseOver(this.worldToScreenRect(rect)),
      isDragging: (rect) => {
        if (!rect) {
          return input.isDragging();
        }

        return input.isDragging(this.worldToScreenRect(rect));
      },
      isDragEnd: (rect) => {
        if (!rect) {
          return input.isDragEnd();
        }

        return input.isDragEnd(this.worldToScreenRect(rect));
      },
    };
  }

  updatePan(isDragging: boolean, isDragEnd: boolean, dragDelta: Point) {
    if (isDragging) {
      if (!this._isPanning) {
        this._panStartOffset.x = this._offset.x;
        this._panStartOffset.y = this._offset.y;
        this._isPanning = true;
      }

      this._offset.x = this._panStartOffset.x + dragDelta.x;
      this._offset.y = this._panStartOffset.y + dragDelta.y;
    }

    if (isDragEnd) {
      this._isPanning = false;
    }
  }

  zoomAt(pointerPosition: Point, wheelDeltaY: number) {
    if (wheelDeltaY === 0) {
      return;
    }

    const worldPoint = this.screenToWorld(pointerPosition);
    // Browser wheel delta is positive when scrolling down; invert so scroll-up zooms in.
    const zoomInput = -wheelDeltaY;
    const nextZoom = clamp(
      this._zoom * Math.exp(zoomInput * ZOOM_STEP),
      MIN_ZOOM,
      MAX_ZOOM,
    );

    this._zoom = nextZoom;
    this._offset.x = pointerPosition.x - worldPoint.x * this._zoom;
    this._offset.y = pointerPosition.y - worldPoint.y * this._zoom;
  }

  apply(context: CanvasRenderingContext2D) {
    context.translate(this._offset.x, this._offset.y);
    context.scale(this._zoom, this._zoom);
  }
}