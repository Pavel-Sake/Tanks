

import {positionGunX, positionGunY, currentDirectionTank, bulletSize} from './moveTank';




const countShoots = [];
const COOLDOWN_SHOOTING = 1000;
const SPEED_BULLET = 3;

const  { bulletWidth, bulletHeight } = bulletSize;



function drawShooting () {
  let startPositionGunX = positionGunX;
  let strtPositionGunY = positionGunY;
  let prevDirectionTank = currentDirectionTank;

  const bordersBullet = {
    borderLeft: 0,
    borderRight: 0,
    borderUp: 0,
    borderDown: 0
  };
  let { borderLeft, borderRight, borderUp, borderDown } = bordersBullet


  return function (ctx) {

    ctx.fillStyle = "red";
    ctx.fillRect(startPositionGunX, strtPositionGunY, bulletWidth, bulletHeight);
    const imgData = ctx.getImageData(startPositionGunX, strtPositionGunY, bulletWidth, bulletHeight);

    switch (prevDirectionTank) {
      case "ArrowUp":
        strtPositionGunY-= SPEED_BULLET;
        borderUp = strtPositionGunY;

        if (borderUp < 0) {
          countShoots.shift()
        }
        break;
      case "ArrowDown":
        strtPositionGunY+= SPEED_BULLET;
        borderDown = strtPositionGunY + bulletWidth;

        if (borderDown > 900) {
          countShoots.shift()
        }
        break;
      case "ArrowRight":
        startPositionGunX+= SPEED_BULLET;
        borderRight = startPositionGunX + bulletWidth;

        if (borderRight > 1200) {
          countShoots.shift()
        }
        break;
      case "ArrowLeft":
        startPositionGunX-= SPEED_BULLET;
        borderLeft = startPositionGunX;

        if (borderLeft < 0) {
          countShoots.shift()
        }
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