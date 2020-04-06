import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld')
const HelloWorld2 = () => import('@/components/HelloWorld2')

function getComponent () {
  console.log(123)
  return HelloWorld2
}

function childComponentHander () {
  return resolve => {
      require.ensure([], (require) => {
          resolve(require('@/components/' + 'HelloWorld2' + '.vue'))
      })
  }
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld2',
      component: childComponentHander()
    }
  ]
})
