<template>
  <div>
    <uix-dialog 
      title="白名单列表"
      :visible.sync="dialog"
      width="60%"
      :before-close="handleClose"
      style="min-width:400px"
    >
    <uix-form size="small" label-position="left">
        <uix-row>
          <uix-col :span="16">
            <uix-form-item label="供应商编号">
              <uix-col :span="14">
                <uix-input size="small" v-model="params.vendorCode"></uix-input>
              </uix-col>
            </uix-form-item>
          </uix-col>
        </uix-row>
        <uix-table
          :data="tableData"
          style="width: 100%;margin-bottom:20px"
          size="mini"
          v-loading="loading"
        >
          <uix-table-column
            prop="vendorName"
            label="供应商名称">
          </uix-table-column>
          <uix-table-column
            prop="vendorCode"
            label="供应商编号">
          </uix-table-column>
        </uix-table>
        <uix-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNo"
          :page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.totalCount"
          layout="sizes, prev, pager, next, total"
        ></uix-pagination>
    </uix-form>
      <span slot="footer" class="dialog-footer">
        <uix-button type="primary" @click="search(1)" size="mini" class="w">查询</uix-button>
        <uix-button @click="closeDialog" size="mini">
          取 消
        </uix-button>
      </span>
    </uix-dialog>
  </div>
</template>

<script>
import appApi from '../api';

export default {
  name: 'saleRulePageDialogs',
  props: {
    whitelistImportRecordId: ''
  },
  mounted() {
    this.initData();
  },
  data: function() {
    return {
      loading: false,
      params: {
        vendorCode: ''
      },
      tableData: [],
      dialog: false,
      pagination : {
        pageNo: 1,
        pageSize: 20,
        totalCount: 0
      }
    }
  },
  methods: {
    initData () {
      this.search();
    },
    search(pageNo) {
      const vm = this;
      vm.loading = true;
      if (vm.whitelistImportRecordId === '') {
        vm.loading = false;
        return ;
      }
      appApi.getPageWhiteList({
        ...vm.params,
        whitelistImportRecordId: vm.whitelistImportRecordId,
        pageNo: pageNo ? pageNo : this.pagination.pageNo,
        pageSize: vm.pagination.pageSize
      }).then(({data: {data, status}})=>{
        if (status) {
          vm.loading = false;
          vm.tableData = data.pageContent;
          vm.pagination.pageNo = data.page.currentPageNo;
          vm.pagination.pageSize = data.page.pageSize;
          vm.pagination.totalCount = data.page.totalCount;
          vm.pagination.totalPageCount = data.page.totalPageCount;
        }

      });
    },
    showDialog() {
      this.dialog = true;
      this.search();
    },
    closeDialog() {
      this.dialog = false;
      this.params.vendorCode = '';
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
        this.params.vendorCode = '';
      })
      .catch(_ => {});
    },
    handleSizeChange(size) {
      this.pagination.pageNo = 1;
      this.pagination.pageSize = size;

      this.search();
    },
    handleCurrentChange(current) {
      this.pagination.pageNo = current;

      this.search();
    }
  }
};
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}

.uix-pagination {
    text-align: right; 
}
</style>
