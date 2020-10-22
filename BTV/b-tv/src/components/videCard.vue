<template>
<div class="videCard">
  <img :src="inf.pic">
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

  mounted() {}
}
</script>

<style lang="scss">
.videCard {
  height: 150px;
}

.videCard>img {
  width: 60%;
}
</style>
