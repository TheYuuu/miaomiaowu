import { Component, Vue } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
import appApi from './api';

import cooperationSubjectModal from './model/cooperationSubjectModal.vue'

@Component({
  components: {
    cooperationSubjectModal
  }
})
export default class addAgreement extends Vue {
  params = {
    vendorName: null,
    vendorCode: null,
    signType: null
  };
  submitFlag: boolean = false;

  openPeerSubject() {
    let cooperationSubjectModal: any = this.$refs.cooperationSubjectModal;
    cooperationSubjectModal.showCreateDialog();
  }

  selectPeerSubject(item: any) {
    this.params.vendorCode = item.vendorCode;
    this.params.vendorName = item.vendorName;
  }

  submit() {
    const vm = this;
    let addAgreementForm: any = vm.$refs.addAgreementForm;
    addAgreementForm.validate((valid: any) => {
      if (valid) {
        vm.submitFlag = true;
        appApi.agreementSubmit({
          vendorCode: vm.params.vendorCode,
          signType: vm.params.signType,
        }).then(({ data: { status } }) => {
          if (status) {
            vm.$notify.success('请求成功');
            vm.submitFlag= false;

            setTimeout(()=>{
              remote.$state.go('app.contract.agreementList');
            }, 2000);
          } else {
            vm.submitFlag= false;
          }
        }).catch(() => {
          vm.submitFlag= false;
        });
      }
    });
  }

  cancle() {
    remote.$state.go('app.contract.agreementList');
  }
}