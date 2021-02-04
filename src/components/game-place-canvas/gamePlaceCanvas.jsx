import React, {useRef, useEffect} from 'react';

import styles from './gamePlaceCanvas.pcss';


import Tank from './tank/tank';

let positionTankX = 600;
let positionTankY = 800;

const sizeTank = {
  widht: 50,
  height: 50
}

const bulletSize = {
  width: 20,
  height: 20
}

const bordersTank = {
  left: positionTankX,
  right: positionTankX + sizeTank.widht,
  up: positionTankY,
  down: positionTankY + sizeTank.height
}

const shiftToTank = sizeTank.widht;
const shiftToBullet = bulletSize.width;
const shiftToCenterTank = (sizeTank.widht -  bulletSize.height) / 2;

let positionGunX = positionTankX + shiftToCenterTank
let positionGunY = positionTankY - shiftToBullet;

const TANK_STEP = 2;
const BULLET_STEP = 3;

let keyPress = null;

const bordersCanvas = {
  borderSatrtX: 0,
  borderEndX: null,
  borderSatrtY: 0,
  borderEndY: null
};


const GamePlaceCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    bordersCanvas.borderEndX = canvasRef.current.width;
    bordersCanvas.borderEndY = canvasRef.current.height;

    const tank = new Tank(
      ctx, positionTankX, positionTankY, positionGunX, positionGunY,
      sizeTank, bulletSize, bordersCanvas, bordersTank, TANK_STEP,
      shiftToTank, shiftToBullet, shiftToCenterTank
    );
    const shoot = tank.debounce(tank.drawShooting, 800)


    function go() {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      tank.move(keyPress);

      if (tank.countShoots.length !== 0) {
        tank.countShoots.forEach((item) => {
          item()
        })
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
        shoot()
      }
    }

    function handleKeyUp(event) {
      event.preventDefault()
      keyPress = null;
    }

  }, []);


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


