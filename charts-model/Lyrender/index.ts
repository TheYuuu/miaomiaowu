import LyRedner from './LyRender'
// 导出具体的元素类
export { default as Circle } from './LyElements/Circle'
// 只暴露方法而不直接暴露`XRender`类
export function init () {
  return new LyRedner()
}