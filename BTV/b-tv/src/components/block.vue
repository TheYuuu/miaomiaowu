<template>
<div>
  <choose-able-matrix :matrix="randomArr">
    <template v-slot:default="slotProps">
      <videCard :inf="slotProps.item" />
    </template>
  </choose-able-matrix>
</div>
</template>

<script>
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';

import videCard from './videCard';
import chooseAbleMatrix from './chooseAbleMatrix';
@Component({
  name: 'block',
  components: {
    videCard,
    chooseAbleMatrix
  }
})
export default class extends Vue {
  @Prop() inf;

  randomArr = [];

  mounted() {
    const vm = this;
    const data = require('../assets/data/random.json').data;
      let index = 0;

      while(index < data.archives.length) {
        vm.randomArr.push(data.archives.slice(index, index += 4));
      }
    // const vm = this;
    // axios.get('./data/random.json').then(({data: {data}}) => {
    //   let index = 0;

    //   while(index < data.archives.length) {
    //     vm.randomArr.push(data.archives.slice(index, index += 4));
    //   }
    //   console.log(vm.randomArr)
    // });
  }
}
</script>

<style lang="scss">

</style>
