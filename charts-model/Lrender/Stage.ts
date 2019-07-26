import LElement from './LElements/LElement'

class Stage {
  xelements: LElement[] = []

    constructor () {
      console.log('Stage')
    }

    getAll () {
      return this.xelements
    }
  }
  
  export default Stage