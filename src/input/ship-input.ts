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
    if (
      evt instanceof KeyboardEvent &&
      (evt.type === "keydown" || evt.type === "keyup")
    ) {
      const keys = ["ArrowUp", "ArrowDown"];

      if (keys.includes(evt.key)) {
        evt.preventDefault();
      }
    }
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

  private _thrust: State = new Still();

  updateMass(mass: Mass, elapsed: number): void {
    this._thrust.updateMass(mass, elapsed);
  }

  handleEvent(evt: Event): State | void {
    const newState = this._thrust.handleEvent(evt);
    if (newState) {
      this._thrust = newState;
    }
  }
}

class Forward implements State {
  private static THRUST: number = 300;

  updateMass(mass: Mass, elapsed: number): void {
    if (mass.speedNorm() <= Forward.THRUST) {
      mass.push(mass.$theta, Forward.THRUST, elapsed);
    }
  }

  handleEvent(evt: Event): void | State {
    if (
      evt instanceof KeyboardEvent &&
      evt.type === "keyup" &&
      evt.key === "ArrowUp"
    ) {
      return new Still();
    }
  }
}

class Still implements State {
  updateMass(mass: Mass, elapsed: number): void {}

  handleEvent(evt: Event): void | State {
    if (evt instanceof KeyboardEvent && evt.type === "keydown") {
      if (evt.key === "ArrowUp") {
        return new Forward();
      }
      if (evt.key === "ArrowDown") {
        return new Brake();
      }
    }
  }
}

class Brake implements State {
  updateMass(mass: Mass, elapsed: number): void {
    if (mass.$v.x > 0.0001 || mass.$v.y > 0.0001) {
      mass.push(mass.$theta + Math.PI, 15, elapsed);
    }
  }

  handleEvent(evt: Event): void | State {
    if (
      evt instanceof KeyboardEvent &&
      evt.type === "keyup" &&
      evt.key === "ArrowDown"
    ) {
      return new Still();
    }
  }
}

class Steer implements State {
  private directions: { right: 0 | 1; left: 0 | 1 } = {
    right: 0,
    left: 0,
  };

  private _steer: State = new SteerNeutral();

  private static STEERING: number = 15;

  updateMass(mass: Mass, elapsed: number): void {

    this._steer.updateMass(mass, elapsed);
    mass.twist(
      (this.directions.right - this.directions.left) * Steer.STEERING,
      elapsed
    );
  }

  handleEvent(evt: Event): State | void {
      const newSteer = this._steer.handleEvent(evt);
      if (newSteer) {
          this._steer = newSteer
      }
  }
}

class SteerLeft implements State {
  updateMass(mass: Mass, elapsed: number): void {

    if (mass.movementAngle() >= - Math.PI / 4) {

        mass.twist(-15, elapsed);
    }
  }
  handleEvent(evt: Event): void | State {
    if (evt instanceof KeyboardEvent)
      if (evt.type === "keydown") {
        if (evt.key === "ArrowRight") {
          return new SteerRight();
        }
      } else if (evt.type === "keyup") {
        if (evt.key === "ArrowLeft") {
          return new SteerNeutral();
        }
      }
    return;
  }
}

class SteerNeutral implements State {
  updateMass(mass: Mass, elapsed: number): void {}
  handleEvent(evt: Event): void | State {
    if (evt instanceof KeyboardEvent) {
      if (evt.type === "keydown") {
        if (evt.key === "ArrowLeft") {
          return new SteerLeft();
        } else if (evt.key === "ArrowRight") {
          return new SteerRight();
        }
      }
      return;
    }
  }
}

class SteerRight implements State {
  updateMass(mass: Mass, elapsed: number): void {

    if (mass.movementAngle() <=  Math.PI / 4) {
     mass.twist(15, elapsed);
    }
  }

  handleEvent(evt: Event): void | State {
    if (evt instanceof KeyboardEvent)
      if (evt.type === "keydown") {
        if (evt.key === "ArrowLeft") {
          return new SteerLeft();
        }
      } else if (evt.type === "keyup") {
        if (evt.key === "ArrowRight") {
          return new SteerNeutral();
        }
      }
    return;
  }
}
