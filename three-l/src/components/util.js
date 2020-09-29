import * as THREE from 'three';

// 通过经纬度和圆的半径返回三维坐标点
function getEarthPositionByCoordinate(longitude, latitude, radius) {
  // 将经度，纬度转换为rad坐标
  var lg = THREE.Math.degToRad(longitude);
  var lt = THREE.Math.degToRad(latitude);
  var temp = radius * Math.cos(lt);
  // 获取x，y，z坐标
  var x = temp * Math.sin(lg);
  var y = radius * Math.sin(lt);
  var z = temp * Math.cos(lg);
  return {
    x: x,
    y: y,
    z: z
  }
}

// 返回两点描述的向量
function getVectorLineByTwoVectors (v1, v2) {
  var v = v1.add(v2);

  return v.divideScalar(1);
}

// 计算两点差值  from + （to - from） * t
function getLenVcetor (v1, v2, len) {
  var v1v2Len = v1.distanceTo(v2);
  return v1.lerp(v2, len / v1v2Len);
}

export {
  getEarthPositionByCoordinate,
  getVectorLineByTwoVectors,
  getLenVcetor
}