export const OFFSET_CANVAS_X: number = 40;
export const OFFSET_CANVAS_Y: number = 50;

export const CANVAS_W: number = 400;
export const CANVAS_H: number = 400;

export function createCanvas2DContext(
  id: string,
  topLeftX: number,
  topLeftY: number,
  w: number = CANVAS_W,
  h: number = CANVAS_H
): CanvasRenderingContext2D {
  const canvas: HTMLCanvasElement = document.createElement("canvas");

  canvas.id = id;
  canvas.width = w;
  canvas.height = h;
  const style = `position: absolute;left: ${topLeftX}px; top: ${topLeftY}px;`;
  canvas.setAttribute("style", style);

  document.body.appendChild(canvas);

  return canvas.getContext("2d") as CanvasRenderingContext2D;
}

export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke();
  ctx.restore();
}

export function drawStickFigure(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(200, 140, 20, 0, (3 * Math.PI) / 2);
  ctx.moveTo(200, 160);
  ctx.lineTo(200, 220);
  ctx.stroke();
  ctx.restore();
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  msg: string,
  x: number,
  y: number
) {
  ctx.save();
  ctx.fillText(msg, x, y);
  ctx.restore();
}

export enum COLOR {
  DIM_GREY = "dimgrey",
  LIGHTGREY = "lightgrey",
  WHITE = "white",
  BLACK = "black",
  RED = "red",
  GHOST_WHITE = "GhostWhite",
  GREEN = "green",
}
