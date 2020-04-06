<template>
  <div>
    <uix-dialog 
      title="新建规则版本"
      :visible.sync="createDialog"
      width="40%"
      :before-close="handleClose"
      style="min-width:400px"
    >
    <uix-form size="small" label-position="left">
      <uix-col :sm="24">
        <uix-form-item label="规则类型">
          <uix-col :sm="18">
            <uix-select
              v-model="params.contractRuleType"
              size="small"
              style="width:100%"
            >
              <uix-option
                style="width:100%"
                v-for="item in options.contractRuleTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </uix-option>
            </uix-select>
          </uix-col>
        </uix-form-item>
      </uix-col>
    </uix-form>
      <span slot="footer" class="dialog-footer">
        <uix-button type="primary" @click="createButton" size="mini">
          确 定
        </uix-button>
        <uix-button @click="createDialog = false" size="mini">
          取 消
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script>
import { remote } from '@/utils/ipc';

export default {
  name: 'ruleMangeDialogs',
  data: function() {
    return {
      options: {
        contractRuleTypeList: [{
          value: 'PURCHASE_COMMON_CONTRACT_RULE',
          label: '采购常规合同规则'
        }, {
          value: 'PURCHASE_BRAND_CONTRACT_RULE',
          label: '采购商标合同规则'
        }]
      },
      params: {
        contractRuleType: 'PURCHASE_COMMON_CONTRACT_RULE'
      },
      createDialog: false
    }
  },
  methods: {
    showCreateDialog() {
      this.createDialog = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
          done();
      })
      .catch(_ => {});
    },
    createButton() {
      this.createDialog = false;
      remote.$state.go('app.contract.saleRulePage', {
        contractRuleType: this.params.contractRuleType,
        method: 'create'
      });
    }
  }
};
</script>

<style>
.text-right {
  text-align: right;
}
</style>
