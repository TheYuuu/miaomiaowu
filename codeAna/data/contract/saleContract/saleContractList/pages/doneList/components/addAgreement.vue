<template>
  <div class="sale-contract-add-agreement">
    <uix-dialog
      title="新增合同类型选择"
      :visible.sync="showDialog"
      width="50%"
      style="min-width:400px"
      :destroy-on-close="true"
    >
      <uix-form :inline="false" size="small" label-position="left" label-width="80px">
        <uix-col :sm="24">
          <uix-form-item label="合同类型">
            <uix-radio v-model="contractType" label="MODIFY_CLAUSE">条款修改</uix-radio>
          </uix-form-item>
          <uix-form-item>
            <uix-radio v-model="contractType" label="STOP_AGREEMENT">终止协议</uix-radio>
          </uix-form-item>
        </uix-col>
      </uix-form>
      <span slot="footer" class="dialog-footer">
        <uix-button @click="showDialog = false" size="mini" :loading="operateLoading">
          取 消
        </uix-button>
        <uix-button @click="submitCheck" size="mini" type="primary" :loading="operateLoading">
          确 认
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
import appApi from '../api';
import moment from 'moment';

@Component({
  name: 'addAgreement'
})
export default class extends Vue {
  @Prop()
  contract: any;

  showDialog: boolean = false;
  operateLoading: boolean = false;
  contractType: string = 'MODIFY_CLAUSE';

  moment = moment;

  show() {
    this.showDialog = true;
  }

  submit() {
    const vm = this;
    let params = {};
    let url = '';
    if (this.contractType === 'MODIFY_CLAUSE') {
      url = 'app.contract.editSaleContract.modifyClauseEdit';
      params = {
        method: 'create',
        contractCode: vm.contract.contractCode,
        from: 'list'
      }
    } else if (this.contractType === 'STOP_AGREEMENT') {
      url = 'app.contract.editSaleContract.stopAgreementEdit';
      params = {
        method: 'create',
        contractCode: vm.contract.contractCode,
        from: 'list'
      }
    }

    remote.$state.go(url, params);
  }

  submitCheck() {
    const vm = this;
    vm.operateLoading = true;
    appApi.hasStopAgreement({
      contractCode: this.contract.contractCode
    }).then(({ data: { data, status } }) => {
      if (status) {
        if (data) {
          vm.$notify.warning("该合同有终止协议，无法进行补充协议！");
          vm.operateLoading = false;
        } else {
          vm.submit();
          vm.operateLoading = false;
        }
      } else {
        vm.operateLoading = false;
      }
    }).catch(() => {
      vm.operateLoading = false;
    });
  }
}
</script>

<style lang="scss"></style>
