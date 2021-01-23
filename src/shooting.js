

import {positionGunX, positionGunY, currentDirectionTank, bulletSize} from './moveTank';


const countShoots = [];
const COOLDOWN_SHOOTING = 1000;
const SPEED_BULLET = 3

const  {bulletWidth, bulletHeight } = bulletSize

function drawShooting () {
  let startPositionGunX = positionGunX;
  let strtPositionGunY = positionGunY;
  let prevDirectionTank = currentDirectionTank;


  return function (ctx) {

    ctx.fillStyle = "red";
    ctx.fillRect(startPositionGunX, strtPositionGunY, bulletWidth, bulletHeight);
    const imgData = ctx.getImageData(startPositionGunX, strtPositionGunY, bulletWidth, bulletHeight);

    switch (prevDirectionTank) {
      case "ArrowUp":
        strtPositionGunY-= SPEED_BULLET;
        break;
      case "ArrowDown":
        strtPositionGunY+= SPEED_BULLET;
        break;
      case "ArrowRight":
        startPositionGunX+= SPEED_BULLET;
        break;
      case "ArrowLeft":
        startPositionGunX-= SPEED_BULLET;
        break;
    }

    ctx.putImageData(imgData, startPositionGunX, strtPositionGunY);
  }
}

function debounce(drawShooting, ms ) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    countShoots.push(drawShooting());

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  }
}

const shooting = debounce(drawShooting, COOLDOWN_SHOOTING)

export {shooting, countShoots};