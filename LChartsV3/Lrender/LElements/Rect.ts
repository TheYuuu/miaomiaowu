import LElement, { LElementShape, XElementOptions } from './LElement'

interface RectShape extends LElementShape {
    x: number
    y: number
    width: number
    height: number
}

interface RectOptions extends XElementOptions {
    shape: RectShape
}

class Rect extends LElement {
    name = "rect"
    shape :RectShape = {
        x: 10,
        y: 10,
        width: 10,
        height: 10
    }
    constructor (opt: RectOptions) {
        super(opt)
    }

    render (ctx: CanvasRenderingContext2D) {
        let shape = this.shape
        ctx.rect(shape.x, shape.y, shape.width, shape.height)
    }
}

export default Rect