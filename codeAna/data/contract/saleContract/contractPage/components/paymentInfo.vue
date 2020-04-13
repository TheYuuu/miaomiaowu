<template>
  <div class="panel sale-contract-payment-info">
    <div class="panel-heading">付款信息(表示必填)</div>
    <div class="panel-body">
      <uix-form label-position="right" label-width="160px">
        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="结算类型" required>
              <uix-select
                :disabled="method === 'view' || formDisable"
                v-model="paymentClause.settlementType"
                size="small"
                style="width:100%"
              >
                <uix-option
                  style="width:100%"
                  v-for="item in settlementTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </uix-option>
              </uix-select>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="票款方式" required>
              <uix-select
                :disabled="method === 'view' || formDisable"
                v-model="paymentClause.invoiceSequence"
                size="small"
                style="width:100%"
              >
                <uix-option
                  style="width:100%"
                  v-for="item in invoiceSequenceList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </uix-option>
              </uix-select>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="结算周期" required>
              <uix-col :span="10">
                <uix-select
                  v-model="paymentClause.settlementTerm"
                  size="small"
                  style="width:100%"
                  :disabled="method === 'view' || formDisable"
                >
                  <uix-option
                    style="width:100%"
                    v-for="item in settlementTermList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </uix-option>
                </uix-select>
              </uix-col>
              <div v-if="paymentClause.settlementTerm === 'FIXED_MONTHLY_DATE'">
                <uix-col :span="4" class="text-center">
                  每月
                </uix-col>
                <uix-col :span="8">
                  <uix-input
                    :disabled="method === 'view' || formDisable"
                    size="small"
                    v-model="paymentClause.settlementFixedDate"
                  ></uix-input>
                </uix-col>
                <uix-col :span="2" class="text-center">
                  号
                </uix-col>
              </div>
              <div v-if="paymentClause.settlementTerm === 'FIXED_DAYS'">
                <uix-col :span="2" class="text-center">
                  每
                </uix-col>
                <uix-col :span="6">
                  <uix-input
                    :disabled="method === 'view' || formDisable"
                    size="small"
                    v-model="paymentClause.settlementFixedDays"
                  ></uix-input>
                </uix-col>
                <uix-col :span="6" class="text-center">
                  个自然日
                </uix-col>
              </div>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="付款账期" required>
              <uix-col :span="8">
                <uix-select
                  :disabled="method === 'view' || formDisable"
                  v-model="paymentClause.paymentSettlement"
                  size="small"
                  style="width:100%"
                >
                  <uix-option
                    style="width:100%"
                    v-for="item in paymentSettlementList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </uix-option>
                </uix-select>
              </uix-col>
              <uix-col :span="4" class="text-center">
                后 +
              </uix-col>
              <uix-col :span="8">
                <uix-input
                  :disabled="method === 'view' || formDisable"
                  size="small"
                  v-model="paymentClause.paymentPlusDays"
                ></uix-input>
              </uix-col>
              <uix-col :span="4" class="text-center">
                天
              </uix-col>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row v-if="paymentClause.settlementTerm === 'CUSTOM_CYCLE'">
          <uix-col :span="24" class="m-b">
            <uix-form-item label="自定义周期" required>
              <uix-table
                :data="paymentClause.saleSettlementCustomCycleVoList"
                style="width: 100%;margin-bottom: 10px"
              >
                <uix-table-column
                  label="账单序号"
                  width="120"
                  type="index"
                  align="center"
                >
                </uix-table-column>
                <uix-table-column
                  prop="beginDate"
                  label="开始时间"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <uix-date-picker
                      size="small"
                      v-model="scope.row.beginDate"
                      style="width:100%"
                      :disabled="true || formDisable"
                    ></uix-date-picker>
                  </template>
                </uix-table-column>
                <uix-table-column prop="endDate" label="结束时间" min-width="120">
                  <template slot-scope="scope">
                    <uix-date-picker
                      size="small"
                      v-model="scope.row.endDate"
                      style="width:100%"
                      :disabled="method === 'view' 
                        || scope.$index===paymentClause.saleSettlementCustomCycleVoList.length-1
                         || formDisable"
                      @change="saleSettlementCustomCycleVoListChange"
                    ></uix-date-picker>
                  </template>
                </uix-table-column>
              </uix-table>
              <uix-button
                size="mini"
                type="primary"
                plain
                round
                @click="addCustomCycle"
                v-if="method !== 'view' && !formDisable"
                >增加账单周期</uix-button
              >
              <uix-button
                size="mini"
                type="primary"
                plain
                round
                @click="deleteCustomCycle"
                v-if="method !== 'view' && !formDisable"
                >减少账单周期</uix-button
              >
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="客户付款类型" required>
              <uix-select
                :disabled="method === 'view' || formDisable"
                v-model="paymentClause.paymentClass"
                size="small"
                style="width:100%"
              >
                <uix-option
                  style="width:100%"
                  v-for="item in paymentClassList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </uix-option>
              </uix-select>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="发票类型" required>
               <uix-checkbox-group v-model="paymentClause.invoiceType">
                <uix-col :span="12">
                  <uix-checkbox
                    label="SPECIAL_VAT_INVOICE"
                    :disabled="method === 'view' || formDisable"
                    size="small">增值税专用发票</uix-checkbox>
                </uix-col>
                <uix-col :span="12">
                  <uix-checkbox
                    label="GENERAL_VAT_INVOICE"
                    :disabled="method === 'view' || formDisable"
                    size="small">增值税普通发票</uix-checkbox>
                </uix-col>
              </uix-checkbox-group>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="账期额度" required>
              <uix-col :span="20">
                <uix-input
                  :disabled="method === 'view' || formDisable"
                  v-model="paymentClause.billingPeriodQuota"
                  size="small"
                  style="width:100%"
                >
                </uix-input>
              </uix-col>
              <uix-col :span="4" class="text-center">
                元
              </uix-col>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row :gutter="20" class="m-b">
          <uix-col :span="8">
            <uix-form-item label="我方收款账号" required style="margin-bottom: 0px">
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="银行卡类型" required>
              <uix-select
                :disabled="method === 'view' || formDisable"
                v-model="paymentClause.saleOurBankVo.ourBankCardType"
                size="small"
                style="width:100%"
              >
                <uix-option
                  style="width:100%"
                  v-for="item in ourBankCardList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </uix-option>
              </uix-select>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="开户名" required>
              <uix-input
                :disabled="method === 'view' || formDisable"
                size="small"
                v-model="paymentClause.saleOurBankVo.ourAccountName"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="银行账号" required>
              <uix-input
                :disabled="method === 'view' || formDisable"
                size="small"
                v-model="paymentClause.saleOurBankVo.ourBankCardNumber"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="开户行名称" required>
              <uix-input
                :disabled="method === 'view' || formDisable"
                size="small"
                v-model="paymentClause.saleOurBankVo.ourBankName"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="开户支行名称" required>
              <uix-input
                :disabled="method === 'view' || formDisable"
                size="small"
                v-model="paymentClause.saleOurBankVo.ourBankBranchName"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row :gutter="20" class="m-b">
          <uix-col :span="4">
          </uix-col>
          <uix-col :span="8">
            <uix-form-item label="签约主体付款信息" required style="margin-bottom: 0px">
            </uix-form-item>
          </uix-col>
        </uix-row>

        <div v-for="(payInfoItem, key) in partnerSubjectPayInfo" :key="key" style="padding: 0px 20px">
          <uix-row :gutter="20" class="m-b">
            <uix-col :span="10">
              <uix-form-item :label="getPartnerSubjectName(key)" required style="margin-bottom: 0px">
                {{peerSubjectList[key].partnerSubjectName}}
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row :gutter="20" class="m-b">
            <uix-col :span="8">
              <uix-form-item label="签约主体付款账号" required style="margin-bottom: 0px">
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row>
            <uix-col :span="11">
              <uix-form-item label="开户名" required>
                <uix-input
                  :disabled="method === 'view' || formDisable"
                  size="small"
                  @focus="openPeerSubjectBank(key)"
                  v-model="payInfoItem.salePartnerBankVo.partnerAccountName"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :span="11">
              <uix-form-item label="银行卡类型" >
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.salePartnerBankVo.partnerBankCardTypeStr"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row>
            <uix-col :span="11">
              <uix-form-item label="银行账号">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.salePartnerBankVo.partnerBankCardNumber"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :span="11">
              <uix-form-item label="开户行名称">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.salePartnerBankVo.partnerBankName"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row>
            <uix-col :span="11">
              <uix-form-item label="开户支行名称">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.salePartnerBankVo.partnerBankBranchName"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row :gutter="20" class="m-b">
            <uix-col :span="8">
              <uix-form-item label="开票购货方信息" required style="margin-bottom: 0px">
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row>
            <uix-col :span="11">
              <uix-form-item label="公司名称">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.saleInvoiceInfoVo.invoiceCompanyName"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :span="11">
              <uix-form-item label="纳税人识别号">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.saleInvoiceInfoVo.invoiceTaxpayerNumber"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row>
            <uix-col :span="11">
              <uix-form-item label="地址">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.saleInvoiceInfoVo.invoiceCompanyAddress"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :span="11">
              <uix-form-item label="电话">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.saleInvoiceInfoVo.invoiceCompanyPhone"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>

          <uix-row>
            <uix-col :span="11">
              <uix-form-item label="开户行">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.saleInvoiceInfoVo.invoiceCompanyBankName"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :span="11">
              <uix-form-item label="账号">
                <uix-input
                  :disabled="true"
                  size="small"
                  v-model="payInfoItem.saleInvoiceInfoVo.invoiceCompanyAccount"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>
        </div>
      </uix-form>
    </div>
    <peer-subject-bank
      :partnerSubjectIds="partnerSubjectIds"
      @selectPeerSubjectBank="selectPeerSubjectBank"
      ref="peerSubjectBank"></peer-subject-bank>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

