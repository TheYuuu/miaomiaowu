<template>
  <div class="rule-mange-con-page">
    <div class="page-title">
      <uix-row>
        <span class="m-r">条约规则管理</span>
        <span v-if="$route.params.method !== 'view'">
          <uix-input style="width:130px" v-model="copyId" size="mini" class="m-r"
            placeholder="请输入规则编号"></uix-input>
          <uix-button size="mini" type="primary" @click="copyInf">复 制</uix-button>
        </span>
      </uix-row>
    </div>
      <uix-container>
        <uix-main class="page-content">
          <uix-form size="small" label-position="left" label-width="auto" ref="ruleForm" :model="params">
            <div class="form-wrapper m-b-lg">
              <uix-form-item label="规则类型">
                <uix-col :sm="13">
                  <uix-input :disabled="true" v-model="params.contractRuleTypeStr"></uix-input>
                </uix-col>
              </uix-form-item>

              <uix-form-item label="规则编号">
                <uix-col :sm="13">
                  <uix-input size="small" :disabled="true" placeholder="保存后自动生成" v-model="params.id"></uix-input>
                </uix-col>
              </uix-form-item>
                
              <uix-form-item label="规则名称" required prop="name"
                :rules="[
                  { required: true, message: '规则名称不能为空'},
                ]"
              >
                <uix-col :sm="13">
                  <uix-input size="small" v-model="params.name" maxlength="20" show-word-limit
                    :disabled="$route.params.method === 'view'"></uix-input>
                </uix-col>
              </uix-form-item>
                
              <uix-form-item label="规则描述" required prop="description"
                :rules="[
                  { required: true, message: '规则描述不能为空'},
                ]"
              >
                <uix-col :sm="13">
                  <uix-input size="small" type="textarea"  v-model="params.description" maxlength="200" show-word-limit
                    :disabled="$route.params.method === 'view'"></uix-input>
                </uix-col>
              </uix-form-item>

              <uix-form-item label="规则生效时间" required>
                <uix-col :sm="6">
                  <uix-form-item prop="effectiveTime"
                    :rules="[
                      { required: true, message: '规则生效开始时间不能为空'},
                    ]"
                  >
                    <uix-date-picker type="date" placeholder="选择日期" align="center" v-model="params.effectiveTime" style="width: 100%;"
                      :picker-options="beginDatePickerOptions"
                      :disabled="$route.params.method === 'view'"></uix-date-picker>
                  </uix-form-item>
                </uix-col>
                <uix-col class="line text-center" :sm="1">至</uix-col>
                <uix-col :span="6">
                  <uix-form-item prop="expirationTime"
                    :rules="[
                      { required: true, message: '规则生效结束时间不能为空'},
                    ]"
                  >
                    <uix-date-picker placeholder="选择日期" align="center" v-model="params.expirationTime" style="width: 100%;"
                      :picker-options="endDatePickerOptions"
                      :disabled="$route.params.method === 'view'"></uix-date-picker>
                  </uix-form-item>
                </uix-col>
              </uix-form-item>
            </div>

            <transition name="uix-fade-in-linear">
              <div class="form-wrapper m-b-lg" v-if="ruleArr[0].ruleName.value">
                <uix-form-item label="账期条约规则" required>
                  <uix-button size="mini" @click="addList(params.accountPeriodRuleVoList, accountPeriodOptions, 'account')"
                    :disabled="$route.params.method === 'view'">
                    新增明细
                  </uix-button>
                </uix-form-item>
                <uix-form :model="params" ref="accountPeriodRuleForm">
                  <uix-table
                    border
                    class="ruel-table"
                    :data="params.accountPeriodRuleVoList"
                    style="width: 100%;margin-bottom: 15px;"
                    size="mini"
                  >
                    <transition name="uix-fade-in-linear">
                      <uix-table-column label="一级类目" min-width="200" 
                        v-if="ruleArr[0].dimension[0].value"
                      >
                        <template slot-scope="scope">
                          <uix-form-item :prop="'accountPeriodRuleVoList.' + scope.$index + '.cat1'"
                            :rules="[
                              { required: true, message: '一级类目不能为空'},
                            ]"
                          >
                            <uix-select
                              :disabled="$route.params.method === 'view'"
                              v-model="scope.row.cat1"
                              value-key="cat1Id"
                              size="mini"
                              style="width:100%"
                              filterable
                              clearable
                              :data-cat="scope.row.cat1"
                              @focus="cat1QuerySearch(accountPeriodOptions[scope.$index])"
                              :loading="accountPeriodOptions[scope.$index].loading"
                              @change="cat1Change(scope.row)"
                              placeholder="请选择一级类目"
                            >
                              <uix-option
                                v-for="item in accountPeriodOptions[scope.$index].cat1List"
                                :key="item.cat1Id"
                                :label="item.cat1Name"
                                :value="item"
                              >
                              </uix-option>
                            </uix-select>
                          </uix-form-item>
                        </template>
                      </uix-table-column>
                    </transition>

                    <transition name="uix-fade-in-linear">
                      <uix-table-column label="二级类目" min-width="200" 
                        v-if="ruleArr[0].dimension[1].value"
                      >
                      <template slot-scope="scope">
                        <uix-form-item :prop="'accountPeriodRuleVoList.' + scope.$index + '.cat2'"
                          :rules="[
                            { required: true, message: '二级类目不能为空'},
                          ]"
                        >
                          <uix-select
                            :disabled="$route.params.method === 'view'"
                            v-model="scope.row.cat2"
                            value-key="cat2Id"
                            size="mini"
                            style="width:100%"
                            filterable
                            reserve-keyword
                            @focus="cat2QuerySearch(scope.row, accountPeriodOptions[scope.$index])"
                            :loading="accountPeriodOptions[scope.$index].loading"
                            clearable
                            @change="cat2Change(scope.row)"
                            placeholder="请选择二级类目"
                          >
                            <uix-option
                              v-for="item in accountPeriodOptions[scope.$index].cat2List"
                              :key="item.cat2Id"
                              :label="item.cat2Name"
                              :value="item"
                            >
                            </uix-option>
                          </uix-select>
                        </uix-form-item>
                      </template>
                      </uix-table-column>
                    </transition>

                    <transition name="uix-fade-in-linear">
                      <uix-table-column label="品牌" min-width="200" 
                        v-if="ruleArr[0].dimension[2].value"
                      >
                        <template slot-scope="scope">
                          <uix-form-item :prop="'accountPeriodRuleVoList.' + scope.$index + '.brand'"
                            :rules="[
                              { required: true, message: '品牌不能为空'},
                            ]"
                          >
                            <uix-select
                              :disabled="$route.params.method === 'view'"
                              v-model="scope.row.brand"
                              value-key="brandId"
                              size="mini"
                              style="width:100%"
                              filterable
                              remote
                              reserve-keyword
                              :remote-method="brandQuerySearch(scope.row, accountPeriodOptions[scope.$index])"
                              :loading="accountPeriodOptions[scope.$index].loading"
                              placeholder="请输入品牌查询"
                              clearable
                              @visible-change="brandVChange($event, scope.row, scope.$index+'accountBrandSelect')"
                              :id="scope.$index+'accountBrandSelect'"
                            >
                              <uix-option
                                v-for="item in accountPeriodOptions[scope.$index].brandList"
                                :key="item.brandId"
                                :label="item.brandName"
                                :value="item"
                              >
                              </uix-option>
                            </uix-select>
                          </uix-form-item>
                        </template>
                      </uix-table-column>
                    </transition>

                    <uix-table-column label="结算类型" min-width="200" >
                      <template slot-scope="scope">
                        <uix-form-item :prop="'accountPeriodRuleVoList.' + scope.$index + '.settlementType'"
                          :rules="[
                            { required: true, message: '结算类型不能为空'},
                          ]"
                        >
                          <uix-select
                            :disabled="$route.params.method === 'view'"
                            v-model="scope.row.settlementType"
                            size="mini"
                            style="width:100%"
                            placeholder="请选择结算类型"
                          >
                            <uix-option
                              v-for="item in saleRulePageEnum.settlementTypeList"
                              :key="item.value"
                              :label="item.label"
                              :value="item"
                            >
                            </uix-option>
                          </uix-select>
                        </uix-form-item>
                      </template>
                    </uix-table-column>

                    <uix-table-column label="账期规则" min-width="320" >
                      <template slot-scope="scope">
                        <uix-form-item :prop="'accountPeriodRuleVoList.' + scope.$index + '.settlementTerm'"
                          :rules="[
                            { required: true, message: '结算类型不能为空'},
                          ]"
                        >
                        发票审核后(T)+
                        <uix-input-number
                          :disabled="$route.params.method === 'view'"
                          size="mini"
                          v-model="scope.row.settlementTerm"
                          style="width:100px"
                          controls-position="right"
                          :min="0" :max="999"
                          :precision="0"
                        ></uix-input-number>
                        工作日支付 或
                        </uix-form-item>
                      </template>
                    </uix-table-column>

                    <uix-table-column label="承票天数规则" min-width="200" >
                      <template slot-scope="scope">
                        <uix-form-item :prop="'accountPeriodRuleVoList.' + scope.$index + '.draftTerm'"
                          :rules="[
                            { required: true, message: '结算类型不能为空'},
                          ]"
                        >
                          大于等于
                          <uix-input-number
                            :disabled="$route.params.method === 'view'"
                            size="mini"  
                            v-model="scope.row.draftTerm" 
                            style="width:100px" 
                            controls-position="right"
                            :min="0" :max="999"
                            :precision="0"></uix-input-number>
                          天
                        </uix-form-item>
                      </template>
                    </uix-table-column>

                    <uix-table-column width="80" fixed="right" label="操作" >
                      <template slot-scope="scope">
                        <uix-form-item>
                          <uix-button size="mini" @click="deleteList(params.accountPeriodRuleVoList, accountPeriodOptions,scope.$index)"
                            :disabled="params.accountPeriodRuleVoList.length===1 || $route.params.method === 'view'"
                          >
                            <em class="uix-icon-delete"></em>
                          </uix-button>
                        </uix-form-item>
                      </template>
                    </uix-table-column>
                  </uix-table>
                </uix-form>
              </div>
            </transition>

            <transition name="uix-fade-in-linear">
              <div class="form-wrapper m-b-lg" v-if="ruleArr[1].ruleName.value">
                <uix-form-item label="商业折扣返利条约规则" required>
                  <uix-button size="mini" @click="addList(params.commercialDiscountRebateRuleVoList, commercialDiscountRebateOptions)"
                    :disabled="$route.params.method === 'view'">
                    新增明细
                  </uix-button>
                </uix-form-item>
                <uix-form :model="params" ref="commercialDiscountRebateRuleForm">
                  <uix-table
                    border
                    class="ruel-table"
                    :data="params.commercialDiscountRebateRuleVoList"
                    style="width: 100%;margin-bottom: 15px;"
                    size="mini"
                  >
                    <uix-table-column label="一级类目" min-width="200" 
                      v-if="ruleArr[1].dimension[0].value"
                    >
                      <template slot-scope="scope">
                        <uix-form-item :prop="'commercialDiscountRebateRuleVoList.' + scope.$index + '.cat1'"
                          :rules="[
                            { required: true, message: '一级类目不能为空'},
                          ]"
                        >
                          <uix-select
                            :disabled="$route.params.method === 'view'"
                            v-model="scope.row.cat1"
                            value-key="cat1Id"
                            size="mini"
                            style="width:100%"
                            filterable
                            reserve-keyword
                            placeholder="请选择一级类目"
                            @focus="cat1QuerySearch(commercialDiscountRebateOptions[scope.$index])"
                            :loading="commercialDiscountRebateOptions[scope.$index].loading"
                            clearable
                            @change="cat1Change(scope.row)"
                          >
                            <uix-option
                              v-for="item in commercialDiscountRebateOptions[scope.$index].cat1List"
                              :key="item.cat1Id"
                              :label="item.cat1Name"
                              :value="item"
                            >
                            </uix-option>
                          </uix-select>
                          </uix-form-item>
                      </template>
                    </uix-table-column>

                    <uix-table-column label="二级类目" min-width="200" 
                      v-if="ruleArr[1].dimension[1].value"
                    >
                      <template slot-scope="scope">
                        <uix-form-item :prop="'commercialDiscountRebateRuleVoList.' + scope.$index + '.cat2'"
                          :rules="[
                            { required: true, message: '二级类目不能为空'},
                          ]"
                        >
                          <uix-select
                            :disabled="$route.params.method === 'view'"
                            v-model="scope.row.cat2"
                            value-key="cat2Id"
                            size="mini"
                            style="width:100%"
                            filterable
                            reserve-keyword
                            placeholder="请选择二级类目"
                            @focus="cat2QuerySearch(scope.row, commercialDiscountRebateOptions[scope.$index])"
                            :loading="commercialDiscountRebateOptions[scope.$index].loading"
                            clearable
                            @change="cat2Change(scope.row)"
                          >
                          <uix-option
                            v-for="item in commercialDiscountRebateOptions[scope.$index].cat2List"
                            :key="item.cat2Id"
                            :label="item.cat2Name"
                            :value="item"
                          >
                          </uix-option>
                        </uix-select>
                        </uix-form-item>
                      </template>
                    </uix-table-column>

                    <uix-table-column label="品牌" min-width="200" 
                      v-if="ruleArr[1].dimension[2].value"
                    >
                      <template slot-scope="scope">
                          <uix-form-item :prop="'commercialDiscountRebateRuleVoList.' + scope.$index + '.brand'"
                            :rules="[
                              { required: true, message: '品牌不能为空'},
                            ]"
                          >
                            <uix-select
                              :disabled="$route.params.method === 'view'"
                              v-model="scope.row.brand"
                              value-key="brandId"
                              size="mini"
                              style="width:100%"
                              filterable
                              remote
                              reserve-keyword
                              :remote-method="brandQuerySearch(scope.row, commercialDiscountRebateOptions[scope.$index])"
                              :loading="commercialDiscountRebateOptions[scope.$index].loading"
                              placeholder="请输入品牌查询"
                              clearable
                              @visible-change="brandVChange($event, scope.row, scope.$index+'commercialBrandSelect')"
                              :id="scope.$index+'commercialBrandSelect'"
                            >
                              <uix-option
                                v-for="item in commercialDiscountRebateOptions[scope.$index].brandList"
                                :key="item.brandId"
                                :label="item.brandName"
                                :value="item"
                              >
                              </uix-option>
                            </uix-select>
                          </uix-form-item>
                      </template>
                    </uix-table-column>

                    <uix-table-column label="返利比例规则" min-width="150" max-width="300">
                      <template slot-scope="scope">
                        <uix-form-item :prop="'commercialDiscountRebateRuleVoList.' + scope.$index + '.discountRebateRate'"
                          :rules="[
                            { required: true, message: '返利比例规则不能为空'},
                          ]"
                        >
                          <uix-input-number
                            :disabled="$route.params.method === 'view'"
                            size="mini"
                            v-model="scope.row.discountRebateRate"
                            style="width:80px"
                            :min="0" :max="100"
                            :controls="false"
                            :precision="2"
                            >
                          </uix-input-number>%
                        </uix-form-item>
                      </template>
                    </uix-table-column>

                    <uix-table-column width="80" fixed="right" label="操作" >
                      <template slot-scope="scope">
                        <uix-button size="mini" @click="deleteList(params.commercialDiscountRebateRuleVoList, commercialDiscountRebateOptions,scope.$index)"
                          :disabled="params.commercialDiscountRebateRuleVoList.length===1 || $route.params.method === 'view'"
                        >
                          <em class="uix-icon-delete"></em>
                        </uix-button>
                        <!-- <uix-form-item>
                          <uix-button size="mini" @click="deleteList(params.commercialDiscountRebateRuleVoList, commercialDiscountRebateOptions,scope.$index)"
                            :disabled="params.commercialDiscountRebateRuleVoList.length===1 || $route.params.method === 'view'"
                          >
                            <em class="uix-icon-delete"></em>
                          </uix-button>
                        </uix-form-item> -->
                      </template>
                    </uix-table-column>
                  </uix-table>
                </uix-form>  

              </div>
            </transition>

            <transition name="uix-fade-in-linear">
              <div class="form-wrapper m-b-lg" v-if="ruleArr[2].ruleName.value">
                <uix-form-item label="保证金条约规则" required>
                  <uix-col :sm="13">
                    <uix-radio :disabled="$route.params.method === 'view'">同一供应商只需一份保证金合同（包括待生效、生效中、已到期和 已终止）</uix-radio>
                  </uix-col>
                </uix-form-item>
              </div> 
            </transition>

            <transition name="uix-fade-in-linear">
              <div class="form-wrapper m-b-lg" v-if="ruleArr[3].ruleName.value">
                <uix-form-item label="规则白名单" required>
                  <uix-col :sm="13">
                    <uix-upload
                      :disabled="$route.params.method === 'view'"
                      style="display: inline-block;margin-right: 10px;"
                      accept=".xls,.xlsx"
                      size="mini"
                      class="upload-demo"
                      action="/klcss/purchase/rule/whitelist/w/uploadWhiteList"
                      ref="whiteListUploader"
                      :show-file-list="false"
                      :on-success="uploadWhiteList"
                      :before-upload="beforeExcelUpload"
                    >
                      <uix-button size="mini" type="primary" :disabled="$route.params.method === 'view'">导入供应商</uix-button>
                    </uix-upload>
                    <uix-button size="mini" @click="showWhiteList" :disabled="params.whitelistImportRecordId===''">查看白名单</uix-button>
                    <uix-button size="mini" @click="downloadTemplate" >下载模板</uix-button>
                  </uix-col>
                </uix-form-item>
                <uix-form-item>
                  <uix-col :sm="24">
                    <span class="grey-text">注：白名单中的供应商不遵守以上规则，重复导入将直接覆盖！</span>
                  </uix-col>
                </uix-form-item>
                <uix-form-item label="白名单适用规则">
                  <uix-col :sm="24">
                    <span v-for="(item,index) in params.whitelistRuleList" 
                      :key="item.name"
                      class="m-r">
                      <uix-checkbox 
                        :disabled="$route.params.method === 'view'"
                        v-model="item.value"
                        v-if="ruleArr[index].ruleName.value"
                      >{{item.text}}</uix-checkbox>
                    </span>
                  </uix-col>
                </uix-form-item>
              </div>
            </transition>

            <uix-form-item> 
              <uix-col :sm="24">
                  <uix-button type="primary" size="small" class="w" @click="submit" 
                    v-if="$route.params.method !== 'view'">发 布</uix-button>
                  <uix-button size="small" class="w" @click="back('是否确认取消？')"
                    v-if="$route.params.method !== 'view'">取 消</uix-button>
                  <uix-button size="small" class="w" @click="back()"
                    v-if="$route.params.method === 'view'">返 回</uix-button>
              </uix-col>
            </uix-form-item>
            <hr>
            <div class="form-wrapper m-b-lg">
              <uix-row :gutter="20" class="m-b">
                <uix-col :sm="4">
                  <div class="label text-left">
                    规则定义
                  </div>
                </uix-col>
              </uix-row>
              <uix-table
                :data="ruleArr"
                style="width: 100%;padding: 0 30px;"
                border
                size="mini"
              >
                <uix-table-column label="条约规则" width="300">
                  <template slot-scope="scope">
                    <uix-checkbox v-model="scope.row.ruleName.value" text-color="#000000" :disabled="$route.params.method === 'view'">{{scope.row.ruleName.text}}</uix-checkbox>
                  </template>
                </uix-table-column>
                <uix-table-column label="规则维度">
                  <template slot-scope="scope">
                    <uix-checkbox 
                      v-for="item in scope.row.dimension" 
                      :key="scope.row.ruleName.text + item.text"
                      v-model="item.value"
                      :disabled="!scope.row.ruleName.value || $route.params.method === 'view'" 
                      @change="ruleChane(scope.row, item)"
                    >{{item.text}}</uix-checkbox>
                  </template>
                </uix-table-column>
              </uix-table>
            </div>
          </uix-form>
        </uix-main>
      </uix-container>
    <sale-rule-page-dialogs 
      ref="saleRulePageDialogs"
      :whitelistImportRecordId="params.whitelistImportRecordId"
    ></sale-rule-page-dialogs>
  </div> 
