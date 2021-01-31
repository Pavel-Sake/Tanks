import {positionGunX, positionGunY, currentDirectionTank, bulletSize} from './moveTank';


const countShoots = [];
const COOLDOWN_SHOOTING = 1000;
const STEP_BULLET = 3;


function drawShooting () {
  let startPositionGunX = positionGunX;
  let strtPositionGunY = positionGunY;
  let prevDirectionTank = currentDirectionTank;

  const bordersBullet = {
    left: 0,
    right: 0,
    up: 0,
    down: 0
  };

  return function (ctx, bordersCanvas) {
    ctx.fillStyle = "red";
    ctx.fillRect(startPositionGunX, strtPositionGunY, bulletSize.width, bulletSize.height);

    const {borderSatrtY, borderEndY, borderSatrtX, borderEndX} = bordersCanvas;

    switch (prevDirectionTank) {
      case "ArrowUp":
        strtPositionGunY-= STEP_BULLET;
        bordersBullet.up = strtPositionGunY;

        if (bordersBullet.up < borderSatrtY) {
          countShoots.shift()
        }
        break;
      case "ArrowDown":
        strtPositionGunY+= STEP_BULLET;
        bordersBullet.down = strtPositionGunY + bulletSize.width;

        if (bordersBullet.down > borderEndY) {
          countShoots.shift()
        }
        break;
      case "ArrowRight":
        startPositionGunX+= STEP_BULLET;
        bordersBullet.right = startPositionGunX + bulletSize.hidth;

        if (bordersBullet.right > borderEndX) {
          countShoots.shift()
        }
        break;
      case "ArrowLeft":
        startPositionGunX-= STEP_BULLET;
        bordersBullet.left = startPositionGunX;

        if (bordersBullet.left < borderSatrtX) {
          countShoots.shift()
        }
        break;
    }
  }
}

function debounce(drawShooting, ms ) {
  let isCooldown = false;

  return function () {
    if (isCooldown) {
      return
    }

    countShoots.push(drawShooting());

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  }
}

const shooting = debounce(drawShooting, COOLDOWN_SHOOTING)

export {shooting, countShoots};