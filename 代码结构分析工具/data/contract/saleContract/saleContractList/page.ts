import doneList from './pages/doneList/doneList.vue';
import { Component, Vue } from 'vue-property-decorator';

import saleMangeDialogs from './components/saleMangeDialogs.vue';

@Component({
  components: {
    doneList,
    saleMangeDialogs
  }
})
export default class extends Vue {
  addContract() {
    let saleMangeDialogsRef: any = this.$refs.saleMangeDialogs;
    saleMangeDialogsRef.showCreateDialog();
  }
}
