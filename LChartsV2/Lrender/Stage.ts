import LElement from './LElements/LElement'

class Stage {
  lelements: LElement[] = []

    constructor () {
      console.log('Stage')
    }

    add (...lelements: LElement[]) {
      this.lelements.push(...lelements)
    }

    delete (xel: LElement) {
      let index = this.lelements.indexOf(xel)
      if (index > -1) {
        this.lelements.splice(index, 1)
      }
    }

    getAll () {
      this.updateLElements()
      
      return this.lelements.filter(el => !el.ignored)
    }

    updateLElements () {
      this.lelements.sort((a, b) => {
        return a.level - b.level
      })
    }
  }
  
  export default Stage