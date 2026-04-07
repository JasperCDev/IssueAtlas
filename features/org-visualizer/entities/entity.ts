export type Point = {
  x: number;
  y: number;
};

export type UpdateContext = {
  deltaTime: number;
};

export type DrawContext = {
  context: CanvasRenderingContext2D;
};

type EntityOptions = {
  id: string;
  position: Point;
};

export abstract class Entity {
  readonly id: string;
  protected readonly position: Point;

  constructor(options: EntityOptions) {
    this.id = options.id;
    this.position = options.position;
  }

  _update(context: UpdateContext) {
    this.update(context);
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