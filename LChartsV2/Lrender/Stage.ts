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
      return this.lelements
    }
  }
  
  export default Stage