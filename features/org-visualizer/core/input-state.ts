export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface InputState {
  clicked(rect?: Rect): boolean;
  isMouseOver(rect: Rect): boolean;
  isDragging(rect?: Rect): boolean;
  isDragEnd(rect?: Rect): boolean;
}