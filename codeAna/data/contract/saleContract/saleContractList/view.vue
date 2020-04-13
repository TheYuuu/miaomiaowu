<template>
  <div class="sale-contract-manage-page">
    <div class="page-title">
      销售合同管理
      <uix-button
        class="pull-right"
        type="primary"
        size="small"
        @click="addContract"
      >
        新增合同
      </uix-button>
    </div>
    <done-list></done-list>
    <sale-mange-dialogs ref="saleMangeDialogs"></sale-mange-dialogs>
  </div>
</template>

<script lang="ts">
import ourSubjectInfList from './page';
export default ourSubjectInfList;
</script>

<style lang="scss">
.sale-contract-manage-page {
  padding: 20px;
  .page-title {
    padding: 20px 0px;
    font-size: 24px;
    font-weight: 300;
    vertical-align: middle;
    background: none;
    border-bottom: none;
  }
  .page-search {
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 20px;
    padding-bottom: 0;
    .uix-form-item {
      .uix-input,
      .uix-select {
        width: 100%;
      }
    }
  }
  .page-content {
    background: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    &-operate {
      margin-bottom: 15px;
    }
    .uix-pagination {
      text-align: right;
      margin-top: 20px;
    }

    .uix-button {
      margin-right: 10px;
      + .uix-button {
        margin-left: 0;
      }
    }
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-group-header {
    color: #333;
    border-left: 3px solid #118bfb;
    padding-left: 20px;
    line-height: 1;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: left;
  }
  .form-group-content {
    .uix-form-item {
      margin-bottom: 10px;
      .uix-input,
      .uix-select {
        width: 100%;
      }
    }
  }

  .text-center {
    text-align: center;
  }

  .btm {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .w {
    width: 150px;
  }

  .text-center {
    text-align: center;
  }

  .m-b {
    margin-bottom: 15px;
  }

  .m-b-xs {
    margin-bottom: 5px;
  }

  .uix-dialog__body {
    padding: 15px 20px;
  }

  .btm {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .pull-right {
    float: right;
  }
}
</style>
