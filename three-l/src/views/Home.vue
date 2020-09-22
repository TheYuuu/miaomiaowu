<template>
  <div id="WebGL-output">
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Drawer } from './drawer.js';

@Component({
  name: 'Home',
 components: {
 }
})
export default class extends Vue {
  mounted() {
    let drawer = new Drawer();
  }
}
</script>

<style lang="scss">
#WebGL-output {
  // width: 100vw;
  // height: 100vh;
}
</style>