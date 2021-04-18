import { CANVAS_H, CANVAS_W } from "../drawing/draw";

export interface ContextDimension {
  width: number;
  heigth: number;
}

const DEFAULT_CTX_DIMENSION: ContextDimension = {
  width: CANVAS_W,
  heigth: CANVAS_H,
};

export function generateContext(
  ctxDimension: ContextDimension = DEFAULT_CTX_DIMENSION
): CanvasRenderingContext2D {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = ctxDimension.width;
  canvas.height = ctxDimension.heigth;

  const div: HTMLDivElement = document.createElement("div");
  div.appendChild(canvas);

  const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(
    "flex-container"
  );
  elements[0].appendChild(div);

  return canvas.getContext("2d") as CanvasRenderingContext2D;
}

export function generateContexts(
  count: number,
  ctxDimension?: ContextDimension
): CanvasRenderingContext2D[] {
  const ctx: CanvasRenderingContext2D[] = [];
  for (let index = 0; index < count; index++) {
    ctx.push(generateContext(ctxDimension));
  }
  return ctx;
}
