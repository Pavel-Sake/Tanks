function checkIntersectedObjs(first, second) {
  let crossX = false;
  let crossY = false;

  if ((first.x1 < second.x1 && first.x2 > second.x2)
    ||
    (first.x1 < second.x2 && first.x2 > second.x1)) {
    crossX = true;
  }

  if ((first.y1 < second.y2 && first.y2 > second.y1)
    ||
    (first.y1 < second.y1 && first.y2 > second.y2)) {
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
