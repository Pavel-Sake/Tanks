const dataExplosion1 = {
  sx: 64,
  sy: 70,
  width: 70,
  height: 72,
  widthExp: 25,
  heightExp: 25
}
const dataExplosion2 = {
  sx: 223,
  sy: 34,
  width: 132,
  height: 114,
  widthExp: 30,
  heightExp: 30
}
const dataExplosion3 = {
  sx: 397,
  sy: 16,
  width: 168,
  height: 156,
  widthExp: 40,
  heightExp: 40
}
const dataExplosion4 = {
  sx: 575,
  sy: 1,
  width: 186,
  height: 180,
  widthExp: 50,
  heightExp: 50
}
const dataExplosion5 = {
  sx: 766,
  sy: 1,
  width: 183,
  height: 177,
  widthExp: 50,
  heightExp: 50
}
const dataExplosion6 = {
  sx: 7,
  sy: 206,
  width: 180,
  height: 168,
  widthExp: 45,
  heightExp: 45
}
const dataExplosion7 = {
  sx: 211,
  sy: 212,
  width: 159,
  height: 162,
  widthExp: 40,
  heightExp: 40
}

const countRepeat = 10

const data1 = []
data1.length = countRepeat
data1.fill(dataExplosion1)

const data2 = []
data2.length = countRepeat
data2.fill(dataExplosion2)

const data3 = []
data3.length = countRepeat
data3.fill(dataExplosion3)

const data4 = [];
data4.length = countRepeat;
data4.fill(dataExplosion4);

const data5 = [];
data5.length = countRepeat;
data5.fill(dataExplosion5);

const data6 = [];
 data6.length = countRepeat;
 data6.fill(dataExplosion6);

const data7 = [];
 data7.length = countRepeat;
 data7.fill(dataExplosion7);

const dataExplosionBullet = [...data1, ...data2, ...data3, ...data4, ...data5, ...data6, ...data7];

export default dataExplosionBullet;


