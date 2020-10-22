<template>
<div class="videCard">
  <img :src="inf.pic">
  <div>{{inf.title}}</div>
</div>
</template>

<script>
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';

@Component({
  name: 'videCard',
  components: {}
})
export default class extends Vue {
  @Prop() inf;

  mounted() {
    // console.log(this.inf)
  }
}
</script>

<style lang="scss">
.videCard {
  height: 0;
  padding-bottom: 100%;
  position: relative;
}

.videCard>img {
  height: 80%;
  width: 80%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
