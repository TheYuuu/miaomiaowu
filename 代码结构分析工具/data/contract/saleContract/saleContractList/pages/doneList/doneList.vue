<template>
  <div class="sale-contract-done-list-page">
    <uix-container>
      <uix-main class="page-search">
        <uix-form size="small" label-position="top">
          <uix-row :gutter="20" class="m-b">
            <uix-col :sm="6">
              <uix-form-item label="合同编号">
                <uix-input
                  v-model="params.contractCode"
                  size="small"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="合同名称">
                <uix-input
                  v-model="params.contractName"
                  size="small"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="业务类型">
                <uix-select
                  v-model="params.contractType"
                  size="small"
                  style="width:100%"
                >
                  <uix-option
                    style="width:100%"
                    v-for="item in contractTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </uix-option>
                </uix-select>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6" class="btm">
              <uix-form-item label="合同类型">
                <uix-select
                  v-model="params.contractSubType"
                  size="small"
                  style="width:100%"
                >
                  <uix-option
                    style="width:100%"
                    v-for="item in contractSubTypeList[
                      params.contractType.value
                    ]"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </uix-option>
                </uix-select>
              </uix-form-item>
            </uix-col>
          </uix-row>
          <uix-row :gutter="20" class="m-b">
            <uix-col :sm="6">
              <uix-form-item label="我方主体名称">
                <uix-input
                  v-model="params.ourSubjectName"
                  size="small"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="合作方主体名称">
                <uix-input
                  v-model="params.partnerSubjectName"
                  size="small"
                ></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="签约类型">
                <uix-select
                  v-model="params.supplementaryTypes"
                  size="small"
                  style="width:100%"
                  multiple
                >
                  <uix-option
                    style="width:100%"
                    v-for="item in supplementaryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </uix-option>
                </uix-select>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6" class="btm">
              <uix-form-item label="是否盖章">
                <uix-select
                  v-model="params.bothSealed"
                  size="small"
                  style="width:100%"
                >
                  <uix-option
                    style="width:100%"
                    v-for="item in sealedList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </uix-option>
                </uix-select>
              </uix-form-item>
            </uix-col>
          </uix-row>
          <uix-row :gutter="20" class="m-b">
            <uix-col :sm="12">
              <uix-form-item label="有效期">
                <uix-col :sm="12" style="padding-left: 0px;">
                  <uix-date-picker
                    v-model="params.effectiveTimeStart"
                    size="small"
                    :picker-options="effectiveTimeStartPickerOptions"
                  >
                  </uix-date-picker>
                </uix-col>
                <uix-col :sm="12" style="padding-right: 0px;">
                  <uix-date-picker
                    v-model="params.expirationTimeEnd"
                    size="small"
                    :picker-options="expirationTimeEndPickerOptions"
                  >
                  </uix-date-picker>
                </uix-col>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="合同状态">
                <uix-select
                  v-model="params.contractStatus"
                  size="small"
                  style="width:100%"
                >
                  <uix-option
                    style="width:100%"
                    v-for="item in contractStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </uix-option>
                </uix-select>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="申请单号">
                <uix-input v-model="params.applyCode" size="small"></uix-input>
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
                <uix-button @click="reset" size="small" class="w"
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
            prop="contractCode"
            label="合同编号"
            min-width="170"
          >
          </uix-table-column>
          <uix-table-column prop="applyCode" label="申请单号" min-width="170">
          </uix-table-column>
          <uix-table-column
            prop="contractName"
            label="合同名称"
            min-width="120"
          >
          </uix-table-column>
          <uix-table-column label="业务类型" min-width="100">
            <template>
              <span>销售</span>
            </template>
          </uix-table-column>
          <uix-table-column
            prop="contractTypeStr"
            label="合同类型"
            min-width="120"
          >
          </uix-table-column>
          <uix-table-column
            prop="ourSubjectName"
            label="我方主体名称"
            min-width="120"
          >
          </uix-table-column>
          <uix-table-column label="合作方主体名称" min-width="120">
            <template slot-scope="scope">
              <div
                v-for="name in scope.row.partnerSubjectNameList"
                :key="name"
                class="text-nowrap"
              >
                {{ name }}
              </div>
            </template>
          </uix-table-column>
          <uix-table-column
            prop="supplementaryTypeStr"
            label="签约类型"
            min-width="100"
          >
          </uix-table-column>
          <uix-table-column label="是否盖章" min-width="100">
            <template slot-scope="scope">
              {{ scope.row.bothSealed ? '是' : '否' }}
            </template>
          </uix-table-column>
          <uix-table-column
            prop="contractStatusStr"
            label="合同状态"
            min-width="100"
          >
          </uix-table-column>
          <uix-table-column label="合同有效期" min-width="190">
            <template slot-scope="scope">
              {{ moment(+scope.row.effectiveTime).format('YYYY-MM-DD') }}
              至
              {{ moment(+scope.row.expirationTime).format('YYYY-MM-DD') }}
            </template>
          </uix-table-column>
          <uix-table-column label="操作" min-width="120">
            <template slot-scope="scope">
              <uix-button
                class="m-b-xs"
                size="mini"
                type="primary"
                v-if="!scope.row.bothSealed"
                @click="getSeal(scope.row)"
              >
                盖章
              </uix-button>
              <uix-button
                class="m-b-xs"
                size="mini"
                type="primary"
                v-if="scope.row.supplementaryType === 'NON_SUPPLEMENTARY'"
                @click="addAgreement(scope.row)"
              >
                补充协议
              </uix-button>
              <uix-button
                class="m-b-xs"
                size="mini"
                type="primary"
                v-if="!!scope.row.bothSealed"
                @click="download(scope.row)"
              >
                下载
              </uix-button>
              <uix-button type="primary" size="mini" @click="goToDetail(scope.row)">
                查看合同详情
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
    <seal-model :contract="myContract" ref="sealModel" @load-table="load(1)">
    </seal-model>
    <download-pdf :contract="myContract" ref="downloadPdf">
    </download-pdf>
    <add-agreement :contract="myContract" ref="addAgreement"></add-agreement>
  </div>
</template>

<script lang="ts">
import doneList from './page';
export default doneList;
</script>


<style lang="scss">
.sale-contract-done-list-page {
  .m-b {
    margin-bottom: 15px;
  }

  .m-r-md {
    margin-right: 10px;
  }
}
</style>
