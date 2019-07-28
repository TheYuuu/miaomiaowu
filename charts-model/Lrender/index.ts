import LRedner from './LRender'
// 导出具体的元素类
export { default as Circle } from './LElements/Circle'
export { default as Rect } from './LElements/Rect'

// 只暴露方法而不直接暴露`XRender`类
export function init (dom: string | HTMLElement) {
  return new LRedner(dom)
}