<template>
  <div>
    <uix-dialog
      title="银行信息选择"
      :visible.sync="createDialog"
      width="60%"
      style="min-width:400px"
      :destroy-on-close="true"
      @closed="handleClose"
    >
      <uix-table
        v-loading="loading"
        :data="tableList"
        style="width: 100%;margin-bottom: 10px"
        :highlight-current-row="true"
        @current-change="select"
      >
        <uix-table-column
          prop="partnerAccountName"
          label="开户名"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column prop="partnerBankCardNumber" label="银行账户" min-width="120">
        </uix-table-column>

        <uix-table-column prop="partnerBankName" label="银行名称" min-width="120">
        </uix-table-column>

        <uix-table-column prop="partnerBankBranchName" label="支行名称" min-width="120">
        </uix-table-column>
      </uix-table>

      <span slot="footer" class="dialog-footer">
        <uix-button type="primary" @click="confirm" size="mini">
          确 定
        </uix-button>
        <uix-button @click="createDialog = false" size="mini">
          取 消
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import appApi from './api';

@Component({
  name: 'peerSubjectBank'
})
export default class extends Vue {
  tableList: any = [];
  createDialog: boolean = false;
  loading: boolean = false;
  choosenItem: any = null;
  allData: any = null;

  @Prop()
  partnerSubjectIds: any;

  showCreateDialog() {
    this.load();
    this.choosenItem = null;
    this.createDialog = true;
  }

  confirm() {
    this.$emit('selectPeerSubjectBank', this.choosenItem);
    this.createDialog = false;
  }

  load() {
    const vm = this;
    vm.loading = true;

    let reqData = {
      partnerSubjectIds: vm.partnerSubjectIds
    };

    appApi.getPeerSubjectBank(reqData).then(({ data: { data, status } }) => {
      if (status) {
        vm.tableList = data[0].salePartnerBankVoList;
        vm.allData = data[0];
        vm.loading = false;
      } else {
        vm.loading = false;
      }
    }).catch(() => {
      vm.loading = false;
    });
  }

  select(item: any) {
    this.choosenItem = {
      salePartnerBankVo: item,
      saleInvoiceInfoVo: this.allData.saleInvoiceInfoVo
    };
  }

  handleClose() {
    this.tableList = [];
  }
}
</script>
