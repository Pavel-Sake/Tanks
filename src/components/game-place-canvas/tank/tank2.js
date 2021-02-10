class Tank2 {
  constructor(ctx, posTank2, sizeTank2, step2) {
    this.ctx = ctx
    this.posTank2 = posTank2
    this.sizeTank2 = sizeTank2
    this.step2 = step2
    this.counter = 0
  }

  move(arr, keyPress) {

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.posTank2.x, this.posTank2.y, this.sizeTank2.width, this.sizeTank2.height);



    if (arr[0] === 'ArrowUp') {
      this.counter++
      if (this.counter <= this.step2 && arr.length !== 0) {
        this.posTank2.y--
      } else {
        arr.shift()
        this.counter = 0
      }
    }

    if (arr[0] === 'ArrowLeft') {
      this.counter++
      if (this.counter <= this.step2 && arr.length !== 0) {
        this.posTank2.x--
      } else {
        arr.shift()
        this.counter = 0
      }


    }

    if (arr[0] === 'ArrowRight') {
      this.counter++
      if (this.counter <= this.step2 && arr.length !== 0) {
        this.posTank2.x++
      } else {
        arr.shift()
        this.counter = 0
      }


    }

    if (arr[0] === 'ArrowDown') {
      this.counter++
      if (this.counter <= this.step2 && arr.length !== 0) {
        this.posTank2.y++
      } else {
        arr.shift()
        this.counter = 0
      }
    }

  }
}

    export default Tank2;