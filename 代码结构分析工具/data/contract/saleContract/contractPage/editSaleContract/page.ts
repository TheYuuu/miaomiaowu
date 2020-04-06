import { Component, Vue, Watch } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';
import moment from 'moment';

import appApi from '../api';

import basicInfo from '../components/basicInfo.vue';
import otherInfo from '../components/otherInfo.vue';
import paymentInfo from '../components/paymentInfo.vue';
import subjectInfo from '../components/subjectInfo.vue';

import {
  basicInfoInterFace,
  otherInfoInterFace,
  paymentClauseInterFace,
  subjectInfoInterFace,
  peerSubjectListInterFace,
  partnerSubjectPayInfoInterFace
} from '../types'

@Component({
  components: {
    basicInfo,
    otherInfo,
    paymentInfo,
    subjectInfo
  }
})
export default class saleContractPage extends Vue {
  pageTitle: string = '销售合同';
  isView: boolean = false;
  id: string = '';
  submitFlag: boolean = false;
  method: string = '';
  moment: any = moment;
  appApi: any = appApi;
  latestContractCode: string = '';
  formDisable: any = {
    basicInfo: {
      contractName: true,
      creatorName: true,
      sealed: true,
      contractProperty: true,
      effectiveTime: true,
      expirationTime: true,
    },
    subjectInfo: true,
    paymentInfo: true,
    otherInfo: true
  }

  basicInfo: basicInfoInterFace = {
    creatorName: '',
    creatorId: '',
    applyDate: '',
    contractBuName: '',
    contractBuId: '',
    contractType: '', // 合同种类
    contractTypeStr: '', // 合同种类
    contractSubTypeStr: '', // 合同类型
    contractName: '',
    contractProperty: '', // 合同属性
    sealed: false,
    supplementaryType: '',
    effectiveTime: '',
    expirationTime: ''
  };

  subjectInfo: subjectInfoInterFace = {
    saleOurSubjectVo: {
      id: '',
      subjectName: '',
      contact: '',
      phoneNo: '',
      email: '',
      address: ''
    },
    saleOurBankVo: {
      ourBankCardType: '',
      ourAccountName: '',
      ourBankCardNumber: '',
      ourBankName: '',
      ourBankBranchName: ''
    }
  };
  // partnerSubjectInfoList: any = {};
  paymentClause: paymentClauseInterFace = {
    settlementType: '',
    settlementTerm: '',
    paymentSettlement: '',
    invoiceSequence: '',
    invoiceType: [],
    paymentClass: '',
    settlementFixedDate: '',
    settlementFixedDays: '',
    saleSettlementCustomCycleVoList: [{
        beginDate: null,
        endDate: null
    }],
    saleOurBankVo: {
        ourBankCardType: '',
        ourAccountName: '',
        ourBankCardNumber: '',
        ourBankName: '',
        ourBankBranchName: ''
    },
    billingPeriodQuota: ''
  };
  otherInfo: otherInfoInterFace = {
    saleAttachmentVoList: [],    // 附件url
    remark: ''    // 其它说明
  };

  saleAttachmentVoList: any = [{}];
  mySaleOurSubjectInfo: any = {};
  peerSubjectList: Array<peerSubjectListInterFace> = [{
    partnerId: '',
    partnerSubjectName: '',
    unifiedSocialCreditCode: '',
    contacts: '',
    contactPhone: '',
    companyAddress: ''
  }];
  partnerSubjectPayInfo: Array<partnerSubjectPayInfoInterFace> = [{
    salePartnerBankVo: {
      partnerBankCardType: '',
      partnerBankCardTypeStr: '',
      partnerAccountName: '',
      partnerBankCardNumber: '',
      partnerBankName: '',
      partnerBankBranchName: ''
    },
    saleInvoiceInfoVo: {
      invoiceCompanyName: '',
      invoiceTaxpayerNumber: '',
      invoiceCompanyPhone: '',
      invoiceCompanyBankName: '',
      invoiceCompanyAccount: '',
      invoiceCompanyAddress: ''
    }
  }];

  remote = remote;

  @Watch('basicInfo', { deep: true })
  basicInfoChange() {
    const vm = this;
    if (vm.method === 'create' || vm.method === 'edit') {
      let cycleVoList = vm.paymentClause
      ? vm.paymentClause.saleSettlementCustomCycleVoList : null;
      if (cycleVoList && cycleVoList.length > 0) {
          if (vm.basicInfo.effectiveTime) {
              cycleVoList[0].beginDate = new Date(vm.basicInfo.effectiveTime);
          }
          if (vm.basicInfo.expirationTime) {
              cycleVoList[cycleVoList.length - 1].endDate = new Date(vm.basicInfo.expirationTime);
          }

      }
    }
  }

