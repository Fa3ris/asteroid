import { CANVAS_H, CANVAS_W } from "./draw";
import { Drawable } from "./drawable";
import { Point } from "./point";
import { StrokeStyle, STROKE_STYLE_DEFAULT } from "./stroke-style";
import { StyledLine } from "./styled-line";

export const DEFAULT_ORIGIN: Point = {
  x: 0,
  y: 0,
};

export const DEFAULT_STEP: number = 10;
export const DEFAULT_MAJOR_STEP_FACTOR = 5;

export class Grid implements Drawable {
  private lines: StyledLine[] = [];

  private width: number;
  private height: number;
  private x0: number;
  private y0: number;
  private minorStrokeStyle: StrokeStyle;
  private majorStrokeStyle: StrokeStyle;
  private step: number;
  private majorStep: number;

  constructor(dimension?: GridDimension) {
    this.width = dimension?.width || CANVAS_W;
    this.height = dimension?.height || CANVAS_H;

    this.x0 = dimension?.origin?.x || DEFAULT_ORIGIN.x;
    this.y0 = dimension?.origin?.y || DEFAULT_ORIGIN.y;

    this.minorStrokeStyle = dimension?.minorStrokeStyle || STROKE_STYLE_DEFAULT;
    this.majorStrokeStyle = dimension?.majorStrokeStyle || STROKE_STYLE_DEFAULT;
    this.step = dimension?.step || DEFAULT_STEP;
    const majorStepFactor =
      dimension?.majorStepFactor || DEFAULT_MAJOR_STEP_FACTOR;
    this.majorStep = this.step * majorStepFactor;

    this.createLines();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (const line of this.lines) {
      line.draw(ctx);
    }
  }

  private createLines(): void {
    this.lines = [];
    this.createVerticalLines();
    this.createHorizontalLines();
  }

  private createVerticalLines(): void {
    for (let x = this.x0; x < this.width; x += this.step) {
      this.lines.push(this.createVerticalLine(x));
    }
  }

  private createVerticalLine(x: number): StyledLine {
    return new StyledLine(
      this.getStartVertical(x),
      this.getEndVertical(x),
      this.getStyle(x)
    );
  }

  private getStartVertical(x: number): Point {
    return { x, y: this.y0 };
  }

  private getEndVertical(x: number): Point {
    return { x, y: this.height };
  }

  private createHorizontalLines(): void {
    for (let y = this.y0; y < this.height; y += this.step) {
      this.lines.push(this.createHorizontalLine(y));
    }
  }

  private createHorizontalLine(y: number): StyledLine {
    return new StyledLine(
      this.getStartHorizontal(y),
      this.getEndHorizontal(y),
      this.getStyle(y)
    );
  }

  private getStartHorizontal(y: number): Point {
    return { x: this.x0, y };
  }

  private getEndHorizontal(y: number): Point {
    return { x: this.width, y };
  }

  private getStyle(i: number): StrokeStyle {
    return i % this.majorStep == 0
      ? this.majorStrokeStyle
      : this.minorStrokeStyle;
  }
}

// const LINE_CONFIG_DEFAULT: LineConfig = {
//   color: COLOR.WHITE,
//   width: 0.5,
// };

export interface GridDimension {
  origin?: Point;
  width?: number;
  height?: number;
  step?: number;
  majorStepFactor?: number;
  minorStrokeStyle?: StrokeStyle;
  majorStrokeStyle?: StrokeStyle;
}

// interface GridConfigOptions {
//   x: AxisConfig;
//   y: AxisConfig;
// }

// interface FillStyle {
//   fillColor?: COLOR;
//   fillWidth?: number;
// }

// interface TextStyle {
//   textColor?: COLOR;
//   textWidth?: number;
//   font?: string;
// }

// remove
// interface LineConfig {
//   color: COLOR;
//   width: number;
// }

// interface AxisStyle extends StrokeStyle, TextStyle {}

// interface AxisConfig {
//   style?: AxisStyle;
// }

