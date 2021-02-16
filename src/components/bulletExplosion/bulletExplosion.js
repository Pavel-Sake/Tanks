import dataExplosionBullet from "../../../dataExplosion/dataExplosionBullet";


class BulletExplosion {
  constructor(ctx, positionBulletX, positionBulletY) {
    this.ctx = ctx;
    this.positionBulletX = positionBulletX;
    this.positionBulletY = positionBulletY;

    this.image = new Image();
    this.image.src = './../../../../assets/sprite.png';

    this.durationOfAnimationInFrames = dataExplosionBullet.length;

    this.count = 0;

    this.widthBullet = 25;
    this.heighBullet = 25;
  }

  explode (bulletExplosions) {

    const positionExplasionX = this.positionBulletX - ((dataExplosionBullet[this.count].widthExp - this.widthBullet) / 2);
    const positionExplasionY = this.positionBulletY - ((dataExplosionBullet[this.count].heightExp - this.heighBullet) / 2);

    this.ctx.drawImage(
      this.image, dataExplosionBullet[this.count].sx,
      dataExplosionBullet[this.count].sy,
      dataExplosionBullet[this.count].width,
      dataExplosionBullet[this.count].height,
      positionExplasionX,
      positionExplasionY,
      dataExplosionBullet[this.count].widthExp,
      dataExplosionBullet[this.count].heightExp
    );

    this.count ++;

    if (this.count === this.durationOfAnimationInFrames ) {
      bulletExplosions.shift();
      this.count = 0;
    }
  }
}

export default BulletExplosion;