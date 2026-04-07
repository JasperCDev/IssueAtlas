import { mapStringToNumber } from "@/lib/utils";

import { hexToRgb } from "../utils";
import { Entity, type DrawContext, type Point, type UpdateContext } from "./entity";

const VISUALIZER_COLOR_TOKENS = [
  "--primary",
  "--success",
  "--warning",
  "--destructive",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
] as const;

type TicketNodeOptions = {
  id: string;
  position: Point;
  size: number;
  assignedId: string | null;
};

export class TicketNode extends Entity {
  private readonly size: number;
  private readonly fillStyle: string;
  private readonly strokeStyle: string;

  constructor(options: TicketNodeOptions) {
    super({
      id: options.id,
      position: options.position,
    });

    this.size = options.size;
    this.fillStyle = this.resolveFillStyle(options.assignedId);
    this.strokeStyle = this.resolveStrokeStyle();
  }

  private resolveFillStyle(assignedId: string | null) {
    const styles = getComputedStyle(document.documentElement);

    if (!assignedId) {
      return styles.getPropertyValue("--muted").trim() || "#fafafa";
    }

    const token = VISUALIZER_COLOR_TOKENS[
      mapStringToNumber(assignedId, VISUALIZER_COLOR_TOKENS.length - 1)
    ];
    const value = styles.getPropertyValue(token).trim();

    return hexToRgb(value);
  }

  private resolveStrokeStyle() {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue("--border").trim() || "#000000";
  }

  protected override update(context: UpdateContext) {
    void context;
  }

  protected override draw(context: DrawContext) {
    context.context.fillStyle = this.fillStyle;
    context.context.fillRect(0, 0, this.size, this.size);

    context.context.strokeStyle = this.strokeStyle;
    context.context.strokeRect(0, 0, this.size + 1, this.size + 1);
  }
}