import {positionOfWall} from './dataWalls'


class Wall {
  constructor(ctx) {
    this.ctx = ctx;
  }

  buildingWall () {

    positionOfWall.forEach((block) => {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(block.x1, block.y1, 25, 25);
    });
  }
}

export default Wall;