import peerSubjectBank from './model/peerSubjectBank.vue'

import {
  settlementTypeList,
  invoiceSequenceList,
  settlementTermList,
  paymentSettlementList,
  paymentClassList,
  invoiceTypeList,
  ourBankCardList
} from '../constans';

import {
  formDisableInterFace,
  peerSubjectListInterFace,
  partnerSubjectPayInfoInterFace
} from '../types'

@Component({
  name: 'paymentInfo',
  components: {
    peerSubjectBank
  }
})
export default class extends Vue {
  method: string = '';
  partnerSubjectIds: Array<number | string> = [];
  index: number = -1;

  @Prop()
  paymentClause: any;

  @Prop()
  peerSubjectList!: Array<peerSubjectListInterFace>;

  @Prop()
  partnerSubjectPayInfo!: Array<partnerSubjectPayInfoInterFace>;

  @Prop()
  formDisable!: formDisableInterFace;

  settlementTypeList = settlementTypeList;
  invoiceSequenceList = invoiceSequenceList;
  settlementTermList = settlementTermList;
  paymentSettlementList = paymentSettlementList;
  paymentClassList = paymentClassList;
  invoiceTypeList = invoiceTypeList;
  ourBankCardList = ourBankCardList;

  moment: any = moment;

  @Watch('peerSubjectList')
  peerSubjectListChange(newVal: any) {
    if (this.method !== 'view') {
      this.getPageBankInvoice(newVal);
    }
  }

