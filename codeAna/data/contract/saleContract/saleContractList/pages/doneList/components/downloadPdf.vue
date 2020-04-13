<template>
  <div class="sale-contract-download-model">
    <uix-dialog
      title="盖章附件下载"
      :visible.sync="showDialog"
      width="60%"
      style="min-width:400px"
      :destroy-on-close="true"
    >
      <uix-form :inline="false" size="small" label-position="left">
        <uix-row>
          <uix-col :sm="12">
            <uix-form-item label="合同编号:">
              <a href="javascript:;" class="link" @click="goToDetail(contract)">
                {{ contract.contractCode }}
              </a>
            </uix-form-item>
          </uix-col>
          <uix-col :sm="12">
            <uix-form-item label="合同名称:">
              {{ contract.contractName }}
            </uix-form-item>
          </uix-col>
        </uix-row>
        <uix-row>
          <div
            class="m-b"
            v-for="item in contract.bothSealedAttachmentList"
            :key="item.contractName"
          >
            <uix-button type="primary" @click="downloadFile(item)" size="mini" class="m-r-md">
              下 载
            </uix-button>
            <span class="m-r-md">{{
              item.attachmentName
            }}</span>
            <span v-if="item.uploadName && item.uploadMis && item.uploadTime">
              {{ item.uploadName }}-{{
                item.uploadMis
              }}-{{ moment(item.uploadTime).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </div>
        </uix-row>
      </uix-form>
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
import { download } from '@/utils/file';

import moment from 'moment';

@Component({
  name: 'downloadPdf'
})
export default class extends Vue {
  @Prop()
  contract: any;

  showDialog: boolean = false;

  moment = moment;

  show() {
    this.showDialog = true;
  }

  goToDetail(item: any) {
    window.open(
      `${window.location.origin}/app/contract/editSaleContract?id=${
        item.contractCode
      }&method=view&from=list`
    );
  }

  downloadFile(file: any) {
    download({
      url: '/klcss/sale/basic/r/downloadAttachmentNew',
      params: {
        fileKey: file.fileKey,
        attachmentName: file.attachmentName
      }
    });
  }
}
</script>

<style lang="scss"></style>
