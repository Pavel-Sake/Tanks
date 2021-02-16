class Bullet {
  constructor(ctx, bulletStep, dataPosition, bordersCanvas, bulletSize) {
    this.ctx = ctx;
    this.bordersCanvas = bordersCanvas;
    this.bulletStep = bulletStep;
    this.positionGunX = dataPosition.positionGunX;
    this.positionGunY = dataPosition.positionGunY;
    this.prevDirectionTank = dataPosition.currentDirectionTank;
    this.bulletSize = bulletSize;

    this.positionBullet = {
      x1: this.positionGunX,
      x2: this.positionGunX + this.bulletSize.width,
      y1: this.positionGunY,
      y2: this.positionGunY + this.bulletSize.height
    };
  }

  move(index, removeBulletAndCreateExplosion) {
    const {borderStartX, borderEndX, borderStartY, borderEndY} = this.bordersCanvas;

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.positionBullet.x1, this.positionBullet.y1, this.bulletSize.width, this.bulletSize.height);

    switch (this.prevDirectionTank) {
      case "ArrowUp":
        this.positionBullet.y1 -= this.bulletStep;
        this.positionBullet.y2 -= this.bulletStep;

        if (this.positionBullet.y1 < borderStartY) {
          removeBulletAndCreateExplosion(index, this.ctx, this.positionBullet.x1, this.positionBullet.y1);
        }
        break;
      case "ArrowDown":
        this.positionBullet.y2 += this.bulletStep;
        this.positionBullet.y1 += this.bulletStep;

        if (this.positionBullet.y2 > borderEndY) {
          removeBulletAndCreateExplosion(index, this.ctx, this.positionBullet.x1, this.positionBullet.y1);
        }
        break;
      case "ArrowRight":
        this.positionBullet.x2 += this.bulletStep;
        this.positionBullet.x1 += this.bulletStep;

        if (this.positionBullet.x2 > borderEndX) {
          removeBulletAndCreateExplosion(index, this.ctx, this.positionBullet.x1, this.positionBullet.y1);
        }
        break;
      case "ArrowLeft":
        this.positionBullet.x1 -= this.bulletStep;
        this.positionBullet.x2 -= this.bulletStep;

        if (this.positionBullet.x1 < borderStartX) {
          removeBulletAndCreateExplosion(index, this.ctx, this.positionBullet.x1, this.positionBullet.y1);
        }
        break;
    }
  }
}

export default Bullet;