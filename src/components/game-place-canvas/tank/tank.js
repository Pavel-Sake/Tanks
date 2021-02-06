class Tank {
  constructor(
    ctx, positionTankX, positionTankY, positionGunX, positionGunY,
    sizeTank, bulletSize, bordersCanvas, bordersTank, TANK_STEP,
    shiftToTank, shiftToBullet, shiftToCenterTank
  ) {
    this.ctx = ctx;
    this.positionTankX = positionTankX;
    this.positionTankY = positionTankY;
    this.positionGunX = positionGunX;
    this.positionGunY = positionGunY;

    this.shiftToTank = shiftToTank;
    this.shiftToBullet = shiftToBullet;
    this.shiftToCenterTank = shiftToCenterTank;

    this.sizeTank = sizeTank;
    this.bulletSize = bulletSize;
    this.bordersCanvas = bordersCanvas;
    this.bordersTank = bordersTank;
    this.TANK_STEP = TANK_STEP;
    this.currentDirectionTank = 'ArrowUp';
    this.cooldown = null

    this.countShootsArr = []
  }

  get dataPosition () {
    return {
      positionGunX: this.positionGunX,
      positionGunY: this.positionGunY,
      currentDirectionTank: this.currentDirectionTank
    }
  }

  move(keyPress) {
    const {borderSatrtY, borderEndY, borderSatrtX, borderEndX} = this.bordersCanvas;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.positionTankX, this.positionTankY, this.sizeTank.widht, this.sizeTank.height);

    switch (keyPress) {
      case 'ArrowUp':
        if (this.bordersTank.up !== borderSatrtY) {
          this.positionTankY -= this.TANK_STEP;
          this.bordersTank.up -= this.TANK_STEP;
          this.bordersTank.down -= this.TANK_STEP;

          this.positionGunX = this.positionTankX + this.shiftToCenterTank
          this.positionGunY = this.positionTankY - this.shiftToBullet;

          this.currentDirectionTank = 'ArrowUp'
        }
        break;
      case 'ArrowDown':
        if (this.bordersTank.down !== borderEndY) {
          this.positionTankY += this.TANK_STEP;
          this.bordersTank.up += this.TANK_STEP;
          this.bordersTank.down += this.TANK_STEP;

          this.positionGunX = this.positionTankX + this.shiftToCenterTank;
          this.positionGunY = this.positionTankY + this.shiftToTank;

          this.currentDirectionTank = 'ArrowDown'
        }
        break;
      case 'ArrowRight':
        if (this.bordersTank.right !== borderEndX) {
          this.positionTankX += this.TANK_STEP;
          this.bordersTank.right += this.TANK_STEP;
          this.bordersTank.left += this.TANK_STEP;

          this.positionGunX = this.positionTankX + this.shiftToTank;
          this.positionGunY = this.positionTankY + this.shiftToCenterTank;

          this.currentDirectionTank = 'ArrowRight'
        }
        break;
      case 'ArrowLeft':
        if (this.bordersTank.left !== borderSatrtX) {
          this.positionTankX -= this.TANK_STEP;
          this.bordersTank.left -= this.TANK_STEP;
          this.bordersTank.right -= this.TANK_STEP;

          this.positionGunX = this.positionTankX - this.shiftToBullet;
          this.positionGunY = this.positionTankY + this.shiftToCenterTank;

          this.currentDirectionTank = 'ArrowLeft'
        }
        break;
    }
  }

  drawShooting() {
    const BULLET_STEP = 3;
    const ctx = this.ctx

    // const shiftToTank = this.sizeTank.widht;
    // const shiftToBullet = this.bulletSize.width;
    // const shiftToCenterTank = (this.sizeTank.widht - this.bulletSize.height) / 2;

    let prevDirectionTank = this.currentDirectionTank;

    let startPositionGunX = this.positionGunX;
    let startPositionGunY = this.positionGunY;

    const bordersBullet = {
      up: null,
      down: null,
      right: null,
      left: null

    }
    const bordersCanvas = this.bordersCanvas;

    const bulletSize =this.bulletSize

    const { borderSatrtX, borderEndX, borderSatrtY, borderEndY } = bordersCanvas;

    return  () => {

      ctx.fillStyle = "red";
      ctx.fillRect(startPositionGunX, startPositionGunY, 20, 20);

      switch (prevDirectionTank) {
        case "ArrowUp":
          startPositionGunY -= BULLET_STEP;
          bordersBullet.up = startPositionGunY;

          if (bordersBullet.up < borderSatrtY) {
            this.countShootsArr.shift()
          }
          break;
        case "ArrowDown":
          startPositionGunY += BULLET_STEP;
          bordersBullet.down = startPositionGunY + bulletSize.width;

          if (bordersBullet.down > borderEndY) {
            this.countShootsArr.shift()
          }
          break;
        case "ArrowRight":
          startPositionGunX += BULLET_STEP;
          bordersBullet.right = startPositionGunX + bulletSize.hidth;

          if (bordersBullet.right > borderEndX) {
            this.countShootsArr.shift()
          }
          break;
        case "ArrowLeft":
          startPositionGunX -= BULLET_STEP;
          bordersBullet.left = startPositionGunX;

          if (bordersBullet.left < borderSatrtX) {
            this.countShootsArr.shift()
          }
          break;
      }
    }

  }

  debounce(func, ms) {
    let isCooldonw = false;

    return  () => {
      if (isCooldonw) {
        return
      }

      this.countShootsArr.push(func.apply(this))

      isCooldonw = true;

      setTimeout(() => {
        isCooldonw = false;
      }, ms)
    }

  }

  get countShoots () {
    return this.countShootsArr
  }

  set countShoots (item) {

    this.countShootsArr.push(item)
  }

}


export default Tank;

