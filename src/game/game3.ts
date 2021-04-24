import { Asteroid3 } from "../asteroid/asteroid3";
import { Ship2 } from "../ship/ship2";

export class Game3 {
  private ctx: CanvasRenderingContext2D;
  private previous: number;
  private asteroids: Asteroid3[];
  private ship: Ship2;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.asteroids = [];
    for (let index = 0; index < 10; index++) {
      this.asteroids.push(new Asteroid3())
      
    }
    this.ship = new Ship2();
    this.previous = 0;
    window.requestAnimationFrame((time: number) => this.frame(time));
  }

  frame(time: number): void {
    const elapsed = (time - this.previous) / 1000; // elapsed in seconds

    this.update(elapsed);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.draw();
    this.previous = time;
    window.requestAnimationFrame((time: number) => this.frame(time));
  }

  update(elapsed: number) {
    this.asteroids.forEach(asteroid => asteroid.update(this.ctx, elapsed))
    this.ship.update(this.ctx, elapsed)
  }

  draw() {
    this.asteroids.forEach(asteroid => asteroid.draw(this.ctx))
    this.ship.draw(this.ctx)
  }
}