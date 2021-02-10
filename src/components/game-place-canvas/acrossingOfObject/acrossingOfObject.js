function getIntersectedObjs(mainObj, arrOtherObjs) {

  const intersectedObjs = arrOtherObjs.filter((item) => {
    let crossX = false;
    let crossY = false;

    if ((item.x1 < mainObj.x1 && item.x2 > mainObj.x1)
      ||
      (item.x1 < mainObj.x2 && item.x2 > mainObj.x2)) {
      crossX = true
    }

    if ((item.y1 < mainObj.y1 && item.y2 > mainObj.y1)
      ||
      (item.y1 < mainObj.y2 && item.y2 > mainObj.y2)) {
      crossY = true
    }

    if (crossX && crossY) {
      return true
    }

  })

  return intersectedObjs;

}


export default getIntersectedObjs;
