import type { DrawContext, Entity, UpdateContext } from "../entities/entity";

export class Scene {
  private readonly entities: Entity[] = [];

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  replaceEntities(entities: Entity[]) {
    this.entities.length = 0;
    this.entities.push(...entities);
  }

  update(context: UpdateContext) {
    for (let index = 0; index < this.entities.length; index += 1) {
      this.entities[index]?._update(context);
    }
  }

  draw(context: DrawContext) {
    for (let index = 0; index < this.entities.length; index += 1) {
      this.entities[index]?._draw(context);
    }
  }
}