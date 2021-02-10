import React, {useRef, useEffect} from 'react';

import styles from './gamePlaceCanvas.pcss';

import Tank from './tank/tank';

import Bullet from './bullet/bullet';

import shoot from './debounce/debounce';
import getIntersectedObjs from './acrossingOfObject/acrossingOfObject';





let positionTank = {
  x1: 600,
  x2: 650,
  y1: 800,
  y2: 850
}

const sizeTank = {
  width: 50,
  height: 50
}

const bulletSize = {
  width: 20,
  height: 20
}


const shiftToTank = sizeTank.width;
const shiftToBullet = bulletSize.width;
const shiftToCenterTank = (sizeTank.width - bulletSize.height) / 2;

let positionGunX = positionTank.x1 + shiftToCenterTank
let positionGunY = positionTank.y1 - shiftToBullet;

const TANK_STEP = 5;
const BULLET_STEP = 3;

let keyPress = null;

const bordersCanvas = {
  borderStartX: 0,
  borderEndX: null,
  borderStartY: 0,
  borderEndY: null
};

const countActiveBullet = []

//---------



const otherObj = {
  x1: 625,
  x2: 650,
  y1: 500,
  y2: 525
}

const otherObj2 = {
  x1: 600,
  x2: 625,
  y1: 500,
  y2: 525
}


const arrOtherObjs = [otherObj, otherObj2]



const GamePlaceCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
      const ctx = canvasRef.current.getContext('2d')
      bordersCanvas.borderEndX = canvasRef.current.width;
      bordersCanvas.borderEndY = canvasRef.current.height;

      const tank = new Tank(
        ctx, positionTank, positionGunX, positionGunY,
        sizeTank, bulletSize, bordersCanvas, TANK_STEP,
        shiftToTank, shiftToBullet, shiftToCenterTank,
      );


      function go() {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        ctx.fillStyle = "green";
        ctx.fillRect(otherObj.x1, otherObj.y1, 25, 25);

        ctx.fillStyle = "blue";
        ctx.fillRect(otherObj2.x1, otherObj2.y1, 25, 25);

        tank.move(keyPress, getIntersectedObjs, arrOtherObjs);

        if (countActiveBullet.length !== 0) {
          countActiveBullet.forEach((item, idx) => {
              item.move(countActiveBullet, idx, getIntersectedObjs, arrOtherObjs)
            }
          )
        }

        requestAnimationFrame(go);
      }

      requestAnimationFrame(go);

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      }


      function handleKeyDown(event) {
        event.preventDefault()
        keyPress = event.code;

        if (keyPress === 'Space') {
          const bullet = new Bullet(ctx, BULLET_STEP, tank.dataPosition, bordersCanvas, bulletSize)
          shoot(bullet, countActiveBullet, 500);
        }
      }

      function handleKeyUp(event) {
        event.preventDefault()
        keyPress = null;
      }
    },
    []
  )
  ;

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      width="1200px"
      height="900px"
    >
    </canvas>
  )
}


export default GamePlaceCanvas


