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
        <uix-row>
          <uix-col :sm="24">
            <uix-form-item>
              <h5>
                上传双方已盖章的新增补充协议（限PDF格式）<span
                  class="text-danger text-xs"
                  >请谨慎操作！</span
                >
              </h5>
            </uix-form-item>
          </uix-col>
          <uix-col :sm="24">
            <uix-form-item>
              <uix-upload
                drag
                accept=".pdf"
                action="/klcss/agreement/file/w/upload"
                size="mini"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="handleBefore"
                :on-preview="handlePreview"
                :file-list= "attachmentDetails"
                :http-request="upload"
              >
                <i class="uix-icon-upload"></i>
                <div class="uix-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="uix-upload__tip" slot="tip">
                  请上传文件(仅限30M以内)
                </div>
              </uix-upload>
            </uix-form-item>
          </uix-col>
        </uix-row>
      </uix-form>
      <span slot="footer" class="dialog-footer">
        <uix-button @click="showDialog = false" size="mini"
          :loading="operateLoading">
          取 消
        </uix-button>
        <uix-button
          type="primary"
          @click="confim"
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
import { remote } from '@/utils/ipc';
import { upload } from '@/utils/file';

import appApi from '../api';

@Component({
  name: 'sealModel'
})
export default class extends Vue {
  @Prop()
  contract: any;
  upload: any = upload;

  showDialog: boolean = false;
  operateLoading: boolean = false;
  attachmentDetails: Array<any> = [];
  fileNameMap: any = {};

  confim() {
    const vm = this;
    let query = {
      agreementCode: vm.contract.agreementCode,
      attachmentVoList: vm.attachmentDetails.map((item)=>{
        return {
          attachmentName: item.attachmentName,
          mssFileName: item.mssFileName,
          attachmentType: item.attachmentType
        }
      }),
    };

    if (vm.attachmentDetails.length === 0) {
      vm.$notify.warning({
        title: '提示',
        message: '请上传附件'
      });
      return;
    }

    vm.operateLoading = true;
    appApi.dealSeal(query).then(
      ({ data: { status } }) => {
        if (status) {
          vm.$notify.success({
            title: '提示',
            message: '盖章成功'
          });
          vm.operateLoading = false;
          vm.showDialog = false;
          vm.$emit('loadTable');
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
      this.$notify.warning({
        title: '提示',
        message: '该附件名已存在！'
      });
      this.operateLoading = false;
      return false;
    }

    const isLt30M = file.size / 1024 / 1024 < 30;
    if (!isLt30M) {
      this.$notify.warning('文件大小不能超过 30M ');
      this.operateLoading = false;
    }
    return isLt30M;
  }

  handleRemove(file: any, fileList: any) {
    if (file.status === 'success') {
      this.attachmentDetails = fileList.map((item: any) => {
        return {
          name: item.attachmentName,
          url: item.attachmentUrl,
          attachmentName: item.attachmentName,
          mssFileName: item.mssFileName,
          attachmentUrl: item.attachmentUrl,
          attachmentType: item.attachmentType
        };
      });
      this.refreshFileNameMap();    
    }
  }

  handleSuccess(response: any) {
    this.operateLoading = false;
    if (response.status) {
      this.attachmentDetails.push({
      name: response.data.attachmentName,
      url: response.data.attachmentUrl,
      attachmentName: response.data.attachmentName,
      mssFileName: response.data.mssFileName,
      attachmentUrl: response.data.attachmentUrl,
      attachmentType: response.data.attachmentType
    });
      this.refreshFileNameMap();
    }
  }

  handleError() {
    this.operateLoading = false;
  }

  refreshFileNameMap() {
    const vm = this;
    vm.fileNameMap = {};
    vm.attachmentDetails.forEach(item => {
      vm.fileNameMap[item.attachmentName] = 1;
    });
  }

  handlePreview(file: any) {
    window.open(file.attachmentUrl);
  }

  closed() {
    this.attachmentDetails = [];
  }

  mounted() {}
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
