<template>
  <div class="sale-contract-seal-model">
    <uix-dialog
      title="盖章"
      :visible.sync="showDialog"
      width="60%"
      style="min-width:400px"
      :destroy-on-close="true"
      @closed="closed"
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
          <uix-col :sm="24">
            <uix-form-item>
              <h5>
                请上传双方已盖章的文件（限PDF格式）<span
                  class="text-danger text-xs"
                  >请谨慎操作！</span
                >
              </h5>
            </uix-form-item>
          </uix-col>
        </uix-row>
        <uix-row>
          <uix-col :sm="24">
            <uix-form-item>
              <uix-upload
                drag
                accept=".pdf"
                action="/klcss/sale/basic/w/uploadAttachmentNew"
                size="mini"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handldError"
                :before-upload="handleBefore"
                ref="uploader"
                :file-list= "attachmentDetails"
                :on-preview="handlePreview"
                :http-request="uploadFn"
              >
                <i class="uix-icon-upload"></i>
                <div class="uix-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="uix-upload__tip" slot="tip">
                  请上传文件(仅限50M以内)
                </div>
              </uix-upload>
            </uix-form-item>
          </uix-col>
        </uix-row>
      </uix-form>
      <span slot="footer" class="dialog-footer">
        <uix-button :loading="operateLoading" @click="showDialog = false" size="mini">
          取 消
        </uix-button>
        <uix-button
          type="primary"
          @click="confirm"
          size="mini"
          :loading="operateLoading"
        >
          确 定
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { upload, download } from '@/utils/file';
import appApi from '../api';

import moment from 'moment';

@Component({
  name: 'sealModel'
})
export default class extends Vue {
  @Prop()
  contract: any;

  showDialog: boolean = false;
  operateLoading: boolean = false;
  attachmentDetails: Array<any> = [];
  fileNameMap: any = {};
  uploadFn = upload;

  moment = moment;
  confirm() {
    const vm = this;

    if (vm.attachmentDetails.length === 0) {
      vm.$notify.warning('请上传附件');
      return;
    }

    let query = {
      contractCode: vm.contract.contractCode,
      saleAttachmentVoList: (vm.attachmentDetails || []).map(item => {
        return {
          fileKey: item.fileKey,
          contractCode: item.contractCode,
          attachmentName: item.attachmentName,
          attachmentUrl: item.attachmentUrl,
          attachmentType: 'BOTH_SEALED',
          uploadName: item.uploadName,
          uploadMis: item.uploadMis
        }
      })
    };

    vm.operateLoading = true;
    appApi.dealSeal(query).then(
      ({ data: { status } }) => {
        if (status) {
          vm.$notify.success('盖章成功');
          vm.operateLoading = false;
          vm.showDialog = false;
          vm.$emit('load-table');
        } else {
          vm.operateLoading = false;
        }
      },
      () => {
        vm.operateLoading = false;
      }
    );
  }

  show() {
    this.showDialog = true;
  }

  handleBefore(file: any) {
    this.refreshFileNameMap();
    this.operateLoading = true;

    if (this.fileNameMap[file.name] === 1) {
      this.$notify.warning('该附件名已存在！');
      this.operateLoading = false;
      return false;
    }

    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      this.operateLoading = false;
      this.$notify.warning('文件大小不能超过 50M ');
    }
    return isLt50M;
  }

  handleRemove(file: any, fileList: any) {
    if (file.status === 'success') {
      // appApi.delAttachment({
      //   fileKey: file.fileKey
      // });

      this.attachmentDetails = fileList.map((item: any) => {
        item.name = `${item.attachmentName} ${item.uploadName}-${item.uploadMis}-
          ${this.moment(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')}`;
        item.url = item.attachmentUrl;
        item.attachmentType = 'BOTH_SEALED'
        return item;
      });
      this.refreshFileNameMap();
    }
  }
  
  handleSuccess(response: any) {
    this.operateLoading = false;
    if (response.status) {
      this.attachmentDetails.push({
        contractCode: this.contract.contractCode,
        attachmentName: response.data.attachmentName,
        fileKey: response.data.fileKey,
        uploadMis: response.data.uploadMis,
        uploadName: response.data.uploadName,
        uploadTime: response.data.uploadTime,
        name: `${response.data.attachmentName} ${response.data.uploadName}
          -${response.data.uploadMis}-${this.moment(response.data.uploadTime).format('YYYY-MM-DD HH:mm:ss')}`
      });
      this.refreshFileNameMap();
    }
  }

  handldError() {
    this.operateLoading = false;
  }

  refreshFileNameMap() {
    const vm = this;
    vm.fileNameMap = {};
    vm.attachmentDetails.forEach(item => {
      vm.fileNameMap[item.attachmentName] = 1;
    });
  }

  goToDetail(item: any) {
    window.open(
      `${window.location.origin}/app/contract/editSaleContract?id=${
        item.contractCode
      }&method=view&from=list`
    );
  }

  handlePreview(file: any) {
    download({
      url: '/klcss/sale/basic/r/downloadAttachmentNew',
      params: {
        fileKey: file.fileKey,
        attachmentName: file.attachmentName
      }
    });
  }

  closed() {
    this.attachmentDetails = [];
    let uploader: any = this.$refs.uploader;
    uploader.clearFiles();
  }
}
</script>

<style lang="scss">
.sale-contract-seal-model {
  .uix-upload-dragger,
  .uix-upload--text {
    width: 100%;
  }
}
</style>
