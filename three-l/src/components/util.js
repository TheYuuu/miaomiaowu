import * as THREE from 'three';

function getPosition(longitude, latitude, radius) {
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

export {
  getPosition
}