<template>
  <div>
    <uix-dialog
      title="合作方签约主体"
      :visible.sync="createDialog"
      width="60%"
      style="min-width:400px"
      :destroy-on-close="true"
    >
      <uix-form size="small" label-position="top">
        <uix-row>
          <uix-col :sm="12">
            <uix-form-item label="合作方主体ID">
              <uix-input
                v-model="params.vendorCode"
                size="small"
                style="width:80%"
              ></uix-input>
            </uix-form-item>
          </uix-col>
          <uix-col :sm="12">
            <uix-form-item label="合作方主体名称">
              <uix-input
                v-model="params.vendorName"
                size="small"
                style="width:80%"
              ></uix-input>
            </uix-form-item>
          </uix-col>
        </uix-row>
        <uix-row :gutter="20" class="m-t-8">
          <uix-col :span="24" class="text-center">
            <uix-form-item>
              <uix-button :loading="loading" type="primary" @click="load(1)" size="small" class="w"
                >查询</uix-button
              >
              <uix-button :loading="loading" @click="reset" size="small" class="w"
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
          prop="vendorCode"
          label="合作方主体ID"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column
          prop="vendorName"
          label="合作方主体名称"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column prop="orgCode" label="营业执照号" min-width="120">
        </uix-table-column>

        <uix-table-column prop="contactName" label="联系人" min-width="120">
        </uix-table-column>

        <uix-table-column
          prop="contactTel"
          label="联系电话"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column
          prop="detailAddress"
          label="公司地址"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column prop="vendorAuthSuccess" label="供应商认证" min-width="120">
          <template slot-scope="scope">
            {{scope.row.vendorAuthSuccess?'是':'否'}}
          </template>
        </uix-table-column>

        <uix-table-column prop="contactAuthSuccess" label="供应商授权人认证" min-width="120">
          <template slot-scope="scope">
            {{scope.row.contactAuthSuccess?'是':'否'}}
          </template>
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
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
    pageSize: 20,
    totalPageCount: 0,
    totalCount: 0
  };
  choosenItem: any = {};
  params: any = {
    vendorCode: '',
    vendorName: ''
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
      pageNo: this.pagination.pageNo,
      pageSize: this.pagination.pageSize,
      vendorCode: this.params.vendorCode,
      vendorName: this.params.vendorName
    };

    appApi.qualifiedVendorList(reqData).then(({ data: { data, status } }) => {
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
    }).catch(error => {
      vm.loading = false;
    });
  }

  select(item: any) {
    this.choosenItem = item;
  }

  reset() {
    this.params.vendorCode = '';
    this.params.vendorName = '';
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

<style>
.text-right {
  text-align: right;
}
</style>
