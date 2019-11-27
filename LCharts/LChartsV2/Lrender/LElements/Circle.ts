import LElement, { LElementShape, XElementOptions } from './LElement'

interface CircleShape extends LElementShape {
  cx: number
  cy: number
  r: number
}

interface CircleOptions extends XElementOptions {
  shape: CircleShape
}

class Circle extends LElement {
  name ='circle'
  shape: CircleShape = {
    cx: 10,
    cy: 10,
    r: 10
  }
  constructor (opt: CircleOptions) {
    super(opt)
  }
  render (ctx: CanvasRenderingContext2D) {
    let shape = this.shape
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true)
  }
}

export default Circle