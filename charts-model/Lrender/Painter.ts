import Stage from './Stage'
import { isString } from './util'

function createCanvas (dom: string | HTMLCanvasElement | HTMLElement) {
    if (isString(dom)) {
      dom = document.querySelector('#' + dom) as HTMLElement;
    }
    if (dom instanceof HTMLCanvasElement) {
      return dom
    }
    let canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.height = (<HTMLElement>dom).clientHeight;
    canvas.width = (<HTMLElement>dom).clientWidth;

    (<HTMLElement>dom).appendChild(canvas)
  
    return canvas
  }

class Painter {
    canvas: HTMLCanvasElement
    stage: Stage
    ctx: CanvasRenderingContext2D
    constructor (dom: string | HTMLElement, stage: Stage) {
      this.canvas = createCanvas(dom)
      this.stage = stage
      this.ctx = this.canvas.getContext('2d')!
    }

    render () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let xelements = this.stage.getAll()
      for (let i = 0; i < xelements.length; i += 1) {
        xelements[i].refresh(this.ctx)
      }
    }
  }
  
  export default Painter