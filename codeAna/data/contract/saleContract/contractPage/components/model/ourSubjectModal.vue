<template>
  <div>
    <uix-dialog
      title="我方主体"
      :visible.sync="createDialog"
      width="60%"
      style="min-width:400px"
      :destroy-on-close="true"
      @closed="handleClose"
    >
      <uix-table
        v-loading="loading"
        :data="tableList"
        style="width: 100%;margin-bottom: 10px"
        :highlight-current-row="true"
        @current-change="select"
      >
        <uix-table-column
          prop="subjectName"
          label="我方签约主体"
          min-width="120"
        >
        </uix-table-column>

        <uix-table-column prop="contact" label="我方联系人" min-width="120">
        </uix-table-column>

        <uix-table-column prop="phoneNo" label="联系电话" min-width="120">
        </uix-table-column>

        <uix-table-column prop="email" label="邮箱" min-width="120">
        </uix-table-column>

        <uix-table-column prop="address" label="联系地址" min-width="120">
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
        <uix-button type="primary" @click="confirm" size="mini">
          确 定
        </uix-button>
        <uix-button @click="createDialog = false" size="mini">
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
  name: 'ourSubjectModal'
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

  showCreateDialog() {
    this.load();
    this.createDialog = true;
  }

  confirm() {
    this.$emit('selectOurSubject', this.choosenItem);
    this.createDialog = false;
  }

  load(pageNo?: number) {
    const vm = this;
    vm.loading = true;

    let reqData = {
      pageNo: pageNo || this.pagination.pageNo,
      pageSize: this.pagination.pageSize
    };

    appApi.getOurSubject(reqData).then(({ data: { data, status } }) => {
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