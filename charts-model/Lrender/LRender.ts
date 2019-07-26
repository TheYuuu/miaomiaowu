import LElement from './LElements/LElement'
import Stage from './Stage'
import Painter from './Painter'

class LRender {
  stage: Stage
  painter: Painter
  constructor (dom: string | HTMLElement) {
      let stage = new Stage()
      this.stage = stage
      this.painter = new Painter(dom, stage)
  }

  add () {
  }

  render () {
  }
}

export default LRender