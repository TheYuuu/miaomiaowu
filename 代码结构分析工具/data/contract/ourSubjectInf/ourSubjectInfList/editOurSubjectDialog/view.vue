<template>
  <div class="contract-ourSubjectInf-updateOurSubjectDialog-page">
    <uix-dialog
      :title="pageTitle"
      :visible.sync="showOurSubjectDialog"
      width="50%"
      style="min-width:400px"
      :before-close="handleClose"
    >
      <uix-form
        size="small"
        label-position="right"
        label-width="140px"
        ref="ourSubjectInfForm"
        :model="params"
        :rules="rules"
      >
        <uix-form-item label="我方主体编号" required prop="ourSubjectId">
          <uix-input
            v-model="params.ourSubjectId"
            :disabled="type === 'UPDATE'"
            maxlength="8"
          ></uix-input>
        </uix-form-item>

        <uix-form-item label="公司名称" required prop="ourSubjectName">
          <uix-input
            v-model.trim="params.ourSubjectName"
            maxlength="20"
            minlength="2"
          ></uix-input>
        </uix-form-item>

        <uix-form-item label="统一社会信用代码" required prop="businessLicence">
          <uix-input
            v-model.trim="params.businessLicence"
            maxlength="18"
            minlength="18"
          ></uix-input>
        </uix-form-item>

        <uix-form-item label="开户行" required prop="bankName">
          <uix-input v-model.trim="params.bankName" maxlength="50"></uix-input>
        </uix-form-item>

        <uix-form-item label="开户名" required prop="bankCardName">
          <uix-input v-model.trim="params.bankCardName"></uix-input>
        </uix-form-item>

        <uix-form-item label="账号" required prop="bankCardNo">
          <uix-input
            v-model.trim="params.bankCardNo"
            maxlength="30"
            minlength="5"
          ></uix-input>
        </uix-form-item>

        <uix-form-item
          label="联系地址"
          required
          prop="contactAddress"
          :rules="[{ required: true, message: '联系地址不能为空' }]"
        >
          <uix-input v-model="params.contactAddress" maxlength="50"></uix-input>
        </uix-form-item>

        <uix-form-item label="电话" required prop="contactPhone">
          <uix-input
            v-model="params.contactPhone"
            maxlength="20"
            minlength="6"
          ></uix-input>
        </uix-form-item>

        <uix-row class="m-b">
          <uix-checkbox
            v-model="params.isLegalPersonExist"
            @change="isLegalPersonExistChange"
            >法人信息</uix-checkbox
          >
        </uix-row>

        <uix-form-item label="法人姓名" required prop="legalPersonName">
          <uix-input
            v-model.trim="params.legalPersonName"
            :disabled="!params.isLegalPersonExist"
            maxlength="8"
            minlength="2"
          ></uix-input>
        </uix-form-item>

        <uix-form-item label="法人身份证号" required prop="legalPersonIdCard">
          <uix-input
            v-model.trim="params.legalPersonIdCard"
            :disabled="!params.isLegalPersonExist"
            maxlength="18"
            minlength="18"
          ></uix-input>
        </uix-form-item>

        <uix-form-item label="法人手机号码" required prop="legalPersonPhone">
          <uix-input
            v-model.trim="params.legalPersonPhone"
            :disabled="!params.isLegalPersonExist"
            maxlength="11"
          ></uix-input>
        </uix-form-item>
      </uix-form>
      <span slot="footer" class="dialog-footer">
        <uix-button
          type="primary"
          @click="confirm"
          size="mini"
          :loading="loading"
        >
          确 定
        </uix-button>
        <uix-button @click="cancle" size="mini">
          取 消
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script lang="ts">
import updateOurSubjectDialog from './page';

export default updateOurSubjectDialog;
</script>

<style lang="scss"></style>
