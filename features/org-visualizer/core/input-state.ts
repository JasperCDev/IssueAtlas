export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface InputState {
  clicked(bounds: Rect): boolean;
}