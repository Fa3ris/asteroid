import { Mass } from "../mass/mass";

export class ShipInput implements EventListenerObject {
  private steerState: State;
  private thrustState: State;

  constructor() {
    this.steerState = new Steer();
    this.thrustState = new Thrust();

    document.addEventListener("keydown", this);
    document.addEventListener("keyup", this);
  }

  public update(mass: Mass, elapsed: number): void {
    this.steerState.updateMass(mass, elapsed);
    this.thrustState.updateMass(mass, elapsed);
  }

  public handleEvent(evt: Event): void {
    this.steerState.handleEvent(evt);
    this.thrustState.handleEvent(evt);
  }
}

interface State {
  updateMass(mass: Mass, elapsed: number): void;
  handleEvent(evt: Event): State | void;
}

class Thrust implements State {
  private static THRUST: number = 300;

  private toggle: 0 | 1 = 0;
  private faceBack: 0 | 1 = 0;

  updateMass(mass: Mass, elapsed: number): void {
    // if (mass.speedNorm() >= 0 && this.faceBack == 1 && this.toggle == 1) { // cannot go backward
    //     return
    // }

    if (mass.speedNorm() >= Thrust.THRUST && this.faceBack == 0 && this.toggle == 1) { // cannot exceed THRUST going forward
        return
    }

    mass.push(
      mass.$theta + this.faceBack * Math.PI,
      this.toggle * Thrust.THRUST,
      elapsed
    );
  }

  handleEvent(evt: Event): State | void {
    if (evt instanceof KeyboardEvent) {
      if (evt.type === "keydown") {
        if (evt.key === "ArrowUp") {
          // forward

          this.toggle = 1;
          this.faceBack = 0;
          evt.preventDefault();
        } else if (evt.key === "ArrowDown") {
          // brake

          this.toggle = 1;
          this.faceBack = 1;

          evt.preventDefault();
        }
      } else if (evt.type === "keyup") {
        // stop pushing
        if (evt.key === "ArrowUp") {
          this.toggle = 0;
          //evt.preventDefault();
        } else if (evt.key === "ArrowDown") {
          this.toggle = 0;
          //evt.preventDefault();
        }
      }
    }

  }
}

class Steer implements State {
  private directions: { right: 0 | 1; left: 0 | 1 } = {
    right: 0,
    left: 0,
  };

  private static STEERING: number = 15;

  updateMass(mass: Mass, elapsed: number): void {
    mass.twist(
      (this.directions.right - this.directions.left) * Steer.STEERING,
      elapsed
    );
  }

  handleEvent(evt: Event): State | void {
    if (evt instanceof KeyboardEvent)
      if (evt.type === "keydown") {
        if (evt.key === "ArrowLeft") {
          this.directions.left = 1;
        } else if (evt.key === "ArrowRight") {
          this.directions.right = 1;
        }
      } else if (evt.type === "keyup") {
        if (evt.key === "ArrowLeft") {
          this.directions.left = 0;
        } else if (evt.key === "ArrowRight") {
          this.directions.right = 0;
        }
      }
    return;
  }
}