  @Watch('$store.getters.user', { deep: true })
  userChange(newVal: any) {
    if (this.method === 'create') {
      this.basicInfo.creatorName = newVal.name;
      this.basicInfo.creatorId = newVal.login;
    }
  }

  saleSettlementCustomCycleVoListChange() {
    const vm = this;
    if (vm.method === 'create' || vm.method === 'edit') {
      let cycleVoList = vm.paymentClause
      ? vm.paymentClause.saleSettlementCustomCycleVoList : null;
      if (cycleVoList && cycleVoList.length > 1) {
          cycleVoList[0].beginDate = new Date(vm.basicInfo.effectiveTime);
          cycleVoList[cycleVoList.length - 1].endDate = new Date(vm.basicInfo.expirationTime);
          for (let i = 0; i < cycleVoList.length; i++) {
              if (cycleVoList[i + 1]) {
                  cycleVoList[i + 1].beginDate = cycleVoList[i].endDate
                      ? new Date(+cycleVoList[i].endDate + 1000 * 60 * 60 * 24) : null;
              }
          }
      }
    }
  }

  selectPeerSubject(index: number) {
    this.partnerSubjectPayInfo[index] = {
      salePartnerBankVo: {
        partnerBankCardType: '',
        partnerBankCardTypeStr: '',
        partnerAccountName: '',
        partnerBankCardNumber: '',
        partnerBankName: '',
        partnerBankBranchName: ''
      },
      saleInvoiceInfoVo: {
        invoiceCompanyName: '',
        invoiceTaxpayerNumber: '',
        invoiceCompanyPhone: '',
        invoiceCompanyBankName: '',
        invoiceCompanyAccount: '',
        invoiceCompanyAddress: ''
      }
    };
  }

  mounted() {
    this.initFormDisable();
    this.init();
  }

  init() {
    const vm = this;
    vm.method = String(vm.$route.query.method);

    if (vm.method === 'create') {
      vm.initCreate();
    } else if (vm.method === 'edit' || vm.method === 'view') {
      vm.initData();
    }
  }

  initCreate() {
    const vm = this;

    vm.pageTitle = '合同起草【销售合同-账期合同】';
    vm.initEmptyDate();
  }

  initData() {
    const vm = this;

    let id = vm.$route.query.id;
    let service: any = null;
    let params = {};
    if (vm.method === 'edit') {
      service = vm.appApi.getDraftData;
      params = {
        draftId: id
      };
    } else if (vm.method === 'view') {
      this.isView = true;
      service = vm.appApi.getViewData;
      params = {
        contractCode: id
      };
    } else {
      // do nothing
    }

    service(params).then(({ data: { data, status } }: any) => {
      if (status) {
        vm.initPageTitle(data.saleBaseInfoVo.contractName);
        vm.handleData(data);
        vm.latestContractCode = data.latestContractCode;
      }
    });
  }

  initPageTitle(contractName: string) {
    // 标题
    const vm = this;
    let from = vm.$route.query.from;
    if (vm.method === 'edit') {
      vm.pageTitle = `合同编辑 -【${
        contractName
      }】- 主合同`;
    } else if (from === 'list') {
      vm.pageTitle = `合同管理已完成 -【${
        contractName
      }】- 主合同`;
    } else if (from === 'apply') {
      vm.pageTitle = `我的申请 -【${
        contractName
      }】- 主合同`;
    } else {
      // do nithing
    }
  }

  initFormDisable() {
    this.formDisable = {
      basicInfo: {
        contractName: false,
        creatorName: false,
        sealed: false,
        contractProperty: false,
        effectiveTime: false,
        expirationTime: false,
      },
      subjectInfo: false,
      paymentInfo: false,
      otherInfo: false
    }
  }

