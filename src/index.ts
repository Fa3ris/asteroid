import { drawRect, drawStickFigure, drawText } from "./drawing/draw";
import "./style.scss";

console.log("hello world!");

const CANVAS_W = 400;
const CANVAS_H = 400;

const canvas: HTMLCanvasElement = document.createElement("canvas");

canvas.id = "canvas";
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;

document.body.appendChild(canvas);

const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

enum COLOR {

    DIM_GREY = "dimgrey",
    LIGHTGREY = "lightgrey",
    WHITE = "white",
    BLACK = "black",
    RED = "red"

}

context.strokeStyle = COLOR.DIM_GREY;
context.lineWidth = 10;

drawRect(context, 75, 75, 250, 250);

context.lineWidth = 5;
context.strokeStyle = COLOR.WHITE;

drawRect(context, 90, 90, 220, 220);

context.fillStyle = COLOR.LIGHTGREY;
context.fill();

context.font = "34px Arial";
context.fillStyle = COLOR.RED;
context.textAlign = "end";

drawText(context, "hello", 200, 32);

drawStickFigure(context);
