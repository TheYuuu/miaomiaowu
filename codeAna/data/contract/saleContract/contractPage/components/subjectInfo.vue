<template>
  <div class="panel sale-contract-subject-info">
    <div class="panel-heading">我方签约主体(表示必填)</div>
    <div class="panel-body">
      <uix-form label-position="right" label-width="160px">
        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="我方签约主体" required>
              <uix-input
                size="small"
                v-model="subjectInfo.saleOurSubjectVo.subjectName"
                @focus="openSelectOurSubject"
                :disabled="method === 'view' || formDisable"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="我方联系人">
              <uix-input
                size="small"
                v-model="subjectInfo.saleOurSubjectVo.contact"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="联系电话">
              <uix-input
                size="small"
                v-model="subjectInfo.saleOurSubjectVo.phoneNo"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="邮箱">
              <uix-input
                size="small"
                v-model="subjectInfo.saleOurSubjectVo.email"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="联系地址">
              <uix-input
                size="small"
                v-model="subjectInfo.saleOurSubjectVo.address"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>
      </uix-form>
    </div>

    <div class="panel-heading">
      <span class="m-r-md">合作方签约主体(表示必填)</span>
      <uix-button
        type="primary"
        size="mini"
        @click="addPeer"
        v-if="method !== 'view'  && !formDisable"
      >增加</uix-button>
    </div>
    <div class="panel-body">
      <uix-form
        label-position="right"
        label-width="160px"
        v-for="(item, key) in peerSubjectList"
        :key="item.unifiedSocialCreditCode"
      >
        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="合作方签约主体公司名称" required>
              <uix-input
                size="small"
                v-model="item.partnerSubjectName"
                :disabled="method === 'view'  || formDisable"
                @focus="openCooperationSubject(key)"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="统一社会信用代码">
              <uix-input
                size="small"
                v-model="item.unifiedSocialCreditCode"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="法定代表人">
              <uix-input
                size="small"
                v-model="item.contacts"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :span="11">
            <uix-form-item label="联系电话">
              <uix-input
                size="small"
                v-model="item.contactPhone"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>

        <uix-row>
          <uix-col :span="11">
            <uix-form-item label="公司地址">
              <uix-input
                size="small"
                v-model="item.companyAddress"
                :disabled="true"
              ></uix-input>
            </uix-form-item>
          </uix-col>

          <uix-col :span="11" style="">
            <uix-form-item>
              <uix-button
                type="primary"
                plain
                size="mini"
                @click="deletePeer(key)"
                :disabled="peerSubjectList.length<=1"
                v-if="method !== 'view' && !formDisable"
              >删除</uix-button>
            </uix-form-item>
          </uix-col>
        </uix-row>
      </uix-form>
    </div>
    <our-subject-modal
      ref="ourSubjectModal"
      @selectOurSubject="selectOurSubject"
    ></our-subject-modal>
    <cooperation-subject-modal
      ref="cooperationSubjectModal"
      @selectPeerSubject="selectPeerSubject"
    >
    </cooperation-subject-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ourSubjectModal from './model/ourSubjectModal.vue';
import cooperationSubjectModal from './model/cooperationSubjectModal.vue';

import {
  subjectInfoInterFace,
  peerSubjectListInterFace,
  partnerSubjectPayInfoInterFace,
  formDisableInterFace
} from '../types'

@Component({
  name: 'subjectInfo',
  components: {
    ourSubjectModal,
    cooperationSubjectModal
  }
})
export default class extends Vue {
  method: string = '';
  peerSubjectIndex: number = 0;

  @Prop()
  subjectInfo!: subjectInfoInterFace;

  @Prop()
  peerSubjectList!: Array<peerSubjectListInterFace>;

  @Prop()
  partnerSubjectPayInfo!: Array<partnerSubjectPayInfoInterFace>;

  @Prop()
  formDisable!: formDisableInterFace;

  mounted() {
    const vm = this;
    vm.method = String(vm.$route.query.method);
  }

  selectOurSubject(item: any) {
    this.subjectInfo.saleOurSubjectVo = item;
  }

  selectPeerSubject(item: any) {
    Vue.set(this.peerSubjectList, this.peerSubjectIndex, item);
    this.$emit('selectPeerSubject', this.peerSubjectIndex);
  }

  openSelectOurSubject() {
    let ourSubjectModalRef: any = this.$refs.ourSubjectModal;
    ourSubjectModalRef.showCreateDialog();
  }

  openCooperationSubject(index: number) {
    this.peerSubjectIndex = index;
    let cooperationSubjectModalRef: any = this.$refs.cooperationSubjectModal;
    cooperationSubjectModalRef.showCreateDialog();
  }

  deletePeer(index: number) {
    const vm = this;
    vm.peerSubjectList.splice(index, 1);
    vm.partnerSubjectPayInfo.splice(index, 1);
  }

  addPeer() {
    const vm = this;
    if (!vm.peerSubjectList) {
        vm.peerSubjectList = [];
    }
    vm.peerSubjectList.push({
        partnerId: '',
        partnerSubjectName: '',
        unifiedSocialCreditCode: '',
        contacts: '',
        contactPhone: '',
        companyAddress: ''
    });
  }
}
</script>

<style lang="scss">
.sale-contract-subject-info {
  .text-center {
    text-align: center;
  }
}
</style>