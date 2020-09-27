<template>
  <div id="WebGL-output">
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Drawer } from './drawer.js';

@Component({
  name: 'earth'
})
export default class extends Vue {
  mounted() {
    let drawer = new Drawer('WebGL-output');
  }
}
</script>

<style lang="scss">
</style>