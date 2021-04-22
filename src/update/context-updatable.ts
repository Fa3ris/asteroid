export interface ContextUpdatable {
    update(ctx: CanvasRenderingContext2D, elapsed: number): void;
}