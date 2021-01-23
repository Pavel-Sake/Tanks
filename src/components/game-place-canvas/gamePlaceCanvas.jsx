import React, {useRef, useEffect, useState} from 'react';

import styles from './gamePlaceCanvas.pcss';

import { moveTank } from './../../moveTank';
import { shooting, countShoots } from './../../shooting';



let keyPress = null;

const bordersCanvas = {
  borderSatrtX: 0,
  borderEndX: null,
  borderSatrtY: 0,
  borderEndX: null
};



export {bordersCanvas}


const GamePlaceCanvas = () => {

  const canvasRef = useRef();

  useEffect(() => {

    const ctx = canvasRef.current.getContext('2d')

    bordersCanvas.borderEndX = canvasRef.current.width;
    bordersCanvas.borderEndY = canvasRef.current.height;



    function go() {
      ctx.clearRect(0, 0, 1200, 900);

      moveTank(ctx, keyPress)

      if (countShoots.length !== 0) {
        countShoots.forEach((item) => {
          item(ctx)
        })
      }

      requestAnimationFrame(go);
    }

    requestAnimationFrame(go);
  }, []);


  useEffect(() => {
    document.addEventListener('keydown', changeKeyPressTrueAndShooting);
    document.addEventListener('keyup', changeKeyPressFalse);
  }, []);


  function changeKeyPressTrueAndShooting(event) {
    event.preventDefault()
    keyPress = event.code;
    // console.log(keyPress);

    if (keyPress === 'Space') {
      shooting();
    }
  }

  function changeKeyPressFalse(event) {
    event.preventDefault()
    keyPress = null;
  }


  return (
      <canvas
          className={`${styles.canvas}`}
          ref={canvasRef}
          width="1200px"
          height="900px"
      ></canvas>
  )
}

export {GamePlaceCanvas}


