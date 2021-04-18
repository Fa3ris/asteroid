import { COLOR } from "./color";

export interface StrokeStyle {
  strokeColor: COLOR;
  strokeWidth: number;
}

export const STROKE_STYLE_DEFAULT: StrokeStyle = {
  strokeColor: COLOR.WHITE,
  strokeWidth: 0.5,
};
