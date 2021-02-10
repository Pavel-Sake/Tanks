class Bullet {
  constructor(ctx, BULLET_STEP, dataPosition, bordersCanvas, bulletSize) {
    this.ctx = ctx;
    this.bordersCanvas = bordersCanvas;
    this.BULLET_STEP = BULLET_STEP;
    this.positionGunX = dataPosition.positionGunX;
    this.positionGunY = dataPosition.positionGunY;
    this.prevDirectionTank = dataPosition.currentDirectionTank;
    this.bulletSize = bulletSize;

    this.positionBullet = {
      x1: this.positionGunX,
      x2: this.positionGunX + this.bulletSize.width,
      y1: this.positionGunY,
      y2: this.positionGunY + this.bulletSize.height
    }
  }

  move(countActiveBullet, idx, getIntersectedObjs, arrOtherObjs) {
    const BULLET_STEP = this.BULLET_STEP;
    const {borderStartX, borderEndX, borderStartY, borderEndY} = this.bordersCanvas

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.positionBullet.x1, this.positionBullet.y1, this.bulletSize.width, this.bulletSize.height);

    switch (this.prevDirectionTank) {
      case "ArrowUp":
        this.positionBullet.y1 -= BULLET_STEP;
        this.positionBullet.y2 -= BULLET_STEP;

        if (this.positionBullet.y1 < borderStartY) {
          countActiveBullet.splice(idx, 1)
        }
        break;
      case "ArrowDown":
        this.positionBullet.y2 += BULLET_STEP;
        this.positionBullet.y1 += BULLET_STEP;

        if (this.positionBullet.y2 > borderEndY) {
          countActiveBullet.splice(idx, 1)
        }
        break;
      case "ArrowRight":
        this.positionBullet.x2 += BULLET_STEP;
        this.positionBullet.x1 += BULLET_STEP;

        if (this.positionBullet.x2 > borderEndX) {
          countActiveBullet.splice(idx, 1)
        }
        break;
      case "ArrowLeft":
        this.positionBullet.x1 -= BULLET_STEP;
        this.positionBullet.x2 -= BULLET_STEP;

        if (this.positionBullet.x1 < borderStartX) {
          countActiveBullet.splice(idx, 1)
        }
        break;
    }

    const intersectedObjs = getIntersectedObjs(this.positionBullet, arrOtherObjs)

    if (intersectedObjs.length !== 0) {
      countActiveBullet.splice(idx, 1)
    }
  }
}

export default Bullet;