</template>

<script>
import * as saleRulePageEnum from './saleRulePageEnum'
import saleRulePageDialogs from './components/saleRulePageDialogs'
import api from './api'
import { remote } from '@/utils/ipc';

export default {
  components: {
    saleRulePageDialogs
  },
  data() {
    return {
      copyId: '',
      beginDatePickerOptions: {
        disabledDate: this.beginDatePicker
      },
      endDatePickerOptions: {
        disabledDate: this.endDatePicker
      },
      draftTerm:123,
      accountPeriodOptions: [{
        loading: false,
        brandList: [{
          brandName: '全部',
          brandId: ''
        }],
        cat1List: [],
        cat2List: [{
          cat2Name: '全部',
          cat2Id: ''
        }]
      }],
      commercialDiscountRebateOptions: [{
        loading: false,
        brandList: [{
          brandName: '全部',
          brandId: ''
        }],
        cat1List: [],
        cat2List: [{
          cat2Name: '全部',
          cat2Id: ''
        }]
      }],
      params: {
        whitelistRuleList: [{
          name: 'ACCOUNT_PERIOD_RULE',
          text: '账期条约规则',
          value: true
        }, {
          name: 'COMMERCIAL_DISCOUNT_REBATE_RULE',
          text: '商业折扣返利条约规则',
          value: true
        }, {
          name: 'DEPOSIT_RULE',
          text: '保证金条约规则',
          value: true
        }],
        name: '',
        description: '',
        contractRuleType: '',
        effectiveTime: '',
        expirationTime: '',
        accountPeriodRuleDimension: '',
        accountPeriodRuleVoList: [{
          brand: {
            brandName: '全部',
            brandId: ''
          },
          cat1: '',
          cat2: {
            cat2Name: '全部',
            cat2Id: ''
          },
          settlementType: {
            label: '后付款-周期结',
            value: 'POSTPAID_CYCLE'
          }
        }],
      commercialDiscountRebateRuleVoList: [{
          brand: {
            brandName: '全部',
            brandId: ''
          },
          cat1: '',
          cat2: {
            cat2Name: '全部',
            cat2Id: ''
          }
        }],
        whitelistImportRecordId: ''
      },
      ruleArr: [{
        ruleName: {
          text: '账期条约规则',
          value: false
        },
        dimension: [{
          text: '一级类目',
          value: false
        }, {
          text: '二级类目',
          value: false
        }, {
          text: '品牌',
          value: false
        }]
      }, {
        ruleName: {
          text: '商业折扣返利条约规则',
          value: false
        },
        dimension: [{
          text: '一级类目',
          value: false
        }, {
          text: '二级类目',
          value: false
        }, {
          text: '品牌',
          value: false
        }]
      }, {
        ruleName: {
          text: '保证金条约规则',
          value: false
        },
      }, {
        ruleName: {
          text: '规则白名单',
          value: false
        }
      }]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const vm = this;
      vm.saleRulePageEnum = saleRulePageEnum;

      // 处理规则类型
      vm.params.contractRuleTypeStr = vm.params.contractRuleType ? vm.params.contractRuleType
        : vm.$route.params.contractRuleType === 'PURCHASE_COMMON_CONTRACT_RULE' ? '采购常规合同规则' : '采购商标合同规则';

      vm.params.contractRuleType = vm.$route.params.contractRuleType;
      if (vm.$route.params.method === 'view') {
        api.getRuleDetail({
          id: this.$route.query.id,
          contractRuleType: vm.$route.params.contractRuleType
        }).then(({data: {data, status}}) => {
          if (status) {
            let tempData = data;
            // 列表值 初始化
            if (tempData.accountPeriodRuleVoList && tempData.accountPeriodRuleVoList.length > 0) {
              tempData.accountPeriodRuleVoList.forEach((ruleItem, index) => {
                ruleItem.brand = {
                  brandId: ruleItem.brandId === 0 ? '' : ruleItem.brandId,
                  brandName: ruleItem.brandId === 0 ? '全部' : ruleItem.brandName
                };
                ruleItem.cat1 = {
                  cat1Id: ruleItem.cat1Id,
                  cat1Name: ruleItem.cat1Name
                };
                ruleItem.cat2 = {
                  cat2Id: ruleItem.cat2Id === 0 ? '' : ruleItem.cat2Id,
                  cat2Name: ruleItem.cat2Id === 0 ? '全部' : ruleItem.cat2Name
                };

                ruleItem.settlementType = saleRulePageEnum.settlementTypeList.filter(type => type.value === ruleItem.settlementType)[0];

                vm.accountPeriodOptions[index] = {
                  loading: false,
                  brandList: [{
                    brandName: '全部',
                    brandId: ''
                  }, {
                    brandId: ruleItem.brandId,
                    brandName: ruleItem.brandName
                  }],
                  cat1List: [{
                    cat1Id: ruleItem.cat1Id,
                    cat1Name: ruleItem.cat1Name
                  }],
                  cat2List: [{
                    cat2Name: '全部',
                    cat2Id: ''
                  }, {
                    cat2Id: ruleItem.cat2Id,
                    cat2Name: ruleItem.cat2Name
                  }]
                };
              });
            }
            if (tempData.commercialDiscountRebateRuleVoList && tempData.commercialDiscountRebateRuleVoList.length > 0) {
              tempData.commercialDiscountRebateRuleVoList.forEach((ruleItem, index) => {
                ruleItem.brand = {
                  brandId: ruleItem.brandId === 0 ? '' : ruleItem.brandId,
                  brandName: ruleItem.brandId === 0 ? '全部' : ruleItem.brandName
                };
                ruleItem.cat1 = {
                  cat1Id: ruleItem.cat1Id,
                  cat1Name: ruleItem.cat1Name
                };
                ruleItem.cat2 = {
                  cat2Id: ruleItem.cat2Id === 0 ? '' : ruleItem.cat2Id,
                  cat2Name: ruleItem.cat2Id === 0 ? '全部' : ruleItem.cat2Name
                };

                vm.commercialDiscountRebateOptions[index] = {
                  loading: false,
                  brandList: [{
                    brandName: '全部',
                    brandId: ''
                  }, {
                    brandId: ruleItem.brandId,
                    brandName: ruleItem.brandName
                  }],
                  cat1List: [{
                    cat1Id: ruleItem.cat1Id,
                    cat1Name: ruleItem.cat1Name
                  }],
                  cat2List: [{
                    cat2Name: '全部',
                    cat2Id: ''
                  }, {
                    cat2Id: ruleItem.cat2Id,
                    cat2Name: ruleItem.cat2Name
                  }]
                };
              });
            }
            // 白名单规则处理
            tempData.contractRuleTypeStr = tempData.contractRuleType === 'PURCHASE_COMMON_CONTRACT_RULE' ? '采购常规合同规则' : '采购商标合同规则';
            if (!tempData.whitelistRuleList || tempData.whitelistRuleList.length === 0 || !tempData.hasWhiteListRule) {
              vm.ruleArr[3].ruleName.value = false;
            } else {
              vm.ruleArr[3].ruleName.value = true;
            }
            let whitelistRuleListMap =  {
              'ACCOUNT_PERIOD_RULE': {
                name: 'ACCOUNT_PERIOD_RULE',
                text: '账期条约规则',
                value: false
              }, 
              'COMMERCIAL_DISCOUNT_REBATE_RULE': {
                name: 'COMMERCIAL_DISCOUNT_REBATE_RULE',
                text: '商业折扣返利条约规则',
                value: false
              },
              'DEPOSIT_RULE': {
                name: 'DEPOSIT_RULE',
                text: '保证金条约规则',
                value: false
            }};
            for (let i = 0;i < tempData.whitelistRuleList.length; i++) {
              whitelistRuleListMap[tempData.whitelistRuleList[i]].value = true;
            }
            tempData.whitelistRuleList = [
              whitelistRuleListMap['ACCOUNT_PERIOD_RULE'],
              whitelistRuleListMap['COMMERCIAL_DISCOUNT_REBATE_RULE'],
              whitelistRuleListMap['DEPOSIT_RULE']
            ];

            // 规则维度替换
            vm.handleRules(tempData.accountPeriodRuleDimension, vm.ruleArr[0]);
            vm.handleRules(tempData.commercialDiscountRebateRuleDimension, vm.ruleArr[1]);

            // 保证金规则
            vm.ruleArr[2].ruleName.value = tempData.hasDepositRule;
            vm.params = tempData;
          }
        });
      }
      vm.$forceUpdate();
    },
    handleRules(ruleName, obj) {
      switch(ruleName) {
        case 'NO_RULE':
          obj.ruleName.value = false;
          obj.dimension[0].value = false;
          obj.dimension[1].value = false;
          obj.dimension[2].value = false;
          break;
        case 'EMPTY_DIMENSION':
          obj.ruleName.value = true;
          obj.dimension[0].value = false;
          obj.dimension[1].value = false;
          obj.dimension[2].value = false;
          break;
        case 'CAT1_DIMENSION':
          obj.ruleName.value = true;
          obj.dimension[0].value = true;
          obj.dimension[1].value = false;
          obj.dimension[2].value = false;
          break;
        case 'CAT2_DIMENSION':
          obj.ruleName.value = true;
          obj.dimension[0].value = true;
          obj.dimension[1].value = true;
          obj.dimension[2].value = false;
          break;
        case 'BRAND_DIMENSION':
          obj.ruleName.value = true;
          obj.dimension[0].value = true;
          obj.dimension[1].value = true;
          obj.dimension[2].value = true;
          break;
        default:
          // nothing
      }
    },
    showWhiteList() {
      this.$refs.saleRulePageDialogs.showDialog();
    },
    addList(list, options, type) {
      if (!list) {
        list = [];
      }

      if (type === 'account') {
        list.push({
          brand: {
            brandName: '全部',
            brandId: ''
          },
          cat1: '',
          cat2: {
            cat2Name: '全部',
            cat2Id: ''
          },
          settlementType:   {
            label: '后付款-周期结',
            value: 'POSTPAID_CYCLE'
          }
        });
      } else {
        list.push({
          brand: {
            brandName: '全部',
            brandId: ''
          },
          cat1: '',
          cat2: {
            cat2Name: '全部',
            cat2Id: ''
          }
        });
      }
      options.push({
        loading: false,
        brandList: [{
          brandName: '全部',
          brandId: ''
        }],
        cat1List: [],
        cat2List: [{
          cat2Name: '全部',
          cat2Id: ''
        }]
      });
    },
    deleteList(list, options, index) {
      if (index > -1 && index < list.length) {
        list.splice(index, 1);
        options.splice(index, 1);
      }
    },
    brandQuerySearch(item, option) {
      const vm = this;
      return function(query) {
        if (!item.cat2 || !item.cat2.cat2Id) {
          vm.$notify({
            type: 'warning',
            message: '请选择二级类目！'
          });
          option.brandList = [{brandName: '全部', brandId: ''}]
          return;
        }
        option.loading = true;
        api.queryBrand({
          brandName: query
        }).then(({data: {data, status}}) => {
          if (status) {
            option.brandList = [{brandName: '全部', brandId: ''}].concat(data.map(brandItem => {
              return {
                brandId: brandItem.id,
                brandName: brandItem.name
              }
            }));
            option.loading = false;
          }
        });
      }
    },
    brandVChange(val, item, str) {
      if (val && item.brand.brandName === '全部') {
        this.$nextTick(function () {
          document.getElementById(str).placeholder = "请输入品牌查询";
        });
      }
    },
    cat2QuerySearch(parent, option) {
      const vm = this;
      if (!parent.cat1 || !parent.cat1.cat1Id) {
        vm.$notify({
            type: 'warning',
            message: '请选择一级类目！'
        });
        option.cat2List = [{cat2Name: '全部', cat2Id: ''}];
        return;
      }
      option.loading = true;
      api.queryCat({
        parentId: parent.cat1.cat1Id
      }).then(({data: {data, status}}) => {
        if (status) {
          option.cat2List = [{cat2Name: '全部', cat2Id: ''}].concat(data.map(item => {
            return {
              cat2Id: item.id,
              cat2Name: item.name
            }
          }));
          option.loading = false;
        }
      });
    },
    cat1QuerySearch(option) {
      option.loading = true;
      api.queryCat({
        parentId: 0
      }).then(({data: {data, status}}) => {
        if (status) {
          option.cat1List = data.map(item => {
            return {
              cat1Id: item.id,
              cat1Name: item.name
            }
          });
          option.loading = false;
        }
      });
    },
    cat1Change(item) {
      item.cat2 = '';
      item.brand = '';
    },
    cat2Change(item) {
      item.brand = '';
    },
    uploadWhiteList(data) {
      if (data && data.status) {
        this.params.whitelistImportRecordId = data.data;
        this.$notify({
            type: 'success',
            message: data.message
        });
      } else {
        this.$notify({
          type: 'error',
          message: data.message
      });
      }
    },
    uploadFileError(err) {
      this.$notify({
          type: 'error',
          message: err
      });
    },
    beforeExcelUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
          this.$notify({ type: 'warning', message: '文件大小不能超过 10M ' });
      }
      return isLt10M;
    },
    downloadTemplate() {
      api.getWhiteListTemplate();
    },
    back(message) {
      if (message) {
        this.$confirm(message, '提示', {
          customClass: 'contract-rule-mange-confirm',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}).then(() => {
            remote.$state.go('app.contract.ruleMangeList');
          })
          .catch(() => {});
      } else {
        remote.$state.go('app.contract.ruleMangeList');
      }

    },
    submit() {
      this.$confirm('是否确认发布？', '提示', {
        customClass: 'contract-rule-mange-confirm',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'}).then(() => {
          this.pipeOn();
        })
        .catch(() => {});
    },
    pipeOn() {
      let flag = true;
      this.AsyncFuns(flag).pipe(
        this.checkMain,
        this.checkAccountPeriodRuleForm,
        this.checkCommercialDiscountRebateRuleForm,
        this.handle,
        this.checkData,
        this.sendData
      )
    },
    checkMain(flag) {
      return new Promise((resolve) => {
        this.$refs['ruleForm'].validate((valid) => {
          resolve(flag && !!valid);
        });
      });
    },
    checkAccountPeriodRuleForm(flag) {
      const vm = this;
      return new Promise((resolve) => {
        if (vm.ruleArr[0].ruleName.value) {
          this.$refs['accountPeriodRuleForm'].validate((valid) => {
            resolve(flag && !!valid);
          });
        } else {
          resolve(flag);
        }
      });
    },
    checkCommercialDiscountRebateRuleForm(flag) {
      const vm = this;
        return new Promise((resolve) => {
          if (vm.ruleArr[1].ruleName.value) {
            this.$refs['commercialDiscountRebateRuleForm'].validate((valid) => {
            resolve(flag && !!valid);
          });
          } else {
            resolve(flag);
          }
      });
    },
    checkData(data) {
      if (!data) {
        return data;
      }
      let ischeck = true;

      if(!this.ruleArr[0].ruleName.value && !this.ruleArr[1].ruleName.value
        && !this.ruleArr[2].ruleName.value) {
          setTimeout(() => {
            this.$notify({
              title: '提示',
              message: '至少需要选择一个条约规则才能发布！',
              type: 'warning'
            });
          });
          ischeck = false;
      }
      // 类目品牌不重复
      let reMap = {};
      let tempList = this.ruleArr[0].ruleName.value ? data.accountPeriodRuleVoList : [];
      for (let i = 0; i < tempList.length; i++) {
        let key = 'cat1Id' + String(tempList[i].cat1Id) + 'cat2Id' + String(tempList[i].cat2Id) + 'brandId' + String(tempList[i].brandId);
        let message = `${tempList[i].cat1Name || '全部'}-${tempList[i].cat2Name || '全部'}-${tempList[i].brandName || '全部'} 账期条约规则重复，请修改后再提交`;
        if (reMap[key] === 1) {
          setTimeout(() => {
            this.$notify({
              title: '提示',
              message: message,
              type: 'warning'
            });
          }, 0);
          ischeck = false;
        }
        reMap[key] = 1;
      }

      tempList = this.ruleArr[1].ruleName.value ? data.commercialDiscountRebateRuleVoList : [];
      reMap = {};
      for (let i = 0; i < tempList.length; i++) {
        let key = 'cat1Id' + String(tempList[i].cat1Id) + 'cat2Id' + String(tempList[i].cat2Id) + 'brandId' + String(tempList[i].brandId);
        let message = `${tempList[i].cat1Name || '全部'}-${tempList[i].cat2Name || '全部'}-${tempList[i].brandName || '全部'} 商业折扣返利条约规则重复，请修改后再提交`;
        if (reMap[key] === 1) {
          setTimeout(() => {
            this.$notify({
              title: '提示',
              message: message,
              type: 'warning'
            });
          }, 0);
          ischeck = false;
        }
        reMap[key] = 1;
      }

      // 白名单供应商文件
      if (this.ruleArr[3].ruleName.value && !data.whitelistImportRecordId) {
        setTimeout(() => {
          this.$notify({
            title: '提示',
            message: '白名单规则无供应商编号！',
            type: 'warning'
          });
        }, 0);
        ischeck = false;
      }
      // 白名单列表
      if (this.ruleArr[3].ruleName.value && data.whitelistRuleList.length === 0) {
        setTimeout(() => {
          this.$notify({
            title: '提示',
            message: '白名单未指定使用规则！',
            type: 'warning'
          });
        }, 0);
        ischeck = false;
      }

      return ischeck ? data : ischeck;
    },
    handle(flag) {
      if (flag) {
        let getRuleDimension = function(obj) {
            if (!obj.ruleName.value) {
              return 'NO_RULE';
            }
            if (!obj.dimension[0].value && !obj.dimension[1].value && !obj.dimension[2].value) {
              return 'EMPTY_DIMENSION';
            }
            if (obj.dimension[2].value) {
              return 'BRAND_DIMENSION'
            }
            if (obj.dimension[1].value) {
              return 'CAT2_DIMENSION'
            }
            if (obj.dimension[0].value) {
              return 'CAT1_DIMENSION'
            }
          }

        return {
          name: this.params.name,
          description: this.params.description,
          contractRuleType: this.params.contractRuleType,
          effectiveTime: this.params.effectiveTime ? new Date(this.params.effectiveTime).getTime() : '',
          expirationTime: this.params.expirationTime ? new Date(this.params.expirationTime).getTime() : '',
          // 账期条约规则
          accountPeriodRuleDimension: getRuleDimension(this.ruleArr[0]),
          accountPeriodRuleVoList: this.ruleArr[0].ruleName.value ? this.params.accountPeriodRuleVoList.map(item => {
            return {
              cat1Id: item.cat1 && this.ruleArr[0].dimension[0].value ? item.cat1.cat1Id : null,
              cat1Name: item.cat1 && this.ruleArr[0].dimension[0].value ? item.cat1.cat1Name : null,

              cat2Id: item.cat2 && item.cat2.cat2Name !== '全部'
                && this.ruleArr[0].dimension[1].value ? item.cat2.cat2Id : null,
              cat2Name: item.cat2 && item.cat2.cat2Name !== '全部'
                && this.ruleArr[0].dimension[1].value ? item.cat2.cat2Name : null,

              brandId: item.brand && item.brand.brandName !== '全部'
                && this.ruleArr[0].dimension[2].value ? item.brand.brandId : null,
              brandName: item.brand && item.brand.brandName !== '全部'
                && this.ruleArr[0].dimension[2].value? item.brand.brandName : null,

              settlementType: item.settlementType ? item.settlementType.value : null,
              settlementTerm: item.settlementTerm,
              draftTerm: item.draftTerm
            }
          }) : null,
          // 商业折扣利规则
          commercialDiscountRebateRuleDimension: getRuleDimension(this.ruleArr[1]),
          commercialDiscountRebateRuleVoList: this.ruleArr[1].ruleName.value
            ? this.params.commercialDiscountRebateRuleVoList.map(item => {
              return {
                cat1Id: item.cat1 && this.ruleArr[1].dimension[0].value ? item.cat1.cat1Id : null,
                cat1Name: item.cat1 && this.ruleArr[1].dimension[0].value ? item.cat1.cat1Name : null,

                cat2Id: item.cat2 && item.cat2.cat2Name !== '全部'
                  && this.ruleArr[1].dimension[1].value ? item.cat2.cat2Id : null,
                cat2Name: item.cat2 && item.cat2.cat2Name !== '全部'
                  && this.ruleArr[1].dimension[1].value ? item.cat2.cat2Name : null,

                brandId: item.brand && item.brand.brandName !== '全部'
                  && this.ruleArr[1].dimension[2].value ? item.brand.brandId : null,
                brandName: item.brand && item.brand.brandName !== '全部'
                  && this.ruleArr[1].dimension[2].value? item.brand.brandName : null,
                discountRebateRate: item.discountRebateRate
              }
          }) : null,
          // 白名单规则
          whitelistRuleList: this.ruleArr[3].ruleName.value ? 
            this.params.whitelistRuleList.map(item => item.value ? item.name : '').filter(item => item !== '') : null,
          whitelistImportRecordId: this.ruleArr[3].ruleName.value ? this.params.whitelistImportRecordId : null,
          // 保证金规则
          hasDepositRule: this.ruleArr[2].ruleName.value
        }
      } else {
        this.$notify({
          title: '提示',
          message: '请检查规则表单！',
          type: 'warning'
        });
        return false;
      }
    },
    sendData(data) {
      if (!data) {
        return;
      }

      api.publishRule(data).then(({data: {status, message}}) => {
        if (status) {
          this.$notify({
            title: '提示',
            message: message,
            type: 'success'
          });
          remote.$state.go('app.contract.ruleMangeList');
        }
      })
    },
    AsyncFuns(value) {
      let pipe = async function (...args) {
        for (let i = 0; i < args.length; i++) {
          value = await args[i](value);
        }
        return value;
      };
      return {
        pipe
      }
    },
    ruleChane(obj, item) {
      if (item.text === '一级类目') {
        if (item.value) {
          // do nothing
        } else {
          obj.dimension[1].value = false;
          obj.dimension[2].value = false;
        }
      }
      if (item.text === '二级类目') {
        if (item.value) {
          obj.dimension[0].value = true;
        } else {
          obj.dimension[2].value = false;
        }
      }
      if (item.text === '品牌') {
        if (item.value) {
          obj.dimension[0].value = true;
          obj.dimension[1].value = true;
          obj.dimension[2].value = true;
        } else {
          // do nothing
        }
      }
    },
    beginDatePicker(date) {
        return +date < +new Date() - 1000 * 60 * 60 * 24;
    },
    endDatePicker(date) {
      if (this.params.effectiveTime) {
        return +date < +this.params.effectiveTime;
      }
    },
    copyInf() {
      const vm = this;
      if (vm.copyId === '') {
          vm.$notify.warning('请输入规则编号');
          return;
      }

      api.getRuleDetail({
          id: vm.copyId,
          contractRuleType: vm.$route.params.contractRuleType
        }).then(({data: {data, status}}) => {
          if (status) {
            let tempData = data;
            // 列表值 初始化
            if (tempData.accountPeriodRuleVoList && tempData.accountPeriodRuleVoList.length > 0) {
              tempData.accountPeriodRuleVoList.forEach((ruleItem, index) => {
                ruleItem.brand = {
                  brandId: ruleItem.brandId === 0 ? '' : ruleItem.brandId,
                  brandName: ruleItem.brandId === 0 ? '全部' : ruleItem.brandName
                };
                ruleItem.cat1 = {
                  cat1Id: ruleItem.cat1Id,
                  cat1Name: ruleItem.cat1Name
                };
                ruleItem.cat2 = {
                  cat2Id: ruleItem.cat2Id === 0 ? '' : ruleItem.cat2Id,
                  cat2Name: ruleItem.cat2Id === 0 ? '全部' : ruleItem.cat2Name
                };

                ruleItem.settlementType = saleRulePageEnum.settlementTypeList.filter(type => type.value === ruleItem.settlementType)[0];

                vm.accountPeriodOptions[index] = {
                  loading: false,
                  brandList: [{
                    brandName: '全部',
                    brandId: ''
                  }, {
                    brandId: ruleItem.brandId,
                    brandName: ruleItem.brandName
                  }],
                  cat1List: [{
                    cat1Id: ruleItem.cat1Id,
                    cat1Name: ruleItem.cat1Name
                  }],
                  cat2List: [{
                    cat2Name: '全部',
                    cat2Id: ''
                  }, {
                    cat2Id: ruleItem.cat2Id,
                    cat2Name: ruleItem.cat2Name
                  }]
                };
              });
            }
            if (tempData.commercialDiscountRebateRuleVoList && tempData.commercialDiscountRebateRuleVoList.length > 0) {
              tempData.commercialDiscountRebateRuleVoList.forEach((ruleItem, index) => {
                ruleItem.brand = {
                  brandId: ruleItem.brandId === 0 ? '' : ruleItem.brandId,
                  brandName: ruleItem.brandId === 0 ? '全部' : ruleItem.brandName
                };
                ruleItem.cat1 = {
                  cat1Id: ruleItem.cat1Id,
                  cat1Name: ruleItem.cat1Name
                };
                ruleItem.cat2 = {
                  cat2Id: ruleItem.cat2Id === 0 ? '' : ruleItem.cat2Id,
                  cat2Name: ruleItem.cat2Id === 0 ? '全部' : ruleItem.cat2Name
                };

                vm.commercialDiscountRebateOptions[index] = {
                  loading: false,
                  brandList: [{
                    brandName: '全部',
                    brandId: ''
                  }, {
                    brandId: ruleItem.brandId,
                    brandName: ruleItem.brandName
                  }],
                  cat1List: [{
                    cat1Id: ruleItem.cat1Id,
                    cat1Name: ruleItem.cat1Name
                  }],
                  cat2List: [{
                    cat2Name: '全部',
                    cat2Id: ''
                  }, {
                    cat2Id: ruleItem.cat2Id,
                    cat2Name: ruleItem.cat2Name
                  }]
                };
              });
            }
            // 白名单规则处理
            tempData.contractRuleTypeStr = tempData.contractRuleType === 'PURCHASE_COMMON_CONTRACT_RULE' ? '采购常规合同规则' : '采购商标合同规则';
            if (!tempData.whitelistRuleList || tempData.whitelistRuleList.length === 0 || !tempData.hasWhiteListRule) {
              vm.ruleArr[3].ruleName.value = false;
            } else {
              vm.ruleArr[3].ruleName.value = true;
            }
            let whitelistRuleListMap =  {
              'ACCOUNT_PERIOD_RULE': {
                name: 'ACCOUNT_PERIOD_RULE',
                text: '账期条约规则',
                value: false
              }, 
              'COMMERCIAL_DISCOUNT_REBATE_RULE': {
                name: 'COMMERCIAL_DISCOUNT_REBATE_RULE',
                text: '商业折扣返利条约规则',
                value: false
              },
              'DEPOSIT_RULE': {
                name: 'DEPOSIT_RULE',
                text: '保证金条约规则',
                value: false
            }};
            for (let i = 0;i < tempData.whitelistRuleList.length; i++) {
              whitelistRuleListMap[tempData.whitelistRuleList[i]].value = true;
            }
            tempData.whitelistRuleList = [
              whitelistRuleListMap['ACCOUNT_PERIOD_RULE'],
              whitelistRuleListMap['COMMERCIAL_DISCOUNT_REBATE_RULE'],
              whitelistRuleListMap['DEPOSIT_RULE']
            ];

            // 规则维度替换
            vm.handleRules(tempData.accountPeriodRuleDimension, vm.ruleArr[0]);
            vm.handleRules(tempData.commercialDiscountRebateRuleDimension, vm.ruleArr[1]);

            // 保证金规则
            vm.ruleArr[2].ruleName.value = tempData.hasDepositRule;
            vm.params = tempData;
          }

          vm.$notify.success('复制成功');
        });
    }
  },
  watch: {
    ruleArr: {
      handler: function(value) {
        if (this.$route.params.method !== 'view') { 
          this.params.whitelistRuleList[0].value = value[0].ruleName.value;
          this.params.whitelistRuleList[1].value = value[1].ruleName.value;
          this.params.whitelistRuleList[2].value = value[2].ruleName.value;
        }
      },
      deep: true
    }
  }
};
</script>

<style src="./style.scss" lang="scss"></style>
<style>
.contract-rule-mange-confirm {
  vertical-align: baseline!important;
}
</style>