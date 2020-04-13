import { Component, Vue } from 'vue-property-decorator';
import appApi from './api';

import { ListParams, TableData, Pagination } from './types';
import updateOurSubjectDialog from './editOurSubjectDialog/view.vue';

@Component({
  components: {
    updateOurSubjectDialog
  }
})
export default class extends Vue {
  params: ListParams = {
    ourSubjectName: ''
  };

  tableData: Array<TableData> = [];

  pagination: Pagination = {
    pageNo: 1,
    pageSize: 10,
    totalCount: 0
  };

  loading: boolean = false;

  load(pageNo?: number): void {
    const vm = this;
    vm.loading = true;

    appApi
      .getOurSubjectInfList({
        ourSubjectName: this.params.ourSubjectName,
        pageNo: pageNo ? pageNo : this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      })
      .then(({ data: { data, status } }) => {
        if (status) {
          vm.tableData = data.pageContent.map((item: any) => {
            return {
              actionType: item.actionType,
              ourSubjectId: item.ourSubjectId || '--',
              ourSubjectName: item.ourSubjectName || '--',
              businessLicence: item.businessLicence || '--',
              bankName: item.bankName || '--',
              bankCardNo: item.bankCardNo || '--',
              bankCardName: item.bankCardName || '--',
              contactAddress: item.contactAddress || '--',
              contactPhone: item.contactPhone || '--',
              isLegalPersonExist: item.isLegalPersonExist,
              legalPersonName: item.legalPersonName || '--',
              legalPersonIdCard: item.legalPersonIdCard || '--',
              legalPersonPhone: item.legalPersonPhone || '--',
              certificationType: item.certificationType || '--'
            };
          });
          vm.pagination.pageNo = data.page.currentPageNo;
          vm.pagination.pageSize = data.page.pageSize;
          vm.pagination.totalCount = data.page.totalCount;

          vm.loading = false;
        } else {
          vm.loading = false;
        }
      })
      .catch(() => {
        vm.loading = false;
      });
  }

  mounted() {
    this.load();
  }

  createOurSubject(): void {
    let updateDialog: any = this.$refs['updateOurSubjectDialog'];
    updateDialog.showDialog('ADD');
  }

  edit(item: any): void {
    appApi
      .getOurSubjectInfDetail({
        ourSubjectId: item.ourSubjectId
      })
      .then(({ data: { data, status } }) => {
        if (status) {
          let updateDialog: any = this.$refs[
            'updateOurSubjectDialog'
          ];
          updateDialog.showDialog('UPDATE', data);
        } else {
          // do nothing
        }
      })
      .catch(() => {});
  }

  handleSizeChange(size: number): void {
    this.pagination.pageNo = 1;
    this.pagination.pageSize = size;

    this.load();
  }

  handleCurrentChange(current: number): void {
    this.pagination.pageNo = current;
    this.load();
  }
}
