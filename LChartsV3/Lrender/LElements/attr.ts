import LElement from './LElement'
import { merge, isString, isObject, isFunction } from '../util/index'

let attrFunctions = {};
let TypeMap = {};

function getTypeType(vm: LElement){
  if (vm.options.shape) {
    for (let name in vm.options.shape) {
      if (vm.options.shape.hasOwnProperty(name)) {
        TypeMap[name] = 'shape'
      }
    }
  }

  if (vm.options.style) {
    for (let name in vm.options.style) {
      if (vm.options.style.hasOwnProperty(name)) {
        TypeMap[name] = 'style'
      }
    }
  }
}


function getAttrFunction(vm: LElement){
  attrFunctions = {
    shape: (newShape: Object) => {
      let shape = vm.options.shape
      merge(shape, newShape)
    },
    style: (newStyle) => {
      let style = vm.options.style
      merge(style, newStyle)
    }
  }
}

function attrKv (vm: LElement, key: string, value: any) {    
    if (isFunction(value)){
      value = value.apply(vm, arguments);
    }

    let updateMethod
    if (attrFunctions[key]){
      updateMethod = attrFunctions[key]
    } else if (TypeMap[key]) {
      updateMethod = attrFunctions[TypeMap[key]]
      
      let o = {}
      o[key] = value
      value = o
    } else {
      return
    }
    if (updateMethod) {
      updateMethod(value)
    } else {
        vm.options[key] = value
    }

    vm.updateOptions()
    vm.lr.render()
  }

function attr (this: LElement, key: String | Object, value?: any) {
    const vm = this

    getAttrFunction(vm)
    getTypeType(vm)

    if (isString(key)) {
        attrKv(vm, key as string, value);
      } else if (isObject(key)) {
        for (let name in key) {
          if (key.hasOwnProperty(name)) {
            attrKv(vm, name, key[name]);
          }
        }
      }
}

export default {
    attr
}