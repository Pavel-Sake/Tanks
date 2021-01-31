let positionTankX = 600;
let positionTankY = 800;

const bulletSize = {
  width: 20,
  height: 20
}

const sizeTank = {
  widht: 50,
  height: 50
}

const STEP_TANK = 2;

const shiftToTank = sizeTank.widht;
const shiftToBullet = bulletSize.width;
const shiftToCenterTank = (sizeTank.widht -  bulletSize.height) / 2;

let positionGunX = positionTankX + shiftToCenterTank
let positionGunY = positionTankY - shiftToBullet;


const bordersTank = {
  left: positionTankX,
  right: positionTankX + sizeTank.widht,
  up: positionTankY,
  down: positionTankY + sizeTank.height
};

let currentDirectionTank = 'ArrowUp';


function moveTank(ctx, keyPress, bordersCanvas) {

  ctx.fillStyle = "black";
  ctx.fillRect(positionTankX, positionTankY, sizeTank.widht, sizeTank.height);

  ctx.fillStyle = "red";
  ctx.fillRect(positionGunX, positionGunY, bulletSize.width, bulletSize.width);

  const {borderSatrtY, borderEndY, borderSatrtX, borderEndX} = bordersCanvas;

  switch (keyPress) {
    case 'ArrowUp':
      if (bordersTank.up !== borderSatrtY) {
        positionTankY -= STEP_TANK;
        bordersTank.up -= STEP_TANK;
        bordersTank.down -= STEP_TANK;

        positionGunX = positionTankX + shiftToCenterTank
        positionGunY = positionTankY - shiftToBullet;

        currentDirectionTank = 'ArrowUp'
      }
      break;
    case 'ArrowDown':
      if (bordersTank.down !== borderEndY) {
        positionTankY += STEP_TANK;
        bordersTank.up += STEP_TANK;
        bordersTank.down += STEP_TANK;

        positionGunX = positionTankX + shiftToCenterTank;
        positionGunY = positionTankY + shiftToTank;

        currentDirectionTank = 'ArrowDown'
      }
      break;
    case 'ArrowRight':
      if (bordersTank.right !== borderEndX) {
        positionTankX += STEP_TANK;
        bordersTank.right += STEP_TANK;
        bordersTank.left += STEP_TANK;

        positionGunX = positionTankX + shiftToTank;
        positionGunY = positionTankY + shiftToCenterTank;

        currentDirectionTank = 'ArrowRight'
      }
      break;
    case 'ArrowLeft':
      if (bordersTank.left !== borderSatrtX) {
        positionTankX -= STEP_TANK;
        bordersTank.left -= STEP_TANK;
        bordersTank.right -= STEP_TANK;

        positionGunX = positionTankX - shiftToBullet;
        positionGunY = positionTankY + shiftToCenterTank;

        currentDirectionTank = 'ArrowLeft'
      }
      break;
  }
}

export {moveTank, positionGunX, positionGunY, currentDirectionTank, bulletSize}