  mounted() {
    const vm = this;
    vm.method = String(vm.$route.query.method);
  }

  getPageBankInvoice(newVal: any) {
    if (newVal && newVal.length > 0) {
      for (let i = 0; i < newVal.length; i++) {
        if (!this.partnerSubjectPayInfo[i]) {
          this.partnerSubjectPayInfo[i] = {
              salePartnerBankVo: {
                partnerBankCardType: '',
                partnerBankCardTypeStr: '',
                partnerAccountName: '',
                partnerBankCardNumber: '',
                partnerBankName: '',
                partnerBankBranchName: ''
              },
              saleInvoiceInfoVo: {
                invoiceCompanyName: '',
                invoiceTaxpayerNumber: '',
                invoiceCompanyPhone: '',
                invoiceCompanyBankName: '',
                invoiceCompanyAccount: '',
                invoiceCompanyAddress: ''
              }
          };
        }
      }
    }
  }
  

  addCustomCycle() {
    if (!this.paymentClause.saleSettlementCustomCycleVoList) {
      this.paymentClause.saleSettlementCustomCycleVoList = [];
    } else {
      // do nothing
    }
    if (this.paymentClause.saleSettlementCustomCycleVoList.length < 2) {
      this.paymentClause.saleSettlementCustomCycleVoList.push({
        beginDate: null,
        endDate: null
      });
      this.paymentClause.saleSettlementCustomCycleVoList[0].endDate = null;
      this.saleSettlementCustomCycleVoListChange();
    } else if (this.paymentClause.saleSettlementCustomCycleVoList.length >= 2) {
      let last2Index =
        this.paymentClause.saleSettlementCustomCycleVoList.length - 1;
      this.paymentClause.saleSettlementCustomCycleVoList.splice(last2Index, 0, {
        beginDate: null,
        endDate: null
      });
      this.saleSettlementCustomCycleVoListChange();
    } else {
      // do
    }
  }