  handleData(data: any) {
    const vm = this;
    // 解析 我方对方主体银行信息
    data.mySaleOurSubjectInfo = {};
    data.mySaleOurSubjectInfo.saleOurSubjectVo = {
      subjectName: data.saleOurSubjectInfo.saleOurSubjectVo.subjectName,
      id: data.saleOurSubjectInfo.saleOurSubjectVo.id,
      contact: data.saleOurSubjectInfo.saleOurSubjectVo.contact,
      phoneNo: data.saleOurSubjectInfo.saleOurSubjectVo.phoneNo,
      email: data.saleOurSubjectInfo.saleOurSubjectVo.email,
      address: data.saleOurSubjectInfo.saleOurSubjectVo.address
    };
    data.peerSubjectList = data.salePartnerSubjectVoList.map(
      (item: any) => {
        return {
          partnerId: item.salePartnerSubjectBaseVo.partnerId,
          partnerSubjectName:
            item.salePartnerSubjectBaseVo.partnerSubjectName,
          unifiedSocialCreditCode:
            item.salePartnerSubjectBaseVo.unifiedSocialCreditCode,
          contacts: item.salePartnerSubjectBaseVo.contacts,
          contactPhone: item.salePartnerSubjectBaseVo.contactPhone,
          companyAddress: item.salePartnerSubjectBaseVo.companyAddress
        };
      }
    );

    data.partnerSubjectPayInfo = data.salePartnerSubjectVoList.map(
      (item: any) => {
        return {
          salePartnerBankVo: JSON.parse(
            JSON.stringify(item.salePartnerBankVo)
          ),
          saleInvoiceInfoVo: JSON.parse(
            JSON.stringify(item.saleInvoiceInfoVo)
          )
        };
      }
    );

    data.salePaymentClauseVo.saleOurBankVo = JSON.parse(
      JSON.stringify(data.saleOurSubjectInfo.saleOurBankVo)
    );

    data.otherInfo = {};
    data.otherInfo.remark = data.saleBaseInfoVo.remark;
    data.otherInfo.saleAttachmentVoList = (data.saleAttachmentVoList || []).map((item :any) => {
      item.name = `${item.attachmentName} ${item.uploadName}-${item.uploadMis}-
        ${vm.moment(item.uploadTime).format('YYYY-MM-DD HH:mm:ss')}`;
      item.url = item.attachmentUrl;
      return item;
    });

    vm.basicInfo = data.saleBaseInfoVo;
    vm.subjectInfo = data.mySaleOurSubjectInfo;
    // vm.partnerSubjectInfoList = data.salePartnerSubjectVoList;
    vm.paymentClause = data.salePaymentClauseVo;
    vm.otherInfo = data.otherInfo;

    vm.saleAttachmentVoList = data.saleAttachmentVoList;
    vm.peerSubjectList = data.peerSubjectList;
    vm.partnerSubjectPayInfo = data.partnerSubjectPayInfo;

    vm.basicInfo.contractTypeStr = '销售合同';
    vm.basicInfo.contractSubTypeStr = '账期付款合同';

    let invoiceTypeTemp:any = vm.paymentClause.invoiceType;
    vm.paymentClause.invoiceType =  invoiceTypeTemp === 'BOTH_VAT_INVOICE'
      ? ['SPECIAL_VAT_INVOICE', 'GENERAL_VAT_INVOICE'] : [String(invoiceTypeTemp)];
  }

  save() {
    const vm = this;
    let ReqData = vm.supplementaryHandle(vm.getReqData());
    if (vm.submitFlag) {
      return;
    }
    vm.submitFlag = true;
    vm.appApi.saveDraft(ReqData).then(
      ({ data: { status, data} }: any) => {
        if (status) {
          vm.$notify.success('保存草稿成功！');
          setTimeout(() => {
            vm.remote.$state.go('app.contract.editSaleContract', {
              id: data,
              method: 'edit',
              from: 'list'
            });
          }, 500);
        } else {
          vm.submitFlag = false;
        }
      },
      () => {
        vm.submitFlag = false;
      }
    );
  }

  submit() {
    const vm = this;
    let ReqData = vm.supplementaryHandle(vm.getReqData());
    if (this.checkData(ReqData)) {
      return;
    }
    this.confirmSubmit(ReqData);
  }

