import React, {useRef, useEffect} from 'react';

import styles from './gamePlaceCanvas.pcss';
import Tank from './tank/tank';
import TankRival from './tank/tankRival';
import Bullet from './bullet/bullet';
import Wall from "./wall/wall";


import shoot from './debounce/debounce';
import getIntersectedObjs from './acrossingOfObject/acrossingOfObject';
import BulletExplosion from "../bulletExplosion/bulletExplosion";
import {getCoordinatesWall, arrCoordinatesOfBlocks} from "./wall/dataWalls";


const sizeTank = {
  width: 50,
  height: 50,
};

let positionTank = {
  x1: 600,
  x2: 600 + sizeTank.width,
  y1: 800,
  y2: 800 + sizeTank.height,
};

const bulletSize = {
  width: 20,
  height: 20,
};

const shiftToTank = sizeTank.width;
const shiftToBullet = bulletSize.width;
const shiftToCenterTank = (sizeTank.width - bulletSize.height) / 2;

let positionGunX = positionTank.x1 + shiftToCenterTank;
let positionGunY = positionTank.y1 - shiftToBullet;

const TANK_STEP = 2.5;
const BULLET_STEP = 3;

let keyPress = null;

const bordersCanvas = {
  borderStartX: 0,
  borderEndX: null,
  borderStartY: 0,
  borderEndY: null
};

const activeBullets = [];
const bulletExplosions = [];

//---------
const borderCanvasUp = {
  x1: 0,
  x2: 1200,
  y1: -25,
  y2: 0,
};
const borderCanvasDown = {
  x1: 0,
  x2: 1200,
  y1: 900,
  y2: 925,
};
const borderCanvasLeft = {
  x1: -25,
  x2: 0,
  y1: 0,
  y2: 900
};
const borderCanvasRight = {
  x1: 1200,
  x2: 1225,
  y1: 0,
  y2: 900
};





const arrOtherObjs = [borderCanvasUp, borderCanvasDown, borderCanvasLeft, borderCanvasRight, ...arrCoordinatesOfBlocks];

//-------------

let positionRivalTank = {
  x1: 500,
  x2: 500 + sizeTank.width,
  y1: 400,
  y2: 400 + sizeTank.height,
};

let positionRivalGunX = positionRivalTank.x1 + shiftToCenterTank;
let positionRivalGunY = positionRivalTank.y1 - shiftToBullet;


const GamePlaceCanvas = () => {
  const canvasRef = useRef(null);

  const removeBulletAndCreateExplosion = (index, ctx, positionBulletX, positionBulletY) => {
    activeBullets.splice(index, 1);
    bulletExplosions.push(new BulletExplosion(ctx, positionBulletX, positionBulletY));
  };


  useEffect(() => {
      const ctx = canvasRef.current.getContext('2d');
      bordersCanvas.borderEndX = canvasRef.current.width;
      bordersCanvas.borderEndY = canvasRef.current.height;

      const tank = new Tank(
        ctx, positionTank, positionGunX, positionGunY,
        sizeTank, bulletSize, bordersCanvas, TANK_STEP,
        shiftToTank, shiftToBullet, shiftToCenterTank,
      );

      const tankRival = new TankRival(
        ctx, positionRivalTank, positionRivalGunX, positionRivalGunY,
        sizeTank, bulletSize, bordersCanvas, TANK_STEP,
        shiftToTank, shiftToBullet, shiftToCenterTank
      );

      const wall = new Wall(ctx);


      function go() {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);


        wall.buildingWall();

        tank.move(keyPress, getIntersectedObjs, arrOtherObjs);

        tankRival.move(getIntersectedObjs, arrOtherObjs);


        activeBullets.forEach((bullet, index) => {
            bullet.move(index, removeBulletAndCreateExplosion);

            const intersectedObjs = getIntersectedObjs(bullet.positionBullet, arrOtherObjs);

            if (intersectedObjs.length !== 0) {
              removeBulletAndCreateExplosion(index, ctx, bullet.positionBullet.x1, bullet.positionBullet.y1);
            }
          }
        );

          bulletExplosions.map((item) => {
            item.explode(bulletExplosions);
          });


        requestAnimationFrame(go);
      }

      requestAnimationFrame(go);

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);



      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };


      function handleKeyDown(event) {
        event.preventDefault();
        keyPress = event.code;

        if (keyPress === 'Space') {
          const bullet = new Bullet(ctx, BULLET_STEP, tank.dataPosition, bordersCanvas, bulletSize);
          shoot(bullet, activeBullets, 500);
        }
      }

      function handleKeyUp(event) {
        event.preventDefault();
        keyPress = null;
      }
    },
    []
  );

  function handleClickCanvas(event) {

    const rect = canvasRef.current.getBoundingClientRect();

    console.log('event.pageX', event.pageX - rect.x)
    console.log('event.pageY', event.pageY - rect.y)

    const x = event.pageX - rect.x;
    const y = event.pageY - rect.y;

    getCoordinatesWall(x, y);
  }


  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      width="1200px"
      height="900px"
      onClick={handleClickCanvas}
    >
    </canvas>
  );
};


export default GamePlaceCanvas;


