import { Component, Vue } from 'vue-property-decorator';

import moment from 'moment';
import appApi from './api';

import downloadPdf from './components/downloadPdf.vue';
import sealModel from './components/sealModel.vue';
import addAgreement from './components/addAgreement.vue';

import {
  contractTypeList,
  contractSubTypeList,
  supplementaryList,
  sealedList,
  contractStatusList
} from './constants'

import {
  params,
  Pagination
} from './types'

@Component({
  components: {
    sealModel,
    downloadPdf,
    addAgreement
  }
})
export default class doneList extends Vue {
  contractTypeList = contractTypeList;
  contractSubTypeList = contractSubTypeList;
  supplementaryList = supplementaryList;
  sealedList = sealedList;
  contractStatusList = contractStatusList;

  moment = moment;

  loading: boolean = false;
  myContract: any = {};

  pagination: Pagination = {
    pageNo: 1,
    pageSize: 20,
    totalPageCount: 0,
    totalCount: 0
  };

  tableData: any = [];

  params: params = {
    contractCode: '',
    contractName: '',
    ourSubjectName: '',
    partnerSubjectName: '',
    contractType: this.contractTypeList[0],
    supplementaryTypes: [...this.supplementaryList],
    bothSealed: this.sealedList[0],
    contractSubType: this.contractSubTypeList['ALL'][0],
    contractStatus: this.contractStatusList[0],
    effectiveTimeStart: '',
    expirationTimeEnd: '',
    applyCode: ''
  };

  effectiveTimeStartPickerOptions = {
    disabledDate: this.effectiveTimePicker
  };

  expirationTimeEndPickerOptions = {
    disabledDate: this.expirationTimePicker
  };

  effectiveTimePicker(date: any) {
    if (this.params.expirationTimeEnd) {
      return +date > +this.params.expirationTimeEnd;
    }
  }

  expirationTimePicker(date: any) {
    if (this.params.effectiveTimeStart) {
      return +date < +this.params.effectiveTimeStart;
    }
  }

  mounted() {
    this.load();
  }

  reset() {
    this.params = {
      contractCode: '',
      contractName: '',
      ourSubjectName: '',
      partnerSubjectName: '',
      contractType: this.contractTypeList[0],
      supplementaryTypes: [...this.supplementaryList],
      bothSealed: this.sealedList[0],
      contractSubType: this.contractSubTypeList['ALL'][0],
      contractStatus: this.contractStatusList[0],
      effectiveTimeStart: '',
      expirationTimeEnd: '',
      applyCode: ''
    };
  }

  load(pageNo?: number) {
    const vm = this;
    vm.loading = true;

    appApi
      .getContractList({
        contractCode: vm.params.contractCode,
        contractName: vm.params.contractName,
        ourSubjectName: vm.params.ourSubjectName,
        partnerSubjectName: vm.params.partnerSubjectName,
        contractType:
          vm.params.contractType.value === 'ALL'
            ? ''
            : vm.params.contractType.value,
        supplementaryTypes: vm.params.supplementaryTypes.map(item => item.value),
        bothSealed: vm.params.bothSealed.value,
        contractStatus: vm.params.contractStatus.value,
        effectiveTimeStart: vm.params.effectiveTimeStart
          ? moment(vm.params.effectiveTimeStart).format('YYYY-MM-DD')
          : '',
        expirationTimeEnd: vm.params.expirationTimeEnd
          ? moment(vm.params.expirationTimeEnd).format('YYYY-MM-DD')
          : '',
        applyCode: vm.params.applyCode,
        pageNo: pageNo ? pageNo : this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      })
      .then(({ data: { data, status } }) => {
        if (status) {
          vm.tableData = data.pageContent;
          vm.pagination.pageNo = data.page.currentPageNo;
          vm.pagination.pageSize = data.page.pageSize;
          vm.pagination.totalCount = data.page.totalCount;
          vm.pagination.totalPageCount = data.page.totalPageCount;

          vm.loading = false;
        } else {
          vm.loading = false;
        }
      })
      .catch(() => {
        vm.loading = false;
      });
  }

  getSeal(contract: any) {
    this.myContract = contract;
    let sealModelRef: any = this.$refs.sealModel;
    sealModelRef.show();
  }

  download(contract: any) {
    this.myContract = contract;
    let downloadPdfRef: any = this.$refs.downloadPdf;
    downloadPdfRef.show();
  }

  // 跳转页面逻辑
  goToDetail(item: any) {
    window.open(
      `${window.location.origin}/app/contract/editSaleContract?id=${
        item.contractCode
      }&method=view&from=list`
    );
  }

  addAgreement(contract: any) {
    this.myContract = contract;
    let addAgreementRef: any = this.$refs.addAgreement;
    addAgreementRef.show();
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