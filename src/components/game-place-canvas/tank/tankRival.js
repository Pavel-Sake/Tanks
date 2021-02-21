import Tank from "./tank";

class TankRival extends Tank {
  constructor(...arg) {
    super(...arg);
    this.currentDirectionTank = null;
    this.distanceTraveledTank = 0


    this.distance = 0;
  }

  move(getIntersectedObjs, arrOtherObjs) {
    const {borderStartY, borderEndY, borderStartX, borderEndX} = this.bordersCanvas;

    this.ctx.fillStyle = "#ab2c77";
    this.ctx.fillRect(this.positionTank.x1, this.positionTank.y1, this.sizeTank.width, this.sizeTank.height);


    const nextPositionUp = {
      name: 'ArrowUp',
      pos: {
        x1: this.positionTank.x1,
        x2: this.positionTank.x2,
        y1: this.positionTank.y1 - this.TANK_STEP,
        y2: this.positionTank.y2,
      }
    };
    const nextPositionDown = {
      name: 'ArrowDown',
      pos: {
        x1: this.positionTank.x1,
        x2: this.positionTank.x2,
        y1: this.positionTank.y1,
        y2: this.positionTank.y2 + this.TANK_STEP,
      }

    };
    const nextPositionLeft = {
      name: 'ArrowLeft',
      pos: {
        x1: this.positionTank.x1 - this.TANK_STEP,
        x2: this.positionTank.x2,
        y1: this.positionTank.y1,
        y2: this.positionTank.y2,
      }
    };
    const nextPositionRight = {
      name: 'ArrowRight',
      pos: {
        x1: this.positionTank.x1,
        x2: this.positionTank.x2 + this.TANK_STEP,
        y1: this.positionTank.y1,
        y2: this.positionTank.y2,
      }

    };

    const allNextPosition = [nextPositionUp, nextPositionDown, nextPositionLeft, nextPositionRight];

    const freeNextPosition = [];

    if (!this.currentDirectionTank) {

      allNextPosition.forEach((nextPos) => {
        const intersectedObjs = getIntersectedObjs(nextPos.pos, arrOtherObjs);

        if (intersectedObjs.length === 0) {
          freeNextPosition.push(nextPos.name);
        }
      });

      const randomDirection = Math.floor(Math.random() * Math.floor(freeNextPosition.length));

      this.currentDirectionTank = freeNextPosition[randomDirection];

      this.distance = Math.floor(Math.random() * Math.floor(1200));
    }


      switch (this.currentDirectionTank) {
        case 'ArrowUp':
          let intersectedObjsUp = getIntersectedObjs(nextPositionUp.pos, arrOtherObjs);

          if (intersectedObjsUp.length === 0) {
            this.positionTank.y1 -= this.TANK_STEP;
            this.positionTank.y2 -= this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
            {
            this.currentDirectionTank = null;
          }

          this.randomChangeOfDirection();
          break;
        case 'ArrowDown':
          let intersectedObjsDown = getIntersectedObjs(nextPositionDown.pos, arrOtherObjs);

          if (intersectedObjsDown.length === 0) {
            this.positionTank.y2 += this.TANK_STEP;
            this.positionTank.y1 += this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
          {
            this.currentDirectionTank = null;
          }

          this.randomChangeOfDirection();
          break;
        case 'ArrowLeft':
          const intersectedObjsLeft = getIntersectedObjs(nextPositionLeft.pos, arrOtherObjs);

          if (intersectedObjsLeft.length === 0) {
            this.positionTank.x1 -= this.TANK_STEP;
            this.positionTank.x2 -= this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
          {
            this.currentDirectionTank = null;
          }

          this.randomChangeOfDirection();
          break;
        case 'ArrowRight':
          const intersectedObjsRight = getIntersectedObjs(nextPositionRight.pos, arrOtherObjs);

          if (intersectedObjsRight.length === 0) {
            this.positionTank.x2 += this.TANK_STEP;
            this.positionTank.x1 += this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
          {
            this.currentDirectionTank = null;
          }

          this.randomChangeOfDirection();
          break;
      }
  }

  randomChangeOfDirection() {
    if (this.distanceTraveledTank > this.distance) {
      this.distanceTraveledTank = 0;
      this.currentDirectionTank = null;
    }
  }
}

export default TankRival;