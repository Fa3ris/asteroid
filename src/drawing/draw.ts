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


export function drawText(ctx: CanvasRenderingContext2D, msg: string, x: number, y: number) {
    ctx.save();
    ctx.fillText(msg, x, y);
    ctx.restore();
}
