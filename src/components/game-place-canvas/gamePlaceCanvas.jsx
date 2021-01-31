import React, {useRef, useEffect} from 'react';

import styles from './gamePlaceCanvas.pcss';

import { moveTank } from './../../moveTank';
import { shooting, countShoots } from './../../shooting';


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


    function go() {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      moveTank(ctx, keyPress, bordersCanvas)

      if (countShoots.length !== 0) {
        countShoots.forEach((item) => {
          item(ctx, bordersCanvas)
        })
      }

      requestAnimationFrame(go);
    }

    requestAnimationFrame(go);
  }, []);


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);


  function handleKeyDown(event) {
    event.preventDefault()
    keyPress = event.code;

    if (keyPress === 'Space') {
      shooting();
    }
  }

  function handleKeyUp(event) {
    event.preventDefault()
    keyPress = null;
  }

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


