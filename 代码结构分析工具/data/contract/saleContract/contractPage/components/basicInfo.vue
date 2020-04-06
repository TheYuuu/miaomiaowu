<template>
  <div class="panel">
    <div class="panel-heading">基本信息(表示必填)</div>
    <div class="panel-body">
      <uix-form label-position="right" label-width="160px">
        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="制单人" required>
              <uix-input
                size="small"
                v-model="basicInfo.creatorName"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="申请日期" required>
              <uix-date-picker
                size="small"
                v-model="basicInfo.applyDate"
                :disabled="true"
                style="width:100%"
              ></uix-date-picker>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="事业部" required>
              <uix-input
                size="small"
                v-model="basicInfo.contractBuName"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="合同种类" required>
              <uix-input
                size="small"
                v-model="basicInfo.contractTypeStr"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="合同名称" required>
              <uix-input
                size="small"
                v-model="basicInfo.contractName"
                :disabled="method === 'view' || formDisable.contractName"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="合同类型" required>
              <uix-input
                size="small"
                v-model="basicInfo.contractSubTypeStr"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="合作方已盖章" required>
              <uix-radio
                v-model="basicInfo.sealed"
                :label="true"
                size="small"
                :disabled="method === 'view' || formDisable.sealed"
                >是</uix-radio
              >
              <uix-radio
                v-model="basicInfo.sealed"
                :label="false"
                size="small"
                :disabled="method === 'view' || formDisable.sealed"
                >否</uix-radio
              >
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="合同属性" required>
              <uix-select
                v-model="basicInfo.contractProperty"
                size="small"
                style="width:100%"
                :disabled="method === 'view' || formDisable.contractProperty"
              >
                <uix-option
                  style="width:100%"
                  v-for="item in contractPropertyList"
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
          <uix-form-item label="有效日期" required>
            <uix-col :sm="6">
              <uix-form-item>
                <uix-date-picker
                  type="date"
                  placeholder="选择日期"
                  align="center"
                  size="small"
                  v-model="basicInfo.effectiveTime"
                  :disabled="method === 'view' || formDisable.effectiveTime"
                  style="width: 100%;"
                  :picker-options="effectiveTimePickerOptions"
                ></uix-date-picker>
              </uix-form-item>
            </uix-col>
            <uix-col class="line text-center" :sm="1">-</uix-col>
            <uix-col :span="6">
              <uix-form-item>
                <uix-date-picker
                  placeholder="选择日期"
                  align="center"
                  size="small"
                  v-model="basicInfo.expirationTime"
                  :disabled="method === 'view' || formDisable.expirationTime"
                  style="width: 100%;"
                  :picker-options="expirationTimePickerOptions"
                ></uix-date-picker>
              </uix-form-item>
            </uix-col>
          </uix-form-item>
        </uix-row>
      </uix-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import {
  basicInfoInterFace,
  enumItem,
  formDisableInterFace
} from '../types'

@Component({
  name: 'basicInfo'
})
export default class extends Vue {
  method: string = '';

  contractPropertyList: Array<enumItem> = [
    {
      name: '我方合同',
      value: 'OUR_CONTRACT'
    },
    {
      name: '对方合同',
      value: 'PARTNER_CONTRACT'
    }
  ];

  @Prop()
  basicInfo!: basicInfoInterFace;

  @Prop()
  formDisable!: formDisableInterFace;

  @Prop()
  stopAgreementTimeLimit: any;

  @Prop()
  modifyAgreementTimeLimit: any;

  effectiveTimePickerOptions: any = {
    disabledDate: this.beginDatePicker
  };
  expirationTimePickerOptions: any = {
    disabledDate: this.endDatePicker
  };

  beginDatePicker(date: any) {
    if (this.modifyAgreementTimeLimitVal && this.basicInfo.expirationTime) {
      return !( (+this.modifyAgreementTimeLimitVal - 60 * 60 * 24 * 1000) < +date
        && +date < +this.basicInfo.expirationTime);
    } else if (this.basicInfo.expirationTime) {
      return +date > +this.basicInfo.expirationTime;
    }
  }

  endDatePicker(date: any) {
    if (this.stopAgreementTimeLimitVal && this.basicInfo.effectiveTime) {
      let beginLimit = (+new Date()  - 60 * 60 * 24 * 1000) > +this.basicInfo.effectiveTime
        ? (+new Date()  - 60 * 60 * 24 * 1000) : +this.basicInfo.effectiveTime;

      return !( (+this.stopAgreementTimeLimitVal) > +date && beginLimit < +date);
    } else if (this.basicInfo.effectiveTime) {
      return +date < +this.basicInfo.effectiveTime;
    }
  }

  get modifyAgreementTimeLimitVal() {
    return this.modifyAgreementTimeLimit;
  }

  get stopAgreementTimeLimitVal() {
    return this.stopAgreementTimeLimit;
  }

  getUser(): any {
    return this.$store.getters.user || {};
  }

  mounted() {
    const vm = this;
    vm.method = String(vm.$route.query.method);
  }
}
</script>