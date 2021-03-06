function debounce() {
  let isCooldonw = false;

  return  (func, countActiveBullet, ms) => {
    if (isCooldonw) {
      return;
    }

    countActiveBullet.push(func);

    isCooldonw = true;

    setTimeout(() => {
      isCooldonw = false;
    }, ms);
  };
}

export default debounce;