  checkData(data: any) {
    const vm = this;
    const firstNotZeroIntReg = /^[1-9]\d*$/;
    let isChecked = false;
    let saleBaseInfoVo: any = {
        'contractName': '合同名称',
        'contractProperty': '合同属性',
        'effectiveTime': '有效开始日期',
        'expirationTime': '有效结束日期'
    };
    let message: Array<string> = [];
    for (let key in saleBaseInfoVo) {
      if (saleBaseInfoVo.hasOwnProperty(key) && !data.saleBaseInfoVo[key]) {
          // vm.$notify.warning('请输入：' + saleBaseInfoVo[key] + '!');
          message.push('请输入：' + saleBaseInfoVo[key] + '!');
          isChecked = true;
      }
    }

    if (String(data.saleBaseInfoVo.contractName).length > 50) {
        // vm.$notify.warning('合同名称超过长度！');
        message.push('合同名称超过长度！');
        isChecked = true;
    }

    if (!data.saleOurSubjectInfo.saleOurSubjectVo.subjectName) {
        // vm.$notify.warning('请选择我方主体！');
        message.push('请选择我方主体！');
        isChecked = true;
    }

    if (!data.salePartnerSubjectVoList[0].salePartnerSubjectBaseVo.partnerSubjectName) {
        // vm.$notify.warning('请选择合作方主体！');
        message.push('请选择合作方主体！');
        isChecked = true;
    }

    if (data.salePartnerSubjectVoList && data.salePartnerSubjectVoList.length > 0) {
        let map: any = {};
        for (let i = 0; i < data.salePartnerSubjectVoList.length; i++) {
            if (map[data.salePartnerSubjectVoList[i].salePartnerSubjectBaseVo.partnerId] === 1) {
                // vm.$notify.warning('禁止选择多个相同合作方主体！');
                message.push('禁止选择多个相同合作方主体！');
                isChecked = true;
            }
            map[data.salePartnerSubjectVoList[i].salePartnerSubjectBaseVo.partnerId] = 1;
        }
    }

    if (!data.salePaymentClauseVo.paymentPlusDays) {
        // vm.$notify.warning('请输入付款账期天数！');
        message.push('请输入付款账期天数！');
        isChecked = true;
    }
    if (Number(data.salePaymentClauseVo.paymentPlusDays) > 0
        && Number(data.salePaymentClauseVo.paymentPlusDays) <= 999
        && firstNotZeroIntReg.test(data.salePaymentClauseVo.paymentPlusDays)
        || Number(data.salePaymentClauseVo.paymentPlusDays) === 0) {

        // do nothing
    } else {
        // vm.$notify.warning('付款账期天数请输入0-999整数！');
        message.push('付款账期天数请输入0-999整数！');
        isChecked = true;
    }

    let saleOurBankVo: any = {
        'ourAccountName': '我方开户名',
        'ourBankName': '我方开户行名称',
        'ourBankBranchName': '我方开户支行名称'
    };
    for (let key in saleOurBankVo) {
        if (saleOurBankVo.hasOwnProperty(key) && !data.saleOurSubjectInfo.saleOurBankVo[key]) {
            // vm.$notify.warning('请输入：' + saleOurBankVo[key] + '!');
            message.push('请输入：' + saleOurBankVo[key] + '!');
            isChecked = true;
        }

        if (String(data.saleOurSubjectInfo.saleOurBankVo[key]).length > 50) {
            // vm.$notify.warning(saleOurBankVo[key] + '超过长度！');
            message.push(saleOurBankVo[key] + '超过长度！');
            isChecked = true;
        }
    }

    if (!/^\d{6,30}$/.test(data.saleOurSubjectInfo.saleOurBankVo.ourBankCardNumber)) {
        // vm.$notify.warning('银行账号只允许输入6位以上30位以下数字！');
        message.push('银行账号只允许输入6位以上30位以下数字！');
        isChecked = true;
    }

    for (let i = 0; i < data.salePartnerSubjectVoList.length; i++) {
        if (!data.salePartnerSubjectVoList[i].salePartnerBankVo.partnerAccountName) {
            // vm.$notify.warning('请选择第' + (i + 1) + '条签约主体付款信息！');
            message.push('请选择第' + (i + 1) + '条签约主体付款信息！');
            isChecked = true;
        }
    }

    if (data.salePaymentClauseVo.settlementTerm === 'FIXED_MONTHLY_DATE') {
        if (!data.salePaymentClauseVo.settlementFixedDate) {
            // vm.$notify.warning('请输入每月固定日期！');
            message.push('请输入每月固定日期！');
            isChecked = true;
        }

        if (Number(data.salePaymentClauseVo.settlementFixedDate) >= 1
            && Number(data.salePaymentClauseVo.settlementFixedDate) <= 31
            && firstNotZeroIntReg.test(data.salePaymentClauseVo.settlementFixedDate)) {

            // do nothing
        } else {
            // vm.$notify.warning('每月固定日期请输入1-31整数！');
            message.push('每月固定日期请输入1-31整数！');
            isChecked = true;
        }
    } else if (data.salePaymentClauseVo.settlementTerm === 'FIXED_DAYS') {
        if (!data.salePaymentClauseVo.settlementFixedDays) {
            vm.$notify.warning('请输入固定天数！');
            message.push('请输入固定天数！');
            isChecked = true;
        }

        if (Number(data.salePaymentClauseVo.settlementFixedDays) > 0
            && Number(data.salePaymentClauseVo.settlementFixedDays) <= 999
            && firstNotZeroIntReg.test(data.salePaymentClauseVo.settlementFixedDays)) {

            // do nothing
        } else {
            // vm.$notify.warning('固定天数请输入1-999整数！');
            message.push('固定天数请输入1-999整数！');
            isChecked = true;
        }
    } else if (data.salePaymentClauseVo.settlementTerm === 'CUSTOM_CYCLE') {
        for (let i = 0; i < data.salePaymentClauseVo.saleSettlementCustomCycleVoList.length; i++) {
            if (data.salePaymentClauseVo.saleSettlementCustomCycleVoList[i].beginDate
                    && data.salePaymentClauseVo.saleSettlementCustomCycleVoList[i].endDate) {
                let beginDate = new Date(data.salePaymentClauseVo.saleSettlementCustomCycleVoList[i].beginDate)
                    .setHours(0, 0, 0, 0);
                let endDate = new Date(data.salePaymentClauseVo.saleSettlementCustomCycleVoList[i].endDate)
                    .setHours(0, 0, 0, 0);
                if (beginDate > endDate) {
                    // vm.$notify.warning(`第${i + 1}条自定义周期开始时间大于结束时间！`);
                    message.push(`第${i + 1}条自定义周期开始时间大于结束时间！`);
                    isChecked = true;
                }
            } else {
                // vm.$notify.warning(`请输入第${i + 1}条自定义周期时间`);
                message.push(`请输入第${i + 1}条自定义周期时间`);
                isChecked = true;
            }
        }
    } else {
        // do nothing
    }

    if (Number(data.salePaymentClauseVo.billingPeriodQuota) >= 0
        && Number(data.salePaymentClauseVo.billingPeriodQuota) <= 999999999
          && /^(\d+|\d+\.\d{1,2})$/.test(data.salePaymentClauseVo.billingPeriodQuota)) {
      // do nothing
    } else {
      message.push('账期额度最多两位小数，且在0到999999999之间！');
      isChecked = true;
    }

    if (!data.saleAttachmentVoList || data.saleAttachmentVoList.length === 0) {
        // vm.$notify.warning('请上传附件！');
        message.push(`请上传附件！`);
        isChecked = true;
    }

    if (String(data.saleBaseInfoVo.otherInfo).length > 2000) {
        // vm.$notify.warning('其他约定和说明超过长度！');
        message.push(`其他约定和说明超过长度！`);
        isChecked = true;
    }

    for (let i = 0; i < message.length; i++) {
      setTimeout(() => {
        vm.$notify.warning(message[i]);
      }, 0)
    }

    return isChecked;
  }


