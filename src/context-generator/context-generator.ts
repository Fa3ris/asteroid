export interface ContextDimension {
  width: number;
  heigth: number;
}

export function generateContexts(
  count: number,
  ctxDimension: ContextDimension
): CanvasRenderingContext2D[] {
  const ctx: CanvasRenderingContext2D[] = [];

  for (let index = 0; index < count; index++) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = ctxDimension.width;
    canvas.height = ctxDimension.heigth;
    ctx.push(canvas.getContext("2d") as CanvasRenderingContext2D);

    const div: HTMLDivElement = document.createElement("div");
    div.appendChild(canvas);

    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName(
      "flex-container"
    );
    elements[0].appendChild(div);
  }
  return ctx;
}
