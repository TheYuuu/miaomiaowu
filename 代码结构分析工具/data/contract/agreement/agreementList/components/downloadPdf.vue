<template>
  <div class="sale-contract-seal-model">
    <uix-dialog
      title="盖章附件下载"
      :visible.sync="showDialog"
      width="60%"
      style="min-width:400px"
      :destroy-on-close="true"
    >
      <uix-form :inline="false" size="small" label-position="left">
        <uix-row class="m-b">
          <uix-col :sm="5">
            贴码增值服务编号:
          </uix-col>
          <uix-col :sm="7">
            {{ contract.agreementCode }}
          </uix-col>
          <uix-col :sm="4">
            合同名称:
          </uix-col>
          <uix-col :sm="8">
            {{ contract.agreementName }}
          </uix-col>
        </uix-row>
      </uix-form>
      <div
        v-for="item in contract.attachmentList"
        :key="item.contractName"
      >
        <uix-row class="m-b">
          <uix-col :sm="4">
            <uix-button type="primary" @click="download(item)" size="mini">
              下 载
            </uix-button>
          </uix-col>
          <uix-col :sm="20">
            <a class="link" style="line-height:30px"
              :href="item.attachmentUrl" target="_blank">{{
              item.attachmentName
            }}</a>
          </uix-col>
        </uix-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <uix-button @click="showDialog = false" size="mini">
          取 消
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
import appApi from '../api';

@Component({
  name: 'downloadPdf'
})
export default class extends Vue {
  @Prop()
  contract: any;

  showDialog: boolean = false;

  show() {
    this.showDialog = true;
  }

  download(item: any) {
    window.open(item.attachmentBinUrl);
  }

  mounted() {}
}
</script>

<style lang="scss"></style>
