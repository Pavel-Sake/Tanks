class Tank {
  constructor(
    ctx, positionTank, positionGunX, positionGunY,
    sizeTank, bulletSize, bordersCanvas, TANK_STEP,
    shiftToTank, shiftToBullet, shiftToCenterTank
  ) {
    this.ctx = ctx;

    this.positionTank = positionTank;
    this.positionGunX = positionGunX;
    this.positionGunY = positionGunY;

    this.shiftToTank = shiftToTank;
    this.shiftToBullet = shiftToBullet;
    this.shiftToCenterTank = shiftToCenterTank;

    this.sizeTank = sizeTank;
    this.bulletSize = bulletSize;
    this.bordersCanvas = bordersCanvas;

    this.TANK_STEP = TANK_STEP;
    this.currentDirectionTank = 'ArrowUp';
  }

  move(keyPress, getIntersectedObjs, arrOtherObjs) {
    const {borderStartY, borderEndY, borderStartX, borderEndX} = this.bordersCanvas;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.positionTank.x1, this.positionTank.y1, this.sizeTank.width, this.sizeTank.height);

    this.nextPosition = {
      x1: this.positionTank.x1,
      x2: this.positionTank.x2,
      y1: this.positionTank.y1,
      y2: this.positionTank.y2,
    };


    switch (keyPress) {
      case 'ArrowUp':
          this.nextPosition.y1 -= this.TANK_STEP;

          const intersectedObjsUp = getIntersectedObjs(this.nextPosition, arrOtherObjs);

          if (intersectedObjsUp.length === 0) {
            this.positionTank.y1 -= this.TANK_STEP;
            this.positionTank.y2 -= this.TANK_STEP;
          } else {
            this.nextPosition.y1 = this.positionTank.y1;
          }

          this.positionGunX = this.positionTank.x1 + this.shiftToCenterTank;
          this.positionGunY = this.positionTank.y1 - this.shiftToBullet;

          this.currentDirectionTank = 'ArrowUp';
        break;
      case 'ArrowDown':
          this.nextPosition.y2 += this.TANK_STEP;

          const intersectedObjsDown = getIntersectedObjs(this.nextPosition, arrOtherObjs);

          if (intersectedObjsDown.length === 0) {
            this.positionTank.y1 += this.TANK_STEP;
            this.positionTank.y2 += this.TANK_STEP;
          } else {
            this.nextPosition.y2 = this.positionTank.y2
          }

          this.positionGunX = this.positionTank.x1 + this.shiftToCenterTank;
          this.positionGunY = this.positionTank.y1 + this.shiftToTank;

          this.currentDirectionTank = 'ArrowDown'
        break;
      case 'ArrowRight':
          this.nextPosition.x2 += this.TANK_STEP;

          const intersectedObjsRight = getIntersectedObjs(this.nextPosition, arrOtherObjs);

          if (intersectedObjsRight.length === 0) {
            this.positionTank.x2 += this.TANK_STEP;
            this.positionTank.x1 += this.TANK_STEP;
          } else {
            this.nextPosition.x2 = this.positionTank.x2;
          }

          this.positionGunX = this.positionTank.x1 + this.shiftToTank;
          this.positionGunY = this.positionTank.y1 + this.shiftToCenterTank;

          this.currentDirectionTank = 'ArrowRight';
        break;
      case 'ArrowLeft':
          this.nextPosition.x1 -= this.TANK_STEP;

          const intersectedObjsLeft = getIntersectedObjs(this.nextPosition, arrOtherObjs);

          if (intersectedObjsLeft.length === 0) {
            this.positionTank.x1 -= this.TANK_STEP;
            this.positionTank.x2 -= this.TANK_STEP;
          } else {
            this.nextPosition.x1 = this.positionTank.x1;
          }

          this.positionGunX = this.positionTank.x1 - this.shiftToBullet;
          this.positionGunY = this.positionTank.y1 + this.shiftToCenterTank;

          this.currentDirectionTank = 'ArrowLeft';
        break;
    }
  }

  get dataPosition() {
    return {
      positionGunX: this.positionGunX,
      positionGunY: this.positionGunY,
      currentDirectionTank: this.currentDirectionTank
    };
  }
}


export default Tank;

