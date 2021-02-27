class Bullet {
  constructor(ctx, bulletStep, positionGunAndDirectionShot, bulletSize) {
    this.ctx = ctx;
    this.bulletStep = bulletStep;
    this.positionGunX = positionGunAndDirectionShot.positionGunX;
    this.positionGunY = positionGunAndDirectionShot.positionGunY;
    this.directionShot = positionGunAndDirectionShot.directionShot;
    this.bulletSize = bulletSize;

    this.positionBullet = {
      x1: this.positionGunX,
      x2: this.positionGunX + this.bulletSize.width,
      y1: this.positionGunY,
      y2: this.positionGunY + this.bulletSize.height
    };
  }

  move() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.positionBullet.x1, this.positionBullet.y1, this.bulletSize.width, this.bulletSize.height);

    switch (this.directionShot) {
      case "ArrowUp":
        this.positionBullet.y1 -= this.bulletStep;
        this.positionBullet.y2 -= this.bulletStep;
        break;
      case "ArrowDown":
        this.positionBullet.y2 += this.bulletStep;
        this.positionBullet.y1 += this.bulletStep;
        break;
      case "ArrowRight":
        this.positionBullet.x2 += this.bulletStep;
        this.positionBullet.x1 += this.bulletStep;
        break;
      case "ArrowLeft":
        this.positionBullet.x1 -= this.bulletStep;
        this.positionBullet.x2 -= this.bulletStep;
        break;
    }
  }
}

export default Bullet;