import type { UpdateContext } from "../entities/entity";

export abstract class Component {
  _update(context: UpdateContext) {
    this.update(context);
  }

  protected update(context: UpdateContext) {
    void context;
  }
}