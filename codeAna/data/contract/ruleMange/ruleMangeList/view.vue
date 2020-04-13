<template>
  <div class="rule-mange-page">
    <div class="page-title">条约规则管理</div>
    <uix-container> 
        <uix-main class="page-search">
        <uix-form size="small" label-position="top">
          <uix-row :gutter="20" class="m-b">
            <uix-col :sm="6">
              <uix-form-item label="规则编号">
                <uix-input v-model="params.id" size="small"></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="规则名称">
                <uix-input v-model="params.name" size="small"></uix-input>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="生效日期">
                <uix-date-picker
                  style="width:100%"
                  v-model="params.beginDate"
                  size="small"
                  :picker-options="beginDatePickerOptions"
                >
                </uix-date-picker>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6" class="btm">
              <uix-form-item>
                <uix-date-picker
                  style="width:100%"
                  v-model="params.endDate"
                  size="small"
                  :picker-options="endDatePickerOptions"
                >
                </uix-date-picker>
              </uix-form-item>
            </uix-col>
          </uix-row>
          <uix-row :gutter="20" class="m-b">
            <uix-col :sm="6">
              <uix-form-item label="状态">
                <uix-select
                  v-model="params.contractRuleStatus"
                  size="small"
                  style="width:100%"
                >
                <uix-option
                  v-for="item in options.contractRuleStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </uix-option>
              </uix-select>
              </uix-form-item>
            </uix-col>
            <uix-col :sm="6">
              <uix-form-item label="规则类型">
              <uix-select
                v-model="params.contractRuleType"
                size="small"
                style="width:100%"
              >
                <uix-option
                  style="width:100%"
                  v-for="item in options.contractRuleTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </uix-option>
              </uix-select>
              </uix-form-item>
            </uix-col>
          </uix-row>
          <uix-row :gutter="20" class="m-t-8">
            <uix-col :span="24" class="text-center">
              <uix-form-item>
                <uix-button type="primary" @click="load(1)" size="small" class="w">查询</uix-button>
                <uix-button @click="reset" size="small" class="w">重置</uix-button>
              </uix-form-item>
            </uix-col>
          </uix-row>
        </uix-form>
      </uix-main>
    </uix-container>
    <uix-container>
      <uix-main class="page-content">
        <uix-button type="default m-l-10" size="small" @click="createRule">
          新建规则版本
        </uix-button>
        <uix-table
          :data="tableData"
          style="width: 100%;margin-top: 20px"
          v-loading="loading"
        >
          <uix-table-column prop="id" label="规则编号" min-width="120">
          </uix-table-column>
          <uix-table-column prop="name" label="规则名称" min-width="120">
          </uix-table-column>
          <uix-table-column
            prop="contractRuleTypeStr"
            label="规则类型"
            width="135"
          >
          </uix-table-column>
          <uix-table-column prop="effectiveTime" label="生效时间" min-width="150">
            <template slot-scope="scope">
              <span> {{ moment(+scope.row.effectiveTime).format('YYYYMMDD') }}-{{ moment(+scope.row.expirationTime).format('YYYYMMDD') }}</span>
            </template>
          </uix-table-column>
          <uix-table-column label="实际生效时间" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.actualTimeRange.length===0">--</div>
              <div
                v-for="(time, index) in scope.row.actualTimeRange"
                :key="index + time.effectiveTime + time.expirationTime"
              >
                <span v-if="scope.row.actualTimeRange.length!==0"
                > {{ moment(+time.effectiveTime).format('YYYYMMDD') }}-{{ moment(+time.expirationTime).format('YYYYMMDD') }} </span>
              </div>
            </template>
          </uix-table-column>
          <uix-table-column prop="creator" label="创建人" min-width="120">
          </uix-table-column>
          <uix-table-column
            prop="createTime"
            label="创建时间"
            min-width="150"
          >
            <template slot-scope="scope">
              <span> {{ moment(+scope.row.createTime).format('YYYYMMDD HH:mm:ss') }} </span>
            </template>
          </uix-table-column>
          <uix-table-column
            prop="contractRuleStatusStr"
            label="状态"
            min-width="80"
          >
          </uix-table-column>
          <uix-table-column
            label="操作" min-width="232">
            <template slot-scope="scope">
              <uix-button size="mini"
                @click="showDetail(scope.row)">查看详情
              </uix-button>
              <uix-button
                size="mini"
                v-if="scope.row.contractRuleStatus === 'ENABLE'"
                @click="ruleOff(scope.row)">停用
              </uix-button>
              <uix-button size="mini"
                v-if="scope.row.contractRuleStatus === 'DISABLE'"
                @click="ruleOn(scope.row)">启用
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
    <rule-mange-dialogs ref="ruleMangeDialogs"></rule-mange-dialogs>
  </div>
</template>

<script>
import appApi from './api';
import { remote } from '@/utils/ipc';
import moment from 'moment'

import ruleMangeDialogs from './components/ruleMangeDialogs'

