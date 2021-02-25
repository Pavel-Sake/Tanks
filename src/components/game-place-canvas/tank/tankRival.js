import Tank from "./tank";

class TankRival extends Tank {
  constructor(...arg) {
    super(...arg);
    this.currentDirectionTank = 'ArrowDown';
    this.currentDirectionOfMovement = null;
    this.distanceTraveledTank = 0;
    this.distance = 0;
    this.positionSpriteOfTank = {
      x: 525,
      y: 981,
      width: 134,
      height: 195,
    };
  }

  move(getIntersectedObjs, arrOtherObjs, createShot) {

    this.ctx.drawImage(
      this.image, this.positionSpriteOfTank.x, this.positionSpriteOfTank.y,
      this.positionSpriteOfTank.width, this.positionSpriteOfTank.height,
      this.positionTank.x1, this.positionTank.y1,
      this.sizeTank.width, this.sizeTank.height
    );

    createShot(this.ctx, 5, this.positionGunAndDirectionShot, this.bulletSize, this.addBulletInActiveBullets);


    const allNextPosition = this.createNextPosition();

    const freeNextPosition = [];

    if (!this.currentDirectionOfMovement) {

      allNextPosition.forEach((nextPos) => {
        const intersectedObjs = getIntersectedObjs(nextPos.pos, arrOtherObjs);

        if (intersectedObjs.length === 0) {
          freeNextPosition.push(nextPos.name);
        }
      });

      const randomDirection = Math.floor(Math.random() * Math.floor(freeNextPosition.length));

      this.currentDirectionOfMovement = freeNextPosition[randomDirection];

      this.distance = Math.floor(Math.random() * Math.floor(1200));
    }

      switch (this.currentDirectionOfMovement) {
        case 'ArrowUp':
          let intersectedObjsUp = getIntersectedObjs(allNextPosition[0].pos, arrOtherObjs);

          this.changePositionSprite(this.dataTankInSprite.positionUp);

          if (intersectedObjsUp.length === 0) {
            this.positionTank.y1 -= this.TANK_STEP;
            this.positionTank.y2 -= this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
            {
            this.currentDirectionOfMovement = null;
          }

          this.positionGunX = this.positionTank.x1 + this.shiftToCenterTank;
          this.positionGunY = this.positionTank.y1 - this.shiftToBullet;
          this.currentDirectionTank = 'ArrowUp';

          this.randomChangeOfDirection();
          break;
        case 'ArrowDown':
          let intersectedObjsDown = getIntersectedObjs(allNextPosition[1].pos, arrOtherObjs);

          this.changePositionSprite(this.dataTankInSprite.positionDown);

          if (intersectedObjsDown.length === 0) {
            this.positionTank.y2 += this.TANK_STEP;
            this.positionTank.y1 += this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
          {
            this.currentDirectionOfMovement = null;
          }

          this.positionGunX = this.positionTank.x1 + this.shiftToCenterTank;
          this.positionGunY = this.positionTank.y1 + this.shiftToTank;
          this.currentDirectionTank = 'ArrowDown';

          this.randomChangeOfDirection();
          break;
        case 'ArrowLeft':
          const intersectedObjsLeft = getIntersectedObjs(allNextPosition[2].pos, arrOtherObjs);

          this.changePositionSprite(this.dataTankInSprite.positionLeft);

          if (intersectedObjsLeft.length === 0) {
            this.positionTank.x1 -= this.TANK_STEP;
            this.positionTank.x2 -= this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
          {
            this.currentDirectionOfMovement = null;
          }

          this.positionGunX = this.positionTank.x1 - this.shiftToBullet;
          this.positionGunY = this.positionTank.y1 + this.shiftToCenterTank;
          this.currentDirectionTank = 'ArrowLeft';

          this.randomChangeOfDirection();
          break;
        case 'ArrowRight':
          const intersectedObjsRight = getIntersectedObjs(allNextPosition[3].pos, arrOtherObjs);

          this.changePositionSprite(this.dataTankInSprite.positionRight);

          if (intersectedObjsRight.length === 0) {
            this.positionTank.x2 += this.TANK_STEP;
            this.positionTank.x1 += this.TANK_STEP;

            this.distanceTraveledTank += this.TANK_STEP;
          } else
          {
            this.currentDirectionOfMovement = null;
          }

          this.positionGunX = this.positionTank.x1 + this.shiftToTank;
          this.positionGunY = this.positionTank.y1 + this.shiftToCenterTank;
          this.currentDirectionTank = 'ArrowRight';

          this.randomChangeOfDirection();
          break;
      }
  }

  randomChangeOfDirection() {
    if (this.distanceTraveledTank > this.distance) {
      this.distanceTraveledTank = 0;
      this.currentDirectionOfMovement = null;
    }
  }

  createNextPosition() {
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

    return allNextPosition;
  }
}

export default TankRival;