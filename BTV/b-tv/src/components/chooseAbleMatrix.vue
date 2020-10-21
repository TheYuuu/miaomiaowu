<template>
<div>
  <div v-for="(col) in matrix" :key="JSON.stringify(col)" class="flex_con pad_con">
    <div v-for="(item) in col" :key="item.name" class="box-card chooseAble" tabindex="0">
      <slot v-bind:item="item"></slot>
    </div>
  </div>
</div>
</template>

<script>
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';

@Component({
  name: 'chooseAbleMatrix',
  components: {}
})
export default class extends Vue {
  @Prop() matrix;

  mounted() {}
}
</script>

<style lang="scss">

</style>
