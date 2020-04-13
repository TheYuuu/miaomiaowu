import { Component } from 'vue-property-decorator';

import basicInfo from '../components/basicInfo.vue';
import otherInfo from '../components/otherInfo.vue';
import paymentInfo from '../components/paymentInfo.vue';
import subjectInfo from '../components/subjectInfo.vue';

import saleContractPage from '../editSaleContract/page'

@Component({
  components: {
    basicInfo,
    otherInfo,
    paymentInfo,
    subjectInfo
  }
})
export default class saleContractStopAgreementEdit extends saleContractPage {
  contractCode: string = '';
  mainContractExpirationTime: string = '';

  initCreate() {
    const vm = this;

    vm.contractCode = String(this.$route.query.contractCode);
    vm.appApi.getLatestData({
      contractCode: this.contractCode
    }).then(({ data: { data, status } }: any) => {
      if (status) {
        vm.initPageTitle();
        vm.handleData(data);
        vm.basicInfo.supplementaryType = 'STOP_AGREEMENT';
        vm.getMainContractTime();
      }
    });
  }

  getMainContractTime() {
    const vm = this;
    vm.appApi.getPrimaryCode({
      contractCode: vm.contractCode
    }).then(({ data: { data, status } }: any) => {
      if (status) {
        vm.basicInfo.effectiveTime = data.saleBaseInfoVo.effectiveTime;
        vm.mainContractExpirationTime = data.saleBaseInfoVo.expirationTime;
      }
    });
  }

  initPageTitle() {
    // 标题
    const vm = this;
    let from = vm.$route.query.from;
    if (vm.method === 'edit') {
      vm.pageTitle = '合同修改-终止协议';
    } else if (from === 'list') {
      vm.pageTitle = '合同修改-终止协议';
    }  else if (from === 'apply') {
      vm.pageTitle = '我的申请 - 终止协议';
    } else {
      // do nithing
    }
  }

  initFormDisable() {
    this.formDisable = {
      basicInfo: {
        contractName: false,
        creatorName: false,
        sealed: false,
        contractProperty: false,
        effectiveTime: true,
        expirationTime: false,
      },
      subjectInfo: true,
      paymentInfo: true,
      otherInfo: false
    }
  }

  supplementaryHandle(data: any) {
    data.latestContractCode = this.basicInfo.contractCode || this.latestContractCode;
    return data;
  }

  save() {
    const vm = this;
    let ReqData = vm.supplementaryHandle(vm.getReqData());
    if (vm.submitFlag) {
      return;
    }
    vm.submitFlag = true;
    vm.appApi.saveDraft(ReqData).then(
      ({ data: { status, data} }: any) => {
        if (status) {
          vm.$notify.success('保存草稿成功！');
          setTimeout(() => {
            vm.remote.$state.go('app.contract.editSaleContract.stopAgreementEdit', {
              id: data,
              method: 'edit',
              from: 'list'
            });
          }, 500);
        } else {
          vm.submitFlag = false;
        }
      },
      () => {
        vm.submitFlag = false;
      }
    );
  }

  cancel() {
    const vm = this;
    this.$confirm('是否确认取消?', '提示', {
      cancelButtonClass: 'salecontract-edit-cancel-button',
      type: 'warning'})
      .then(() => {
        let url = '';
        let params = {};
        switch (this.$route.query.from) {
          case 'list':
            url = 'app.contract.saleContractManage';
            break;
          case 'draft':
            url = 'app.contract.contractDrafts';
            params = {
              type: 'sales'
            };
            break;
          case 'apply':
            url = 'app.contract.contractApply';
            params = {
              type: 'sales'
            };
            break;
          default:
            // do nothing
            break;
        }
        vm.remote.$state.go(url, params);
      })
      .catch(() => {});
  }
}
