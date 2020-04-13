<template>
  <div>
    <uix-dialog
      title="新增合同类型选择"
      :visible.sync="createDialog"
      width="40%"
      style="min-width:400px"
      :destroy-on-close="true"
    >
      <uix-form size="small" label-position="right" label-width="80px">
        <uix-col :sm="24">
          <uix-form-item label="合同种类" required>
            <uix-col :sm="18">
              <uix-select
                v-model="params.contractType"
                size="small"
                style="width:100%"
              >
                <uix-option
                  style="width:100%"
                  v-for="item in options.contractTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item"
                >
                </uix-option>
              </uix-select>
            </uix-col>
          </uix-form-item>
          <uix-form-item label="事业部" required>
            <uix-col :sm="18">
              <uix-select
                v-model="params.bu"
                size="small"
                style="width:100%"
                :disabled="loading">
                <uix-option
                  style="width:100%"
                  v-for="item in options.buList"
                  :key="item.buName"
                  :label="item.buName"
                  :value="item.buId"
                >
                </uix-option>
              </uix-select>
            </uix-col>
          </uix-form-item>

          <uix-form-item label="合同类型" required>
            <uix-checkbox v-model="params.contractSubTypeVal"
              >账期付款合同</uix-checkbox
            >
          </uix-form-item>
        </uix-col>
      </uix-form>
      <span slot="footer" class="dialog-footer">
        <uix-button @click="createDialog = false" size="mini" :loading="loading">
          取 消
        </uix-button>
        <uix-button type="primary" @click="createButton" size="mini" :loading="loading">
          确 定
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
import appApi from './api';

@Component({
  name: 'saleMangeDialogs'
})
export default class extends Vue {
  options: any = {
    contractTypeList: [
      {
        name: '销售合同',
        value: 'SALE'
      }
    ],
    contractSubTypeData: {
      SALE: {
        name: '账期付款合同',
        value: 'ACCOUNT_PAY_CONTRACT'
      }
    },
    buList: []
  };
  params: any = {
    contractType: this.options.contractTypeList[0],
    bu: {},
    contractSubTypeVal: true
  };
  createDialog: Boolean = false;
  loading: boolean = false;

  showCreateDialog() {
    this.load();
    this.createDialog = true;
  }

  load() {
    const vm = this;
    vm.options.buList = [];
    vm.params.bu = '';
    vm.loading = true;
    appApi.getBuList().then(({ data: { data, status } }) => {
      if (status) {
        vm.options.buList = data;
        vm.params.bu = vm.options.buList[0].buId;

        vm.loading = false;
      } else {
        vm.loading = false;
      }
    }).catch(() => {
      vm.loading = false;
    });
  }

  createButton() {
    const vm = this;
    let contractType = vm.params.contractType;
    let buId = vm.params.bu;
    let buName = vm.options.buList.filter((item: any) => item.buId === buId)[0]
      .buName;

    let stateUrl = '';
    switch (contractType.value) {
      case 'SALE':
        stateUrl = 'app.contract.editSaleContract';
        break;
      default:
        break;
    }
    let params = {
      method: 'create',
      from: 'list',
      buId: buId,
      buName: buName
    };
    remote.$state.go(stateUrl, params);
  }
}
</script>

<style>
.text-right {
  text-align: right;
}
</style>
