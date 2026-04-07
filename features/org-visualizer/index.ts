import { TICKETS } from "@/lib/mock-data";
import { mapStringToNumber } from "@/lib/utils";

import { hexToRgb } from "./utils";

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

export class CanvasVisualizer {
  private context: CanvasRenderingContext2D;
  private tickets = TICKETS;

  constructor(private canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get canvas context");
    }
    this.context = context;
  }

  private getFillColor(assignedId: string | null) {
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

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.tickets.length; i++) {
      this.context.fillStyle = this.getFillColor(this.tickets[i]?.assignedId ?? null);

      const squareSize = 8;
      const y = Math.round(i * squareSize + 8 * i);
      this.context.fillRect(8, y, squareSize, squareSize);
      this.context.strokeStyle = "#000000";
      this.context.strokeRect(8, y, squareSize + 1, squareSize + 1);
    }
  }

  private initializeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
    window.addEventListener("resize", this.handleResize);
  }

  private handleResize = () => {
    this.initializeCanvas();
  }

  public unmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  public mount() {
    this.initializeCanvas();
  }

}
