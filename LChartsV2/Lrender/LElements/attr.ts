import LElement from './LElement'
import { merge, isString, isObject, isFunction } from '../util/index'


function attrKv (vm: LElement, key: string, value: any) {
    let attrFunctions = {
        shape: (newShape: Object) => {
          let shape = vm.options.shape
          merge(shape, newShape)
        },
        style: (newStyle) => {
          let style = vm.options.style
          merge(style, newStyle)
        }
      }

    if (isFunction(value)){
      value = value.apply(vm, arguments);
    }
    let updateMethod = attrFunctions[key]
    if (updateMethod) {
      updateMethod(value)
    } else {
        vm.options[key] = value
    }
  }

export default function attr (this: LElement, key: String | Object, value?: any) {
    const vm = this

    if (isString(key)) {
        attrKv(vm, key as string, value);
      } else if (isObject(key)) {
        for (let name in key) {
          if (key.hasOwnProperty(name)) {
            attrKv(vm, key as string, value);
          }
        }
      }
}