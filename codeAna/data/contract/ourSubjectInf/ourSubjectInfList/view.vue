<template>
  <div class="contract-ourSubjectInf-ourSubjectInfList-page">
    <div class="page-title">我方主体信息</div>
    <uix-container>
      <uix-main class="page-search">
        <uix-form size="small" label-position="top">
          <uix-row :gutter="20" class="m-b">
            <uix-col :sm="6">
              <uix-form-item label="主体名称">
                <uix-input
                  v-model="params.ourSubjectName"
                  size="small"
                ></uix-input>
              </uix-form-item>
            </uix-col>
          </uix-row>
          <uix-row :gutter="20" class="m-t-8">
            <uix-col :span="24" class="text-center">
              <uix-form-item>
                <uix-button
                  type="primary"
                  @click="load(1)"
                  size="small"
                  class="w"
                  >查询</uix-button
                >
              </uix-form-item>
            </uix-col>
          </uix-row>
        </uix-form>
      </uix-main>
    </uix-container>
    <uix-container>
      <uix-main class="page-content">
        <uix-button
          type="default m-l-10"
          icon="uix-icon-circle-plus"
          size="small"
          @click="createOurSubject"
        >
          新增我方主体
        </uix-button>
        <uix-table
          :data="tableData"
          style="width: 100%;margin-top: 20px"
          v-loading="loading"
        >
          <uix-table-column prop="ourSubjectId" label="ID" min-width="60">
          </uix-table-column>
          <uix-table-column
            prop="ourSubjectName"
            label="公司名称"
            min-width="120"
          >
          </uix-table-column>
          <uix-table-column
            prop="businessLicence"
            label="统一社会信用代码"
            min-width="170"
          >
          </uix-table-column>
          <uix-table-column prop="bankName" label="开户行" min-width="120">
          </uix-table-column>
          <uix-table-column prop="bankCardName" label="开户名" min-width="120">
          </uix-table-column>
          <uix-table-column prop="bankCardNo" label="账号" min-width="120">
          </uix-table-column>
          <uix-table-column
            prop="contactAddress"
            label="联系地址"
            min-width="120"
          >
          </uix-table-column>
          <uix-table-column prop="contactPhone" label="电话" min-width="120">
          </uix-table-column>
          <uix-table-column
            prop="legalPersonName"
            label="法人姓名"
            min-width="120"
          >
          </uix-table-column>
          <uix-table-column
            prop="legalPersonIdCard"
            label="法人身份证号"
            min-width="150"
          >
          </uix-table-column>
          <uix-table-column
            prop="legalPersonPhone"
            label="法人手机号"
            min-width="120"
          >
          </uix-table-column>
          <uix-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <uix-button size="mini" @click="edit(scope.row)"
                >修改
              </uix-button>
            </template>
          </uix-table-column>
        </uix-table>
        <uix-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNo"
          :page-size="pagination.pageSize"
          :page-sizes="[10]"
          :total="pagination.totalCount"
          layout="sizes, prev, pager, next, total"
        ></uix-pagination>
      </uix-main>
    </uix-container>
    <update-our-subject-dialog
      ref="updateOurSubjectDialog"
      @loadTable="load(1)"
    ></update-our-subject-dialog>
  </div>
</template>

<script lang="ts">
import ourSubjectInfList from './page';

export default ourSubjectInfList;
</script>

<style lang="scss">
.contract-ourSubjectInf-ourSubjectInfList-page {
  padding: 20px;
  .page-title {
    padding: 20px 0px;
    font-size: 24px;
    font-weight: 300;
    vertical-align: middle;
    background: none;
    border-bottom: none;
  }
  .page-search {
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 20px;
    padding-bottom: 0;
    .uix-form-item {
      .uix-input,
      .uix-select {
        width: 100%;
      }
    }
  }
  .page-content {
    background: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    &-operate {
      margin-bottom: 15px;
    }
    .uix-pagination {
      text-align: right;
      margin-top: 20px;
    }

    .uix-button {
      margin-right: 10px;
      + .uix-button {
        margin-left: 0;
      }
    }
  }

  .text-center {
    text-align: center;
  }

  .w {
    width: 150px;
  }

  .text-center {
    text-align: center;
  }

  .m-b {
    margin-bottom: 15px;
  }
}
</style>