  deleteCustomCycle() {
    if (this.paymentClause.saleSettlementCustomCycleVoList.length < 3) {
      this.paymentClause.saleSettlementCustomCycleVoList.pop();
      this.saleSettlementCustomCycleVoListChange();
    } else if (this.paymentClause.saleSettlementCustomCycleVoList.length >= 3) {
      let last2Index =
        this.paymentClause.saleSettlementCustomCycleVoList.length - 2;
      this.paymentClause.saleSettlementCustomCycleVoList.splice(last2Index, 1);
      this.saleSettlementCustomCycleVoListChange();
    } else {
      // do nothing
    }
  }

   openPeerSubjectBank(index: number) {
    const vm = this;
    if (!vm.peerSubjectList[index].partnerId) {
        vm.$notify.warning('请先选择合作方主体！');
        return;
    }

    vm.partnerSubjectIds = [Number(vm.peerSubjectList[index].partnerId)];
    vm.index = index;

    vm.$nextTick(() => {
      let peerSubjectBankRef: any = vm.$refs.peerSubjectBank;
      peerSubjectBankRef.showCreateDialog();
    });
  }

  selectPeerSubjectBank(item: any) {
    const vm = this;
    const index = vm.index;
    if(item) {
      let salePartnerBankVo: any = {};
      let saleInvoiceInfoVo: any = {};
      if (item.salePartnerBankVo) {
        salePartnerBankVo = JSON.parse(JSON.stringify(item.salePartnerBankVo));
        salePartnerBankVo.partnerBankCardTypeStr
            = salePartnerBankVo.partnerBankCardType === 'PUBLIC'
                ? '对公' : '对私';
      }
      if (item.saleInvoiceInfoVo) {
        saleInvoiceInfoVo = JSON.parse(JSON.stringify(item.saleInvoiceInfoVo));
      }

      Vue.set(vm.partnerSubjectPayInfo, index, {
        saleInvoiceInfoVo,
        salePartnerBankVo
      });
    }
  }

  saleSettlementCustomCycleVoListChange() {
    this.$emit('saleSettlementCustomCycleVoListChange');
  }

  getPartnerSubjectName(str1: number) {
    return '签约主体' + (str1 + 1) + ': ';
  }
}
</script>

<style lang="scss">
.sale-contract-payment-info {
  .text-center {
    text-align: center;
  }
}
</style>