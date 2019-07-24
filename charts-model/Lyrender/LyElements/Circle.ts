import * as Lyrender from '../Lyrender'

let xr = Lyrender.init('#app')
let circle = new Lyrender.Circle({
  shape: {
    cx: 40,
    cy: 40,
    r: 20
  }
})
xr.add(circle)
// 现在画布上有一个半径为20的圆了