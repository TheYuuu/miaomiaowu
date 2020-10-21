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
  Vue
} from 'vue-property-decorator';

import {
  controlStore
} from '../store/control';

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
  @controlStore.Getter('getWatchBlockArr') randomArr;

  mounted() {
    console.log(this.randomArr);
  }
}
</script>

<style lang="scss">

</style>
