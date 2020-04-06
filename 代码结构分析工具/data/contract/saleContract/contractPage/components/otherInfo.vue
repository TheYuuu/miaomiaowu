<template>
  <div class="panel sale-contract-other-info">
    <div class="panel-heading">其他约定与说明</div>
    <div class="panel-body">
      <uix-form>
        <uix-row>
          <uix-col :sm="24">
            <uix-form-item label="">
              <uix-input
                :disabled="method === 'view' || formDisable"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="otherInfo.remark"
              >
              </uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>
        <uix-row>
          <uix-col :sm="24">
            <uix-form-item>
              <uix-upload
                drag
                :disabled="method === 'view' || formDisable"
                accept=".pdf"
                size="mini"
                action="/klcss/sale/basic/w/uploadAttachmentNew"
                :http-request="uploadFn"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="handleBefore"
                :show-file-list="true"
                :file-list="otherInfo.saleAttachmentVoList"
                :on-preview="handlePreview"
              >
                <i class="uix-icon-upload"></i>
                <div class="uix-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="uix-upload__tip nessary necessary" slot="tip">
                  附件 仅支持PDF格式文件上传(<span class="necessary">表示必填</span> 仅限50M以内)
                </div>
              </uix-upload>
              <div>
              </div>
            </uix-form-item>
          </uix-col>
        </uix-row>
      </uix-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment'

import { download } from '@/utils/file';
import { upload } from '@/utils/file';

import {
  otherInfoInterFace,
  formDisableInterFace
} from '../types'

@Component({
  name: 'otherInfo'
})
export default class extends Vue {
  method: string = '';
  fileNameMap: any = {};
  moment = moment;
  uploadFn = upload;

  @Prop()
  otherInfo!: otherInfoInterFace;

  @Prop()
  formDisable!: formDisableInterFace;

  mounted() {
    const vm = this;
    vm.method = String(vm.$route.query.method);
  }

  handleRemove(file: any, fileList: any) {
    if (file.status === 'success') {
      // appApi.delAttachment({
      //   fileKey: file.fileKey
      // });

      this.otherInfo.saleAttachmentVoList = fileList.map((item: any) => {
        item.name = `${item.attachmentName} ${item.uploadName}-${item.uploadMis}-
          ${this.moment(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')}`;
        item.url = item.attachmentUrl;
        return item;
      });
      this.refreshFileNameMap();
    }
  }

  handleSuccess(response: any) {
    if (response.status) {
      this.otherInfo.saleAttachmentVoList.push({
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

  refreshFileNameMap() {
    const vm = this;
    vm.fileNameMap = {};
    vm.otherInfo.saleAttachmentVoList.forEach((item: any) => {
      vm.fileNameMap[item.attachmentName] = 1;
    });
  }

  handleBefore(file: any) {
    this.refreshFileNameMap();
    if (this.fileNameMap[file.name] === 1) {
      this.$notify.warning('该附件名已存在！');
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 50;
    if (!isLt10M) {
      this.$notify.warning('文件大小不能超过 50M ');
    }
    return isLt10M;
  }

  delAttachment(index: number) {
    const vm = this;
    vm.otherInfo.saleAttachmentVoList.splice(index, 1);
    vm.refreshFileNameMap();
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
}
</script>

<style scoped>
uix-upload uix-upload--text {
  width: 100%;
}
</style>
