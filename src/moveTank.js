
// import {bordersCanvas} from './components/game-place-canvas/gamePlaceCanvas'



let positionTankX = 600;
let positionTankY = 800;

const bulletSize = {
  bulletWidth: 20,
  bulletHeight: 20
}

const sizeTank = {
  tankWidht: 50,
  tankHeight: 50
}

const shiftToTank = sizeTank.tankWidht; //50
const shiftToBullet = bulletSize.bulletWidth; // 20
const shiftToCenterTank = (sizeTank.tankWidht -  bulletSize.bulletWidth) / 2; // 15

let positionGunX = positionTankX + shiftToCenterTank
let positionGunY = positionTankY - shiftToBullet;

const bordersTank = {
  borderLeft: 600,
  borderRight: 650,
  borderUp: 800,
  borderDown: 850
};

const {tankWidht, tankHeight} = sizeTank;
const {bulletWidth, bulletHeight} = bulletSize

let currentDirectionTank = 'ArrowUp';



function moveTank(ctx, keyPress) {

  ctx.fillStyle = "black";
  ctx.fillRect(positionTankX, positionTankY, tankWidht, tankHeight);

  ctx.fillStyle = "red";
  ctx.fillRect(positionGunX, positionGunY, bulletWidth, bulletHeight);

  const imgData = ctx.getImageData(positionTankX, positionTankY, tankWidht, tankHeight);

  switch (keyPress) {
    case 'ArrowUp':
      if (bordersTank.borderUp !== 0) {
        positionTankY--
        bordersTank.borderUp--
        bordersTank.borderDown--;

        positionGunX = positionTankX + shiftToCenterTank
        positionGunY = positionTankY - shiftToBullet;

        currentDirectionTank = 'ArrowUp'
      }
      break;
    case 'ArrowDown':
      if (bordersTank.borderDown !== 900) {
        positionTankY++;
        bordersTank.borderUp++
        bordersTank.borderDown++;

        positionGunX = positionTankX + shiftToCenterTank;
        positionGunY = positionTankY + shiftToTank;

        currentDirectionTank = 'ArrowDown'
      }
      break;
    case 'ArrowRight':
      if (bordersTank.borderRight !== 1200) {
        positionTankX++;
        bordersTank.borderRight++
        bordersTank.borderLeft++;

        positionGunX = positionTankX + shiftToTank;
        positionGunY = positionTankY + shiftToCenterTank;

        currentDirectionTank = 'ArrowRight'
      }
      break;
    case 'ArrowLeft':
      if (bordersTank.borderLeft !== 0) {
        positionTankX--;
        bordersTank.borderLeft--;
        bordersTank.borderRight--;

        positionGunX = positionTankX - shiftToBullet;
        positionGunY = positionTankY + shiftToCenterTank;

        currentDirectionTank = 'ArrowLeft'
      }
      break;
  }

  ctx.putImageData(imgData, positionTankX, positionTankY);
}

export {moveTank, positionGunX, positionGunY, currentDirectionTank, bulletSize}