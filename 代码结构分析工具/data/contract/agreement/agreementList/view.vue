<template>
  <div class="contract-agreement-agreementList-page">
    <div class="page-title m-b">
      贴码增值服务
      <div class="pull-right">
        <uix-button
          v-if="showPermission$.hasSysConfig"
          type="primary"
          size="small"
          @click="sysConfig"
        >
          系统配置
        </uix-button>

        <uix-button
          v-if="showPermission$.hasAddAgreement"
          type="primary"
          size="small"
          @click="addContract"
        >
          新增合同
        </uix-button>
      </div>
      </div>
      <uix-container>
        <uix-main class="page-search">
          <uix-form size="small" label-position="top">
            <uix-row :gutter="20" class="m-b">
              <uix-col :sm="6">
                <uix-form-item label="贴码增值服务编号">
                  <uix-input
                    v-model="params.agreementCode"
                    size="small"
                  ></uix-input>
                </uix-form-item>
              </uix-col>
              <uix-col :sm="6">
                <uix-form-item label="供应商名称">
                  <uix-input
                    v-model="params.vendorName"
                    size="small"
                  ></uix-input>
                </uix-form-item>
              </uix-col>
              <uix-col :sm="6">
                <uix-form-item label="供应商ID">
                  <uix-input
                    v-model="params.vendorCode"
                    size="small"
                  ></uix-input>
                </uix-form-item>
              </uix-col>
              <uix-col :sm="6" class="btm">
                <uix-form-item label="签约方式">
                  <uix-select
                    v-model="params.signType"
                    size="small"
                    style="width:100%"
                  >
                    <uix-option
                      style="width:100%"
                      v-for="item in signTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </uix-option>
                  </uix-select>
                </uix-form-item>
              </uix-col>
            </uix-row>
            <uix-row :gutter="20" class="m-b">
              <uix-col :sm="6">
                <uix-form-item label="签署状态">
                  <uix-select
                    v-model="params.signStatus"
                    size="small"
                    style="width:100%"
                  >
                    <uix-option
                      style="width:100%"
                      v-for="item in signStatusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </uix-option>
                  </uix-select>
                </uix-form-item>
              </uix-col>
                <uix-col :sm="12">
                <uix-form-item label="创建日期">
                  <uix-col :sm="12" style="padding-left: 0px;">
                    <uix-date-picker
                      v-model="params.createTimeStart"
                      size="small"
                      :picker-options="createTimeStartPickerOptions"
                    >
                    </uix-date-picker>
                  </uix-col>
                  <uix-col :sm="12" style="padding-right: 0px;">
                    <uix-date-picker
                      v-model="params.createTimeEnd"
                      size="small"
                      :picker-options="createTimeEndPickerOptions"
                    >
                    </uix-date-picker>
                  </uix-col>
                </uix-form-item>
              </uix-col>
            </uix-row>
            <uix-row :gutter="20" class="m-t-8">
              <uix-col :span="24" class="text-center">
                <uix-form-item>
                  <uix-button
                    :loading="loading"
                    type="primary"
                    @click="load(1)"
                    size="small"
                    class="w"
                    >查询</uix-button
                  >
                  <uix-button :loading="loading" @click="reset" size="small" class="w"
                    >重置</uix-button
                  >
                </uix-form-item>
              </uix-col>
            </uix-row>
          </uix-form>
        </uix-main>
      </uix-container>
      <uix-container>
        <uix-main class="page-content">
          <uix-table
            stripe
            :data="tableData"
            style="width: 100%;"
            v-loading="loading"
          >
            <uix-table-column
              prop="agreementCode"
              label="贴码增值服务编号"
              min-width="170"
            >
            </uix-table-column>


            <uix-table-column
              prop="agreementName"
              label="合同名称"
              min-width="170"
            >
            </uix-table-column>

            <uix-table-column
              prop="vendorName"
              label="供应商名称"
              min-width="170"
            >
            </uix-table-column>

            <uix-table-column
              prop="quotedPrice"
              label="条码单价（元/个）"
              min-width="170"
            >
            </uix-table-column>

            <uix-table-column
              prop="signTypeStr"
              label="签约方式"
              min-width="170"
            >
            </uix-table-column>

            <uix-table-column
              prop="createTime"
              label="创建时间"
              min-width="170"
            >
            <template slot-scope="scope">
              {{ scope.row.createTime 
                ? moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}
            </template>
            </uix-table-column>

            <uix-table-column
              prop="sealedTime"
              label="已盖章时间"
              min-width="170"
            >
            <template slot-scope="scope">
              {{ scope.row.sealedTime
                ? moment(scope.row.sealedTime).format('YYYY-MM-DD HH:mm:ss') : '' }}
            </template>
            </uix-table-column>

            <uix-table-column
              prop="signStatusStr"
              label="签署状态"
              min-width="170"
            >
            </uix-table-column>
            
            <uix-table-column label="操作" min-width="120">
              <template slot-scope="scope">
                <uix-button
                  class="m-b"
                  size="mini"
                  type="primary"
                  v-if="hasSealed(scope.row) && showPermission$.hasSeal"
                  @click="getSeal(scope.row)"
                >
                  盖章
                </uix-button>
                <uix-button
                  class="m-b"
                  type="primary"
                  size="mini"
                  v-if="hasdownload(scope.row) && showPermission$.hasDownload"
                  @click="download(scope.row)"
                >
                  下载
                </uix-button>
              </template>
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
        </uix-main>
      </uix-container>
      <seal-model ref="sealModel" :contract="myContract" @loadTable="load(1)"></seal-model>
      <download-pdf ref="downloadPdf" :contract="myContract"></download-pdf>
  </div>
</template>

<script lang="ts">
import agreementList from './page';

export default agreementList;
</script>

<style lang="scss">
.contract-agreement-agreementList-page {
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
