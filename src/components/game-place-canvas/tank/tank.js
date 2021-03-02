// import debounce from "../debounce/debounce";

class Tank {
  constructor(
    ctx, positionTank, positionGunX, positionGunY,
    sizeTank, bulletSize, bordersCanvas, TANK_STEP,
    shiftToTank, shiftToBullet, shiftToCenterTank,
    dataTankInSprite,
    debounce
  ) {
    this.ctx = ctx;

    this.image = new Image();
    this.image.src = './../../../../assets/tank/tanks.png';

    this.positionTank = positionTank;
    this.positionGunX = positionGunX;
    this.positionGunY = positionGunY;

    this.shiftToTank = shiftToTank;
    this.shiftToBullet = shiftToBullet;
    this.shiftToCenterTank = shiftToCenterTank;

    this.sizeTank = sizeTank;
    this.bulletSize = bulletSize;

    this.TANK_STEP = TANK_STEP;
    this.currentDirectionGun = 'ArrowUp';

    this.dataTankInSprite = dataTankInSprite;

    this.positionSpriteOfTank = {
      x: 4,
      y: 2160,
      width: 134,
      height: 195,
    };

    this.debounce = debounce;

  }


  move(keyPress, getIntersectedObjs, arrOtherObjs) {

    this.nextPosition = {
      x1: this.positionTank.x1,
      x2: this.positionTank.x2,
      y1: this.positionTank.y1,
      y2: this.positionTank.y2,
    };

    this.ctx.drawImage(
      this.image, this.positionSpriteOfTank.x, this.positionSpriteOfTank.y,
      this.positionSpriteOfTank.width, this.positionSpriteOfTank.height,
      this.positionTank.x1, this.positionTank.y1,
      this.sizeTank.width, this.sizeTank.height
    );


    switch (keyPress) {
      case 'ArrowUp':
        this.nextPosition.y1 -= this.TANK_STEP;

        this.changePositionSprite(this.dataTankInSprite.positionUp);

        const intersectedObjsUp = getIntersectedObjs(this.nextPosition, arrOtherObjs);

        if (intersectedObjsUp.length === 0) {
          this.positionTank.y1 -= this.TANK_STEP;
          this.positionTank.y2 -= this.TANK_STEP;
        } else {
          this.nextPosition.y1 = this.positionTank.y1;
        }

        this.positionGunX = this.positionTank.x1 + this.shiftToCenterTank;
        this.positionGunY = this.positionTank.y1 - this.shiftToBullet;

        this.currentDirectionGun = 'ArrowUp';
        break;
      case 'ArrowDown':
        this.nextPosition.y2 += this.TANK_STEP;

        this.changePositionSprite(this.dataTankInSprite.positionDown);

        const intersectedObjsDown = getIntersectedObjs(this.nextPosition, arrOtherObjs);

        if (intersectedObjsDown.length === 0) {
          this.positionTank.y1 += this.TANK_STEP;
          this.positionTank.y2 += this.TANK_STEP;
        } else {
          this.nextPosition.y2 = this.positionTank.y2;
        }

        this.positionGunX = this.positionTank.x1 + this.shiftToCenterTank;
        this.positionGunY = this.positionTank.y1 + this.shiftToTank;

        this.currentDirectionGun = 'ArrowDown';
        break;
      case 'ArrowLeft':
        this.nextPosition.x1 -= this.TANK_STEP;

        this.changePositionSprite(this.dataTankInSprite.positionLeft);

        const intersectedObjsLeft = getIntersectedObjs(this.nextPosition, arrOtherObjs);

        if (intersectedObjsLeft.length === 0) {
          this.positionTank.x1 -= this.TANK_STEP;
          this.positionTank.x2 -= this.TANK_STEP;
        } else {
          this.nextPosition.x1 = this.positionTank.x1;
        }

        this.positionGunX = this.positionTank.x1 - this.shiftToBullet;
        this.positionGunY = this.positionTank.y1 + this.shiftToCenterTank;

        this.currentDirectionGun = 'ArrowLeft';
        break;
      case 'ArrowRight':
        this.nextPosition.x2 += this.TANK_STEP;

        this.changePositionSprite(this.dataTankInSprite.positionRight);

        const intersectedObjsRight = getIntersectedObjs(this.nextPosition, arrOtherObjs);

        if (intersectedObjsRight.length === 0) {
          this.positionTank.x2 += this.TANK_STEP;
          this.positionTank.x1 += this.TANK_STEP;
        } else {
          this.nextPosition.x2 = this.positionTank.x2;
        }

        this.positionGunX = this.positionTank.x1 + this.shiftToTank;
        this.positionGunY = this.positionTank.y1 + this.shiftToCenterTank;

        this.currentDirectionGun = 'ArrowRight';
        break;

    }
  }

  changePositionSprite(position) {
    this.positionSpriteOfTank = position
  }

  get positionGunAndDirectionShot() {
    return {
      positionGunX: this.positionGunX,
      positionGunY: this.positionGunY,
      directionShot: this.currentDirectionGun
    };
  }

  get addBulletInActiveBullets() {

    return this.debounce;
  }

  get coordinatesPositionTank() {

    return this.positionTank;
  }

}


export default Tank;

