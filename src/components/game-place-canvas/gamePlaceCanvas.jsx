import React, {useRef, useEffect, useState} from 'react';

import styles from './gamePlaceCanvas.pcss';

let cadr = 1;
let positionTankX = 600
let positionTankY = 800;

const sizeTank = {
  tankWidht: 50,
  tankHeight: 50
}

let curentPositionTankY = 800;

let keyPress = null;

const bordersCanvas = {
  borderSatrtX: 0,
  borderEndX: null,
  borderSatrtY: 0,
  borderEndX: null
};

const bordersTank = {
  borderLeft: 600,
  borderRight: 650,
  borderUp: 800,
  borderDown: 850
}


const GamePlaceCanvas = () => {
  const [initialState, setInitialState] = useState(1);
  const [ctx, setCtx] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
    bordersCanvas.borderEndX = canvasRef.current.width;
    bordersCanvas.borderEndY = canvasRef.current.height

    function go() {
      setInitialState((state) => {
        return state + 1
      });

      requestAnimationFrame(go);
    }

    function changeKeyPressTrue(event) {
      event.preventDefault()

      keyPress = event.code;
    }

    function changeKeyPressFalse(event) {
      event.preventDefault()
      keyPress = null;
    }

    document.addEventListener('keydown', changeKeyPressTrue);
    document.addEventListener('keyup', changeKeyPressFalse);
    requestAnimationFrame(go);
  }, [])

  useEffect(() => {
    cadr++;
  });

  const {tankWidht, tankHeight} = sizeTank;

  function moveTank(ctx, keyPress) {

    const imgData = ctx.getImageData(positionTankX, positionTankY, tankWidht, tankHeight);
    ctx.clearRect(0, 0, 1200, 900);

    switch (keyPress) {
      case 'ArrowUp':
        if (bordersTank.borderUp !== 0) {
          positionTankY --
          bordersTank.borderUp--
          bordersTank.borderDown--
        }
        break;
      case 'ArrowDown':
        if (bordersTank.borderDown !== 900) {
          positionTankY++;
          bordersTank.borderUp++
          bordersTank.borderDown++
        }
        break;
      case 'ArrowRight':
        if (bordersTank.borderRight !== 1200) {
          positionTankX++;
          bordersTank.borderRight++
          bordersTank.borderLeft++
        }
        break;
      case 'ArrowLeft':
        if (bordersTank.borderLeft !== 0) {
          positionTankX--;
          bordersTank.borderLeft--
          bordersTank.borderRight--
        }
        break;
    }

    ctx.putImageData(imgData, positionTankX, positionTankY);
  }

  function animation(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(positionTankX, positionTankY, tankWidht, tankHeight);

    if (keyPress) {
      moveTank(ctx, keyPress);
    }
  }

  if (ctx) {
    animation(ctx)
  }

  return (
      <div>
        <canvas
            className={`${styles.canvas}`}
            ref={canvasRef}
            width="1200px"
            height="900px"
        ></canvas>
        <p>cadr: {cadr}</p>
      </div>
  )
}

export default GamePlaceCanvas;