<template>
  <div id="app">
    <div id="canvas"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as Lrender from '../Lrender'

@Component({
  name: 'app',
  mounted () {
    var lr = Lrender.init('canvas')

    let circle = new Lrender.Circle({
      shape: {
        cx: 60,
        cy: 60,
        r: 20
      },
      style: {
        fill: '#00f'
      }
    })

    let circle1 = new Lrender.Circle({
      shape: {
        cx: 120,
        cy: 60,
        r: 20
      },
      style: {
        fill: 'red'
      }
    })

    let circle2 = new Lrender.Circle({
      shape: {
        cx: 180,
        cy: 60,
        r: 20
      },
      style: {
        fill: 'yellow'
      }
    })

    let rect = new Lrender.Rect({
      shape: {
        x: 180,
        y: 60,
        width: 20,
        height: 20
      },
      style: {
        fill: 'green'
      }
    })

    lr.add(circle, circle1, circle2, rect)
    lr.delete(circle2);
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#canvas {
  width: 500px;
  height: 500px;
  border: 1px solid lavender;
}
</style>