export default {
  components: {
      ruleMangeDialogs
  },
  mounted(){
      this.initData();
      this.load();
  },
  data: function() {
    return {
      beginDatePickerOptions: {
        disabledDate: this.beginDatePicker
      },
      endDatePickerOptions: {
        disabledDate: this.endDatePicker
      },
      loading: false,
      params: {
        name: '',
        beginDate: '',
        endDate: '',
        contractRuleStatus: null,
        id: '',
        contractRuleType: null
      },
      pagination: {
        pageNo: 1,
        pageSize: 20,
        totalCount: 0
      },
      options: {
          contractRuleStatusList: [{
            label: '全部'
          }, {
            value: 'ENABLE',
            label: '启用中'
          }, {
            value: 'DISABLE',
            label: '已停用'
          }],
          contractRuleTypeList: [{
            label: '全部'
          }, {
            value: 'PURCHASE_COMMON_CONTRACT_RULE',
            label: '采购常规合同规则'
          }, {
            value: 'PURCHASE_BRAND_CONTRACT_RULE',
            label: '采购商标合同规则'
          }]
      },
      tableData: []
    }
  },
  methods: {
    initData() {
      const vm = this;
      vm.params = {
        name: '',
        beginDate: '',
        endDate: '',
        contractRuleStatus: vm.options.contractRuleStatusList[0].value,
        id: '',
        contractRuleType: vm.options.contractRuleTypeList[0].value
      };
      vm.moment = moment;
      vm.pagination = {
        pageNo: 1,
        pageSize: 20,
        totalCount: 0
      };
    },
    load(pageNo) {
      const vm = this;
      vm.loading = true;

      vm.params.beginDate = vm.params.beginDate ? moment(vm.params.beginDate).format('YYYY-MM-DD') : '';
      vm.params.endDate = vm.params.endDate ? moment(vm.params.endDate).format('YYYY-MM-DD') : '';

      appApi.getRuleList({
        ...vm.params,
        pageNo: pageNo ? pageNo : this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      }).then(({data: {data, status}}) => {
        if (status) {
          vm.tableData = data.pageContent;
          vm.pagination.pageNo = data.page.currentPageNo;
          vm.pagination.pageSize = data.page.pageSize;
          vm.pagination.totalCount = data.page.totalCount;
          vm.pagination.totalPageCount = data.page.totalPageCount;

          if (vm.tableData && vm.tableData.length > 0) {
            vm.loading = 0;
            vm.tableData.forEach(item => {
                item.contractRuleTypeStr = vm.options.contractRuleTypeList.filter(
                filterItem => item.contractRuleType === filterItem.value)[0].label;
                item.contractRuleStatusStr = vm.options.contractRuleStatusList.filter(
                filterItem => item.contractRuleStatus === filterItem.value)[0].label;

                // item.effectiveTime = new Date(item.effectiveTime);
                // item.expirationTime = new Date(item.expirationTime);
                // item.createTime = new Date(item.createTime);
                // if (item.actualTimeRange && item.actualTimeRange.length > 0) {
                //   item.actualTimeRange.forEach(timeItem=>{
                //     timeItem.effectiveTime = new Date(timeItem.effectiveTime);
                //     timeItem.expireTime = new Date(timeItem.expireTime);
                //   })
                // }
            });
          }
          vm.loading = false;
        } else {
          vm.loading = false;
        }
      }).catch(()=>{
        vm.loading = false;
      })
    },
    reset() {
      const vm = this;
      vm.initData();
    },
    createRule() {
      const vm = this;
      vm.$refs.ruleMangeDialogs.showCreateDialog();
    },
    showDetail(item) {
      remote.$state.go('app.contract.saleRulePage', {
        id: item.id,
        method: 'view'
      });
    },
    ruleOff(item) {
      const vm = this;

      this.$confirm('确定停用该规则？', '提示', {
        customClass: 'contract-rule-mange-confirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'}).then(() => {
          vm.updateRuleStatus({
            id: item.id,
            updateStatus: 'DISABLE'
          });
        })
        .catch(_ => {});
    },
    ruleOn(item) {
      const vm = this;

      vm.$confirm('确定启用该规则？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
      .then(() => {
        vm.updateRuleStatus({
          id: item.id,
          updateStatus: 'ENABLE'
        });
      }).catch(_ => {});
    },
    updateRuleStatus(params) {
        appApi.updateRuleStatus(params).then(({data: {data, status, message}}) => {
          if (status) {
            this.$notify({
                title: '提示',
                message: message,
                type: 'success'
            });
            this.load();
          }
        })
    },
    handleSizeChange(size) {
      this.pagination.pageNo = 1;
      this.pagination.pageSize = size;

      this.load();
    },
    handleCurrentChange(current) {
      this.pagination.pageNo = current;

      this.load();
    },
    beginDatePicker(date) {
      if (this.params.endDate) {
        return +date > +this.params.endDate;
      }
      
    },
    endDatePicker(date) {
      if (this.params.beginDate) {
        return +date < +this.params.beginDate;
      }
    }
  }
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
<style>
.contract-rule-mange-confirm {
  vertical-align: baseline!important;
}
</style>