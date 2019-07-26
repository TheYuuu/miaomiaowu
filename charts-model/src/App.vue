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
    Lrender.init('canvas')
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