  confirmSubmit(params: any) {
    const vm = this;
    this.$confirm('是否确认提交?', '提示', {
      cancelButtonClass: 'salecontract-edit-cancel-button',
      type: 'success'})
    .then(() => {
      if (this.submitFlag) {
        return;
      }
      this.submitFlag = true;
      vm.appApi.submitDraft(params).then(( { data: { status } }: any) => {
          if (status) {
              vm.$notify.success('提交成功！');
              vm.remote.$state.go('app.contract.saleContractManage');
          } else {
              this.submitFlag = false;
          }
      }, () => { this.submitFlag = false; });
    })
    .catch(() => {});
  }

  getReqData() {
    return {
      saleBaseInfoVo: {
        draftId: this.$route.query.id ? this.$route.query.id : null,
        contractBuId: this.basicInfo.contractBuId,
        contractBuName: this.basicInfo.contractBuName,
        applyDate: this.basicInfo.applyDate
          ? this.moment(this.basicInfo.applyDate).format('YYYY-MM-DD')
          : '',
        supplementaryType: this.basicInfo.supplementaryType,
        contractName: this.basicInfo.contractName,
        contractType: this.basicInfo.contractType,
        contractProperty: this.basicInfo.contractProperty
          ? this.basicInfo.contractProperty
          : null,
        effectiveTime: this.basicInfo.effectiveTime
          ? this.moment(this.basicInfo.effectiveTime).format('YYYY-MM-DD')
          : '',
        expirationTime: this.basicInfo.expirationTime
          ? this.moment(this.basicInfo.expirationTime).format('YYYY-MM-DD')
          : '',
        sealed: this.basicInfo.sealed,
        remark: this.otherInfo.remark
      },
      saleOurSubjectInfo: {
        saleOurSubjectVo: {
            id: this.subjectInfo.saleOurSubjectVo
                ? this.subjectInfo.saleOurSubjectVo.id : null,
            subjectName: this.subjectInfo.saleOurSubjectVo
                ? this.subjectInfo.saleOurSubjectVo.subjectName : null,
            contact: this.subjectInfo.saleOurSubjectVo
                ? this.subjectInfo.saleOurSubjectVo.contact : null,
            phoneNo: this.subjectInfo.saleOurSubjectVo
                ? this.subjectInfo.saleOurSubjectVo.phoneNo : null,
            email: this.subjectInfo.saleOurSubjectVo
                ? this.subjectInfo.saleOurSubjectVo.email : null,
            address: this.subjectInfo.saleOurSubjectVo
                ? this.subjectInfo.saleOurSubjectVo.address : null
        },
        saleOurBankVo: {
            ourBankCardType: this.paymentClause.saleOurBankVo
                ? this.paymentClause.saleOurBankVo.ourBankCardType : null,
            ourAccountName: this.paymentClause.saleOurBankVo
                ? this.paymentClause.saleOurBankVo.ourAccountName : null,
            ourBankCardNumber: this.paymentClause.saleOurBankVo
                ? this.paymentClause.saleOurBankVo.ourBankCardNumber : null,
            ourBankName: this.paymentClause.saleOurBankVo
                ? this.paymentClause.saleOurBankVo.ourBankName : null,
            ourBankBranchName: this.paymentClause.saleOurBankVo
                ? this.paymentClause.saleOurBankVo.ourBankBranchName : null
        }
      },
      salePartnerSubjectVoList: this.peerSubjectList.map((item: any, index: number)=> {
        return {
            salePartnerSubjectBaseVo: {
                partnerSubjectName: item.partnerSubjectName,
                partnerId: item.partnerId,
                unifiedSocialCreditCode: item.unifiedSocialCreditCode,
                contacts: item.contacts,
                contactPhone: item.contactPhone,
                companyAddress: item.companyAddress
            },
            salePartnerBankVo: {
                partnerBankCardType: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].salePartnerBankVo.partnerBankCardType : null,
                partnerAccountName: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].salePartnerBankVo.partnerAccountName : null,
                partnerBankCardNumber: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].salePartnerBankVo.partnerBankCardNumber : null,
                partnerBankName: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].salePartnerBankVo.partnerBankName : null,
                partnerBankBranchName: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].salePartnerBankVo.partnerBankBranchName : null
            },
            saleInvoiceInfoVo: {
                invoiceCompanyName: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].saleInvoiceInfoVo.invoiceCompanyName : null,
                invoiceTaxpayerNumber: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].saleInvoiceInfoVo.invoiceTaxpayerNumber : null,
                invoiceCompanyAddress: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].saleInvoiceInfoVo.invoiceCompanyAddress : null,
                invoiceCompanyPhone: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].saleInvoiceInfoVo.invoiceCompanyPhone : null,
                invoiceCompanyBankName: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].saleInvoiceInfoVo.invoiceCompanyBankName : null,
                invoiceCompanyAccount: this.partnerSubjectPayInfo[index]
                    ? this.partnerSubjectPayInfo[index].saleInvoiceInfoVo.invoiceCompanyAccount : null
            }
        };
      }),
      salePaymentClauseVo: {
        settlementType: this.paymentClause.settlementType,
        settlementTerm: this.paymentClause.settlementTerm,
        settlementFixedDate: this.paymentClause.settlementFixedDate,
        settlementFixedDays: this.paymentClause.settlementFixedDays,
        saleSettlementCustomCycleVoList:
        (this.paymentClause.saleSettlementCustomCycleVoList || []).map((item: any) => {
            let temp = JSON.parse(JSON.stringify(item));

            if (new Date(temp.beginDate).getTime()) {
                temp.beginDate = this.moment(new Date(temp.beginDate)).format('YYYY-MM-DD');
            } else {
                temp.beginDate = '';
            }
            if (new Date(temp.endDate).getTime()) {
                temp.endDate = this.moment(new Date(temp.endDate)).format('YYYY-MM-DD');
            } else {
                temp.endDate = '';
            }
            return temp;
        }),
        paymentSettlement: this.paymentClause.paymentSettlement,
        paymentPlusDays: this.paymentClause.paymentPlusDays,
        invoiceSequence: this.paymentClause.invoiceSequence,
        invoiceType: this.paymentClause.invoiceType.length > 1
          ? 'BOTH_VAT_INVOICE': this.paymentClause.invoiceType[0],
        paymentClass: this.paymentClause.paymentClass,
        billingPeriodQuota: this.paymentClause.billingPeriodQuota
      },
      saleAttachmentVoList: (this.otherInfo.saleAttachmentVoList || []).map((item: any) => {
        return {
          contractCode: item.contractCode,
          attachmentName: item.attachmentName,
          attachmentUrl: item.attachmentUrl,
          uploadTime: item.uploadTime,
          attachmentType: 'CONTRACT_ATTACHMENT',
          fileKey: item.fileKey,
          uploadName: item.uploadName,
          uploadMis: item.uploadMis
        };
      })
    };
  }

  supplementaryHandle(data: any) {
    return data;
  }

  initEmptyDate() {
    this.basicInfo = {
      creatorName: this.getUser().name, // 制单人名称
      creatorId: this.getUser().login, // 制单人id
      applyDate: new Date(), // 申请日期
      contractBuName: String(this.$route.query.buName), // 事业部名称
      contractBuId: String(this.$route.query.buId), // 事业部id
      contractType: 'ACCOUNT_PAY_CONTRACT', // 合同种类
      contractTypeStr: '销售合同', // 合同种类
      contractSubTypeStr: '账期付款合同', // 合同类型
      contractName: '', // 合同名称
      contractProperty: 'OUR_CONTRACT', // 合同属性
      sealed: false, // 是否盖章
      supplementaryType: 'NON_SUPPLEMENTARY',
      effectiveTime: '',
      expirationTime: ''
    };

    this.subjectInfo = {
      saleOurSubjectVo: {
        id: '',
        subjectName: '',
        contact: '',
        phoneNo: '',
        email: '',
        address: ''
      },
      saleOurBankVo: {
        ourBankCardType: '',
        ourAccountName: '',
        ourBankCardNumber: '',
        ourBankName: '',
        ourBankBranchName: ''
      }
    };

    this.paymentClause = {
      settlementType: 'ACCOUNT_PAY',
      settlementTerm: 'MONTHLY',
      paymentSettlement: 'RECONCILIATION_DAY',
      invoiceSequence: 'INVOICE_FIRST',
      invoiceType: ['SPECIAL_VAT_INVOICE'],
      paymentClass: 'EFT',
      settlementFixedDate: '',
      settlementFixedDays: '',
      saleSettlementCustomCycleVoList: [{
          beginDate: null,
          endDate: null
      }],
      saleOurBankVo: {
          ourBankCardType: 'PUBLIC',
          ourAccountName: '',
          ourBankCardNumber: '',
          ourBankName: '',
          ourBankBranchName: ''
      },
      billingPeriodQuota: '',
      paymentPlusDays: ''
    };

    this.otherInfo = {
      saleAttachmentVoList: [],    // 附件url
      remark: ''    // 其它说明
    }
  }

  getUser(): any {
    return this.$store.getters.user || {};
  }

  cancel() {
    const vm = this;
    this.$confirm('是否确认返回?', '提示', {
      cancelButtonClass: 'salecontract-edit-cancel-button',
      type: 'warning'})
      .then(() => {
        let url = '';
        let params = {};
        switch (this.$route.query.from) {
          case 'list':
            url = 'app.contract.saleContractManage';
            break;
          case 'draft':
            url = 'app.contract.contractDrafts';
            params = {
              type: 'sales'
            };
            break;
          case 'apply':
            url = 'app.contract.contractApply';
            params = {
              type: 'sales'
            };
            break;
          default:
            // do nothing
            break;
        }
        vm.remote.$state.go(url, params);
      })
      .catch(() => {});
  }

  back() {
    this.remote.$state.go('app.contract.saleContractManage');
  }
}
