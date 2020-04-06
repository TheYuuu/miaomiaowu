<template>
  <div>
    <uix-dialog
      title="合作方主体"
      :visible.sync="createDialog"
      width="60%"
      style="min-width:400px"
      :destroy-on-close="true"
      @closed="handleClose"
    >
      <uix-form size="small" label-position="top">
        <uix-row>
          <uix-col :sm="12">
            <uix-form-item label="公司名称">
              <uix-input
                v-model="params.partnerSubjectName"
                size="small"
                style="width:80%"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :sm="12">
            <uix-form-item label="统一社会信用代码">
              <uix-input
                v-model="params.unifiedSocialCreditCode"
                size="small"
                style="width:80%"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>
        <uix-row :gutter="20" class="m-t-8">
          <uix-col :span="24" class="text-center">
            <uix-form-item>
              <uix-button type="primary" @click="load(1)" size="small" class="w" :loading="loading"
                >查询</uix-button
              >
              <uix-button @click="reset" size="small" class="w" :loading="loading"
                >重置</uix-button
              >
            </uix-form-item>
          </uix-col>
        </uix-row>
      </uix-form>
      <uix-table
        v-loading="loading"
        :data="tableList"
        style="width: 100%;margin-bottom: 10px"
        :highlight-current-row="true"
        @current-change="select"
      >
        <uix-table-column
          prop="partnerSubjectName"
          label="公司名称"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column
          prop="unifiedSocialCreditCode"
          label="统一社会信用代码"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column prop="contacts" label="法定代表人" min-width="120">
        </uix-table-column>

        <uix-table-column prop="contactPhone" label="联系电话" min-width="120">
        </uix-table-column>
      </uix-table>

      <uix-row>
        <uix-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNo"
          :page-size="pagination.pageSize"
          :total="pagination.totalCount"
          layout="prev, pager, next, total"
          style="float: right;"
        ></uix-pagination>      
      </uix-row>

      <span slot="footer" class="dialog-footer">
        <uix-button type="primary" @click="confirm" size="mini" :loading="loading">
          确 定
        </uix-button>
        <uix-button @click="createDialog = false" size="mini" :loading="loading">
          取 消
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import appApi from './api';

@Component({
  name: 'cooperationSubjectModal'
})
export default class extends Vue {
  tableList: any = [];
  createDialog: boolean = false;
  loading: boolean = false;
  pagination: any = {
    pageNo: 1,
    pageSize: 10,
    totalPageCount: 0,
    totalCount: 0
  };
  choosenItem: any = {};
  params: any = {
    partnerSubjectName: '',
    unifiedSocialCreditCode: ''
  };

  showCreateDialog() {
    this.reset();
    this.load();
    this.createDialog = true;
  }

  confirm() {
    this.$emit('selectPeerSubject', this.choosenItem);
    this.createDialog = false;
  }

  load(pageNo?: number) {
    const vm = this;
    vm.loading = true;

    let reqData = {
      pageNo: pageNo || this.pagination.pageNo,
      pageSize: this.pagination.pageSize,
      partnerSubjectName: this.params.partnerSubjectName,
      unifiedSocialCreditCode: this.params.unifiedSocialCreditCode
    };

    appApi.getCooperationsubject(reqData).then(({ data: { data, status } }) => {
      if (status) {
        vm.tableList = data.pageContent;

        vm.pagination.pageNo = data.page.currentPageNo;
        vm.pagination.pageSize = data.page.pageSize;
        vm.pagination.totalCount = data.page.totalCount;
        vm.pagination.totalPageCount = data.page.totalPageCount;

        vm.loading = false;
      } else {
        vm.loading = false;
      }
    }).catch(() => {
      vm.loading = false;
    });
  }

  select(item: any) {
    this.choosenItem = item;
  }

  reset() {
    this.params.partnerSubjectName = '';
    this.params.unifiedSocialCreditCode = '';
  }

  handleClose() {
    this.tableList = [];
  }

  handleSizeChange(size: number) {
    this.pagination.pageNo = 1;
    this.pagination.pageSize = size;

    this.load();
  }

  handleCurrentChange(current: number) {
    this.pagination.pageNo = current;
    this.load();
  }
}
</script>