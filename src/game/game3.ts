import { Asteroid3 } from "../asteroid/asteroid3";
import { Point, Vector } from "../drawing/point";
import { Projectile } from "../projectile/projectile";
import { Ship2 } from "../ship/ship2";

export class Game3 {
  private ctx: CanvasRenderingContext2D;
  private previous: number = 0
  private asteroids: Asteroid3[] = []
  private ship: Ship2 = new Ship2();
  private projectiles: Projectile[] = []

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    for (let index = 0; index < 10; index++) {
      this.asteroids.push(new Asteroid3()) 
    }

    document.addEventListener("click", (evt: Event) => {

      if (evt instanceof MouseEvent) {

        const rect = this.ctx.canvas.getBoundingClientRect()
        const x = evt.clientX - rect.left
        const y = evt.clientY - rect.top
        const pos: Point = {x, y};
        const v: Vector = {x: 0, y: 20};
        this.projectiles.push(new Projectile(pos, v))
      }
    })

    document.addEventListener("shoot", (evt: Event) => { 
      console.log("SHOOT")
      this.projectiles.push(this.ship.projectile())
      
  });


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
    this.projectiles.forEach((projectile, index) => {
      projectile.update(this.ctx, elapsed)

      if (projectile.$lifetime <= 0) {
        this.projectiles.splice(index, 1);
      }
      
    })
  }

  draw() {
    this.asteroids.forEach(asteroid => asteroid.draw(this.ctx))
    this.ship.draw(this.ctx)
    this.projectiles.forEach(projectile => projectile.draw(this.ctx))
  }
}