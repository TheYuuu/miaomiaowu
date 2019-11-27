export function isString (str: any): boolean{
    return typeof str === 'string'
}
  
export function merge (obj: any, newObj: any): void {
    if (Object.prototype.toString.call(obj) != "[object Object]" 
        || Object.prototype.toString.call(newObj) != "[object Object]") {
            throw new Error("merge function needs Object types")
        }
    for (let key in newObj) {
        obj[key] = newObj[key]
    }
}
