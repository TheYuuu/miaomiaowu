<template>
  <div class="contract-agreement-addAgreement-page">
    <div class="page-title m-b">
      新增合同
    </div>
    <div class="wrapper">
      <div class="panel">
        <div class="panel-heading">基本信息(<span class="necessary"></span> 表示必填)</div>
        <div class="panel-body">
          <uix-form label-position="right" label-width="120px" ref="addAgreementForm" :model="params">
            <uix-row>
              <uix-col :span="24">
                <uix-form-item label="合作方签约主体"
                  required prop="vendorName"
                    :rules="[
                      { required: true, message: '请选择合作方主体', trigger: 'blur' }
                  ]">
                  <uix-input
                    size="small"
                    v-model="params.vendorName"
                    style="max-width: 200px"
                    @focus="openPeerSubject"
                  ></uix-input>
                </uix-form-item>
              </uix-col>
            </uix-row>
            <uix-row>
              <uix-col :span="24">
                <uix-form-item label="签约方式"
                  required prop="signType"
                  :rules="[
                    { required: true, message: '请选择签约方式', trigger: 'blur' }
                  ]">
                  <uix-radio v-model="params.signType" label="ELECTRONIC_CONTRACT">电子合同</uix-radio>
                  <uix-radio v-model="params.signType" label="PAPER_CONTRACT">纸质合同</uix-radio>
                </uix-form-item>
              </uix-col>
            </uix-row>
          </uix-form>
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
    <cooperation-subject-modal
      ref="cooperationSubjectModal"
      @selectPeerSubject="selectPeerSubject"
      ></cooperation-subject-modal>
  </div>
</template>

<script lang="ts">
import addAgreement from './page';

export default addAgreement;
</script>

<style lang="scss">
.contract-agreement-addAgreement-page {
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

  .necessary:before {
    content: "*";
    color: #ff5a5a;
  }
}
</style>
