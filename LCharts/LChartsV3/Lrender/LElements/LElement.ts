import { merge, mixins } from '../util/index'
import LRender from '../LRender'
import attr from './attr'

export interface LElementShape {
}

type Color = string | CanvasGradient | CanvasPattern
export interface LElementStyle {
  fill?: Color
  stroke?: Color
  opacity?: number
  lineWidth?: number
}

export interface XElementOptions {
  type?: string
  shape?: LElementShape
  style?: LElementStyle
  level?: number
}

function bindStyle (ctx: CanvasRenderingContext2D, style: LElementStyle) {
  ctx.fillStyle = style.fill || 'transparent'
  ctx.strokeStyle = style.stroke || 'black'
  ctx.globalAlpha = style.opacity || 1
  ctx.lineWidth = style.lineWidth || 1
}

@mixins(attr)
class LElement {
  name = 'LEelement'
  shape: LElementShape = {}
  style: LElementStyle = {}
  level: number = 0
  options: XElementOptions
  lr: any
  ignored: boolean = false
  constructor (opt: XElementOptions) {
    this.options = opt
  }

  updateOptions () {
    let opt = this.options
    if (opt.shape) {
      merge(this.shape, opt.shape)
    }
    if (opt.style) {
      merge(this.style, opt.style)
    }
    if (opt.level) {
      this.level = opt.level
    }
  }

  render (ctx: CanvasRenderingContext2D) {
  }
 
  beforeRender (ctx: CanvasRenderingContext2D) {
    this.updateOptions()
    let style = this.style
    ctx.save()
    bindStyle(ctx, style)
    ctx.beginPath()
  }
 
  afterRender (ctx: CanvasRenderingContext2D) {
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }

  refresh (ctx: CanvasRenderingContext2D) {
    this.beforeRender(ctx)
    this.render(ctx)
    this.afterRender(ctx)
  }

  setLr (lr: LRender) {
    this.lr = lr
  }

  attr (key: String | Object, value?: any) {
    // 混入attr
  }

  show () {
    this.ignored = false
    this.lr.render()
  }

  hide () {
    this.ignored = true
    this.lr.render()
  }
}


export default LElement
