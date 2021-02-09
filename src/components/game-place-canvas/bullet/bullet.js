class Bullet {
  constructor(ctx, BULLET_STEP, dataPosition, bordersCanvas, bulletSize ) {
    this.ctx = ctx;
    this.bordersCanvas = bordersCanvas;
    this.BULLET_STEP = BULLET_STEP;
    this.dataPosition = dataPosition;
    this.positionGunX = dataPosition.positionGunX;
    this.positionGunY = dataPosition.positionGunY;
    this.prevDirectionTank = dataPosition.currentDirectionTank;
    this.bulletSize = bulletSize;

    this.bordersBullet = {
      up: null,
      down: null,
      right: null,
      left: null
    };
  }


  move (countActiveBullet, idx) {
    const BULLET_STEP = this.BULLET_STEP;
    const { borderSatrtX, borderEndX, borderSatrtY, borderEndY } = this.bordersCanvas

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.positionGunX,  this.positionGunY, 20, 20);

    switch (this.prevDirectionTank) {
      case "ArrowUp":
        this.positionGunY -= BULLET_STEP;
        this.bordersBullet.up = this.positionGunY;

        if (this.bordersBullet.up < borderSatrtY) {
          countActiveBullet.splice(idx, 1)
        }
        break;
      case "ArrowDown":
        this.positionGunY += BULLET_STEP;
        this.bordersBullet.down = this.positionGunY + this.bulletSize.width;

        if (this.bordersBullet.down > borderEndY) {
          countActiveBullet.splice(idx, 1)
        }
        break;
      case "ArrowRight":
        this.positionGunX += BULLET_STEP;
        this.bordersBullet.right = this.positionGunX + this.bulletSize.height;

        if (this.bordersBullet.right > borderEndX) {
          countActiveBullet.splice(idx, 1)
        }
        break;
      case "ArrowLeft":
        this.positionGunX -= BULLET_STEP;
        this.bordersBullet.left = this.positionGunX;

        if (this.bordersBullet.left < borderSatrtX) {
          countActiveBullet.splice(idx, 1)
        }
        break;
    }
  }
}

export default Bullet;