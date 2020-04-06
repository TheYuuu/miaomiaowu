<template>
  <div class="sale-contract-edit-page">
    <div class="page-title">
    <i class="uix-icon-arrow-left" @click="back()"></i>
      {{ pageTitle }}
    </div>
    <div class="wrapper">
      <basic-info :basic-info="basicInfo" :formDisable="formDisable.basicInfo" ref="basicInfoRef"></basic-info>
      <subject-info
        @selectPeerSubject="selectPeerSubject"
        :subject-info="subjectInfo"
        :peer-subject-list="peerSubjectList"
        :formDisable="formDisable.subjectInfo"
        :partner-subject-pay-info="partnerSubjectPayInfo"
      ></subject-info>
      <payment-info
        :payment-clause="paymentClause"
        :peer-subject-list="peerSubjectList"
        :formDisable="formDisable.paymentClause"
        :partner-subject-pay-info="partnerSubjectPayInfo"
        ref="paymentInfoRef"
        @saleSettlementCustomCycleVoListChange="saleSettlementCustomCycleVoListChange"
      ></payment-info>
      <other-info :other-info="otherInfo" :formDisable="formDisable.otherInfo"></other-info>
    </div>

    <div class="wrapper">
      <div class="panel-body text-center">
        <uix-row :gutter="20">
          <uix-button
            size="mini"
            plain
            @click="save"
            v-if="method !== 'view'"
            :loading="submitFlag"
            >保 存 草 稿</uix-button
          >
          <uix-button
            size="mini"
            type="primary"
            @click="submit"
            v-if="method !== 'view'"
            :loading="submitFlag"
            >提 交</uix-button
          >
          <uix-button
            size="mini"
            plain
            @click="cancel"
            :loading="submitFlag"
            >返 回</uix-button
          >
        </uix-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import saleContractPage from './page';
export default saleContractPage;
</script>

<style lang="scss">
.sale-contract-edit-page {
  min-width: 1000px;
  .m-b {
    margin-bottom: 15px;
  }

  .m-r-md {
    margin-right: 10px;
  }

  .text-center {
    text-align: center;
  }
}

.salecontract-edit-cancel-button {
  float: right;
  margin-left: 10px;
}
</style>
