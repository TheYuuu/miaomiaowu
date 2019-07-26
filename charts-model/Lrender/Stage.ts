import LElement from './LElements/LElement'

class Stage {
  lelements: LElement[] = []

    constructor () {
      console.log('Stage')
    }

    add (...lelements: LElement[]) {
      this.lelements.push(...lelements)
    }

    getAll () {
      return this.lelements
    }
  }
  
  export default Stage