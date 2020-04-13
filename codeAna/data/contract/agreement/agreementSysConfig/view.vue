<template>
  <div class="contract-agreement-agreementSysConfig-page">
    <div class="page-title m-b">
      系统配置
    </div>
    <div class="wrapper">
      <div class="panel">
        <div class="panel-heading">
          <h2 style="display: inline">选择分类项</h2> (系统自动发起贴码增值服务, 将在选中的二级品类范围内发起)
        </div>
        <div class="panel-body">
          <uix-input
            class="m-b"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            size="mini">
          </uix-input>
          <uix-tree
            :data="tree"
            show-checkbox
            node-key="catId"
            :highlight-current="false"
            :default-checked-keys="defaultChecked"
            :props="defaultProps"
            @check="check"
            :filter-node-method="filterNode"
            ref="agreementTree">
          </uix-tree>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="panel-body text-center">
        <uix-row :gutter="20">
          <uix-button
            size="mini"
            type="primary"
            @click="submit"
            :loading="submitFlag"
            >提 交</uix-button
          >
          <uix-button
            size="mini"
            @click="cancle"
            :loading="submitFlag"
            >取 消</uix-button
          >
        </uix-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import agreementSysConfig from './page';

export default agreementSysConfig;
</script>

<style lang="scss">
.contract-agreement-agreementSysConfig-page {
  padding: 20px;
  .page-title {
    padding: 20px 0px;
    font-size: 24px;
    font-weight: 300;
    vertical-align: middle;
    background: none;
    border-bottom: none;
  }

  .text-center{ 
    text-align: center;
  }

  .m-b {
    margin-bottom: 10px;
  }
}
</style>
