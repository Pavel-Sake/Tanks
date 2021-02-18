function checkIntersectedObjs(obj1, obj2) {
  let crossX = false;
  let crossY = false;

  if ((obj2.x1 < obj1.x1 && obj2.x2 > obj1.x1)
    ||
    (obj2.x1 < obj1.x2 && obj2.x2 > obj1.x2)) {
    crossX = true;
  }

  if ((obj2.y1 < obj1.y1 && obj2.y2 > obj1.y1)
    ||
    (obj2.y1 < obj1.y2 && obj2.y2 > obj1.y2)) {
    crossY = true;
  }

  if (crossX && crossY) {
    return true;
  }

  return false;
}

function getIntersectedObjs(mainObj, arrOtherObjs) {

  const intersectedObjs = arrOtherObjs.filter((item) => {
    return checkIntersectedObjs(mainObj, item);
  });

  return intersectedObjs;
}


export default getIntersectedObjs;