// interface AxisConfig {
//   step: number;
//   majorFactor: number;

//   minorLineWidth: number;
//   majorLineWidth: number;

//   lineColor: COLOR;
//   textColor: COLOR;

//   drawLines: boolean;
//   drawCoordinate: boolean;
// }

// interface LineOption {
//   lineColor: COLOR;

//   minorLineWidth: number;
//   majorLineWidth: number;
// }

// interface CoordinateOption {
//   textColor: COLOR;
// }

// enum AxisID {
//   X,
//   Y,
// }

// interface Dimension {
//   mainLength: number;
//   crossLength: number;
//   minor: number;
//   major: number;
// }

// class GridHorizontalAxis extends StyledLine {
//     constructor(y: number, gridDimension: GridDimension, style?: StrokeStyle) {
//       const start: Point = { x: 0, y };
//       const end: Point = { x: gridDimension.width, y };
//       super(start, end, style);
//     }
//   }

//   class GridVerticalAxis extends StyledLine {
//     constructor(x: number, gridDimension: GridDimension, style?: StrokeStyle) {
//       const start: Point = { x, y: 0 };
//       const end: Point = { x, y: gridDimension.height };
//       super(start, end, style);
//     }
//   }

//   interface GridConfig {
//     width: number;
//     heigth: number;
//     xAxisConfig: AxisConfig;
//     yAxisConfig: AxisConfig;
//   }

//   const AXIS_CONFIG_DEFAULT: AxisConfig = {
//     drawCoordinate: true,
//     drawLines: true,
//     lineColor: COLOR.WHITE,
//     step: 10,
//     majorFactor: 5,
//     majorLineWidth: 0.75,
//     minorLineWidth: 0.5,
//     textColor: COLOR.WHITE,
//   };

// export function drawGrid(
//   ctx: CanvasRenderingContext2D,
//   config: GridConfigOptions
// ): void {}

// function drawAxis(
//   ctx: CanvasRenderingContext2D,
//   config: AxisConfig,
//   dim: Dimension
// ): void {
//   ctx.save();
//   for (let i = 0; i < dim.mainLength; i += dim.minor) {
//     ctx.beginPath();
//     ctx.moveTo(i, 0);
//     ctx.lineTo(i, dim.crossLength);
//     ctx.lineWidth = getLineThickness(i, config, dim);
//     ctx.stroke();
//     // if (shouldWriteXCoordinate(i)) {
//     //   ctx.fillText(String(i), i, 10);
//     // }
//   }

//   ctx.restore();
// }

// function drawLines(
//   ctx: CanvasRenderingContext2D,
//   lineOption: LineOption,
//   dimension: Dimension
// ): void {
//   ctx.save();
//   ctx.strokeStyle = lineOption.lineColor;
//   for (let i = 0; i < dimension.mainLength; i += dimension.minor) {
//     ctx.beginPath();
//     ctx.moveTo(i, 0);
//     ctx.lineTo(i, dimension.crossLength);
//     ctx.lineWidth = getLineThickness(i, lineOption, dimension);
//     ctx.stroke();
//   }
//   ctx.restore();
// }

// function drawLine(
//   ctx: CanvasRenderingContext2D,
//   start: Point,
//   end: Point
// ): void {
//   ctx.beginPath();
//   ctx.moveTo(start.x, start.y);
//   ctx.lineTo(end.x, end.y);
//   // ctx.lineWidth = getLineThickness(i, lineOption, dimension);
//   ctx.stroke();
// }

// function shouldWriteLine(config: AxisConfig): boolean {
//   return config.drawLines;
// }

// function getLineThickness(
//   x: number,
//   lineOption: LineOption,
//   dimension: Dimension
// ): number {
//   if (isMajorLine(x, dimension)) {
//     return lineOption.majorLineWidth;
//   } else {
//     return lineOption.minorLineWidth;
//   }
// }

// function isMajorLine(l: number, dimension: Dimension): boolean {
//   return l % dimension.major == 0;
// }
