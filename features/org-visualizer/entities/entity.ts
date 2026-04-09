import { Component } from "../core/component";
import type { InputState } from "../core/input-state";

export type Point = {
  x: number;
  y: number;
};

export type UpdateContext = {
  deltaTime: number;
  input: InputState;
  worldPosition: Point;
};

export type DrawContext = {
  context: CanvasRenderingContext2D;
};

type EntityOptions = {
  id: string;
  position: Point;
};

export abstract class Entity extends Component {
  readonly id: string;
  protected readonly position: Point;

  constructor(options: EntityOptions) {
    super();
    this.id = options.id;
    this.position = options.position;
  }

  override _update(context: UpdateContext) {
    super._update({
      ...context,
      worldPosition: {
        x: context.worldPosition.x + this.position.x,
        y: context.worldPosition.y + this.position.y,
      },
    });
  }

  _draw(context: DrawContext) {
    context.context.save();
    context.context.translate(this.position.x, this.position.y);
    this.draw(context);
    context.context.restore();
  }

  protected update(context: UpdateContext) {
    void context;
  }

  protected draw(context: DrawContext) {
    void context;
  }
}