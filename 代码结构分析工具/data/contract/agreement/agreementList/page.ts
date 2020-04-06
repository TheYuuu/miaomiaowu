import { Component, Vue } from 'vue-property-decorator';
import { remote } from '@/utils/ipc';

import moment from 'moment';
import appApi from './api';
import showPermission from '@/mixins/showPermission';

import downloadPdf from './components/downloadPdf.vue';
import sealModel from './components/sealModel.vue';

import {
  signTypeList,
  signStatusList
} from './constants'

import {
  params,
  Pagination
} from './types'

@Component({
  components: {
    downloadPdf,
    sealModel
  }
})
export default class agreementList extends showPermission {
  signTypeList = signTypeList;
  signStatusList = signStatusList;
  moment = moment;
  permissionConfig = {
    hasSysConfig: '/klcss/agreement/pca/category/r/query',
    hasAddAgreement: '/klcss/agreement/pca/w/submit',
    hasDownload: '/klcss/agreement/pca/r/getSealedFile',
    hasSeal: '/klcss/agreement/pca/w/addSealedFile'
  }

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
    agreementCode: '',
    vendorName: '',
    vendorCode: '',
    signType: '',
    signStatus: '',
    createTimeStart: '',
    createTimeEnd: ''
  };

  createTimeStartPickerOptions = {
    disabledDate: this.createTimeStartPicker
  };

  createTimeEndPickerOptions = {
    disabledDate: this.createTimeEndPicker
  };

  createTimeStartPicker(date: any) {
    if (this.params.createTimeEnd) {
      return +date > +this.params.createTimeEnd;
    }
  }

  createTimeEndPicker(date: any) {
    if (this.params.createTimeStart) {
      return +date < +this.params.createTimeStart;
    }
  }

  mounted() {
    this.load();
  }

  reset() {
    this.params = {
      agreementCode: '',
      vendorName: '',
      vendorCode: '',
      signType: '',
      signStatus: '',
      createTimeStart: '',
      createTimeEnd: ''
    };
  }

  load(pageNo?: number) {
    const vm = this;
    vm.loading = true;

    appApi
      .getContractList({
        agreementCode: vm.params.agreementCode,
        vendorName: vm.params.vendorName,
        vendorCode: vm.params.vendorCode,
        signType: vm.params.signType,
        signStatus: vm.params.signStatus,
        createTimeStart: vm.params.createTimeStart
          ? moment(vm.params.createTimeStart).format('YYYY-MM-DD')
          : '',
        createTimeEnd: vm.params.createTimeEnd
          ? moment(vm.params.createTimeEnd).format('YYYY-MM-DD')
          : '',
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

          vm.tableData = vm.tableData.map((item: any) => {
            item.signTypeStr = vm.signTypeList.filter(fItem => fItem.value === item.signType)[0].label;
            item.signStatusStr = vm.signStatusList.filter(fItem => fItem.value === item.signStatus)[0].label;
            return item;
          })

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
    let sealModel: any = this.$refs.sealModel;
    sealModel.show();
  }

  download(contract: any) {
    this.myContract = contract;
    let downloadPdf: any = this.$refs.downloadPdf;

    appApi.getSealedFile({
      agreementCode: contract.agreementCode
    }).then(({ data: { data, status } }) => {
      if (status) {
        contract.attachmentList = data;
        downloadPdf.show();
      }
    });
  }

  hasSealed(item: any) {
    if (item.signType === 'PAPER_CONTRACT' && (
      item.signStatus === 'WAITING_SIGN'
        || item.signStatus === 'BOTH_SEALED'
    )) {
      return true;
    } else {
      return false;
    }
  }

  hasdownload(item: any) {
    if (item.signStatus === 'BOTH_SEALED') {
      return true;
    } else {
      return false;
    }
  }

  addContract() {
    remote.$state.go('app.contract.addAgreement');
  }

  sysConfig() {
    remote.$state.go('app.contract.agreementSysConfig');
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