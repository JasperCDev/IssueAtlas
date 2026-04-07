import { DrawContext, Entity, UpdateContext } from "./entity";

export abstract class ContainerEntity extends Entity {
  protected readonly children: Entity[] = [];

  addChild(child: Entity) {
    this.children.push(child);
  }

  protected setChildren(children: Entity[]) {
    this.children.length = 0;
    this.children.push(...children);
  }

  override _update(context: UpdateContext) {
    this.update(context);

    for (let index = 0; index < this.children.length; index += 1) {
      this.children[index]?._update(context);
    }
  }

  override _draw(context: DrawContext) {
    context.context.save();
    context.context.translate(this.position.x, this.position.y);
    this.draw(context);

    for (let index = 0; index < this.children.length; index += 1) {
      this.children[index]?._draw(context);
    }

    context.context.restore();
  }
}