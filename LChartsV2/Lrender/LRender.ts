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

  add (...lelements: LElement[]) {
    lelements.forEach(xel => {
      xel.setLr(this)
    })

    this.stage.add(...lelements)
    this.render()
  }

  delete (xel: LElement) {
    this.stage.delete(xel)
    this.render()
  }

  render () {
    this.painter.render()
  }
}

export default LRender