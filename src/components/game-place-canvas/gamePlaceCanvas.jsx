import React, { useRef, useEffect } from 'react';

import styles from './gamePlaceCanvas.pcss';
import Tank from './tank/tank';
import TankRival from './tank/tankRival';
import Bullet from './bullet/bullet';
import Wall from "./wall/wall";

import debounce from './debounce/debounce';

import getIntersectedObjs from './acrossingOfObject/acrossingOfObject';
import BulletExplosion from "../bulletExplosion/bulletExplosion";
import { findCoordinatesWall, positionOfWall } from "./wall/dataWalls";

import { dataTankInSprite, dataRivalTankInSprite } from "../../../dataTankInSprite/dataTankinSprite";


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
const BULLET_STEP = 5;

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


const borderCanvas = [borderCanvasUp, borderCanvasDown, borderCanvasLeft, borderCanvasRight];

//-------------

let positionRivalTank = {
  x1: 50,
  x2: 50 + sizeTank.width,
  y1: 0,
  y2: 0 + sizeTank.height,
};

let positionRivalGunX = positionRivalTank.x1 + shiftToCenterTank;
let positionRivalGunY = positionRivalTank.y1 + shiftToTank;


const GamePlaceCanvas = () => {
  const canvasRef = useRef(null);

  const createShot = (ctx, bulletStep, positionGunAndDirectionShot, bulletSize, addBulletInActiveBullets) => {
    const bullet = new Bullet(ctx, bulletStep, positionGunAndDirectionShot, bulletSize);

    addBulletInActiveBullets(bullet, activeBullets, 1000);
  };

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
        dataTankInSprite, debounce()
      );


      const tankRival = new TankRival(
        ctx, positionRivalTank, positionRivalGunX, positionRivalGunY,
        sizeTank, bulletSize, bordersCanvas, TANK_STEP,
        shiftToTank, shiftToBullet, shiftToCenterTank,
        dataRivalTankInSprite, debounce()
      );


      const wall = new Wall(ctx);


      function go() {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        wall.buildingWall();

        const allObjsForRivalTank = [...borderCanvas, ...positionOfWall, tank.coordinatesPositionTank];
        const allObjsForMainTank = [...borderCanvas, ...positionOfWall, tankRival.coordinatesPositionTank];
        const allObjsForBullet = [...borderCanvas, ...positionOfWall, tankRival.coordinatesPositionTank, tank.coordinatesPositionTank];


        tank.move(keyPress, getIntersectedObjs, allObjsForMainTank);

        tankRival.move(getIntersectedObjs, allObjsForRivalTank, createShot, BULLET_STEP);


        activeBullets.forEach((bullet, index) => {
            bullet.move();

            const intersectedObjs = getIntersectedObjs(bullet.positionBullet, allObjsForBullet);

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
          createShot(ctx, BULLET_STEP, tank.positionGunAndDirectionShot, bulletSize, tank.addBulletInActiveBullets);
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

    const x = event.pageX - rect.x;
    const y = event.pageY - rect.y;

    findCoordinatesWall(x, y);
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


