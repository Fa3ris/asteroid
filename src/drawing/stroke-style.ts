import { COLOR } from "./color";

export interface StrokeStyle {
  strokeColor: COLOR;
  strokeWidth: number;
}


export const DEFAULT_STROKE_COLOR: COLOR = COLOR.WHITE;

export const DEFAULT_STROKE_WIDTH: number = .5;

export const STROKE_STYLE_DEFAULT: StrokeStyle = {
  strokeColor: DEFAULT_STROKE_COLOR,
  strokeWidth: DEFAULT_STROKE_WIDTH,
};


