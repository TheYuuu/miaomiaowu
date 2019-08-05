export function isString (str: any){
    return typeof str === 'string'
}

export function isObject (obj: any){
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isFunction (obj: any){
    return Object.prototype.toString.call(obj) === '[object Function]'
}
  
export function merge (obj: any, newObj: any) {
    if (Object.prototype.toString.call(obj) != "[object Object]" 
        || Object.prototype.toString.call(newObj) != "[object Object]") {
            throw new Error("merge function needs Object types")
        }
    for (let key in newObj) {
        obj[key] = newObj[key]
    }
}

export function debounce (fn: Function, delay = 300) {
    let timer: number | null = null
    return function (...args) {
      clearTimeout(timer as number)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }