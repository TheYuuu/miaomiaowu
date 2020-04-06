import { Component, Vue } from 'vue-property-decorator';
import appApi from '../api';

import { DialogParams } from '../types';
import checkRules from './checkRules';

@Component({
  components: {}
})
export default class extends Vue {
  params: DialogParams = {
    isLegalPersonExist: true,
    ourSubjectId: '',
    ourSubjectName: '',
    businessLicence: '',
    bankName: '',
    bankCardNo: '',
    bankCardName: '',
    contactAddress: '',
    contactPhone: '',
    legalPersonName: null,
    legalPersonIdCard: null,
    legalPersonPhone: null
  };

  rules: any = null;
  showOurSubjectDialog: boolean = false;
  type: string = '';
  pageTitle: string = '';
  checkArrays: Array<string> = [
    'ourSubjectId',
    'ourSubjectName',
    'businessLicence',
    'bankName',
    'bankCardNo',
    'bankCardName',
    'contactAddress',
    'contactPhone'
  ];

  legalPersonCheckArrays: Array<string> = [
    'legalPersonName',
    'legalPersonIdCard',
    'legalPersonPhone'
  ];

  loading: boolean = false;

  mounted() {
    this.rules = checkRules;
  }

  isLegalPersonExistChange(): void {
    this.params.legalPersonName = null;
    this.params.legalPersonIdCard = null;
    this.params.legalPersonPhone = null;
    let ourSubjectInfForm: any = this.$refs['ourSubjectInfForm'];
    this.$nextTick(() => {
      ourSubjectInfForm.clearValidate([
        'legalPersonName',
        'legalPersonIdCard',
        'legalPersonPhone'
      ]);
    });
  }

  showDialog(type: string, item?: any): void {
    this.type = type;
    this.showOurSubjectDialog = true;
    if (type === 'ADD') {
      this.pageTitle = '新增我方主体';
      let ourSubjectInfForm: any = this.$refs['ourSubjectInfForm'];
      if (ourSubjectInfForm) {
        ourSubjectInfForm.clearValidate();
        ourSubjectInfForm.resetFields();
      }
      this.params = {
        isLegalPersonExist: true,
        ourSubjectId: '',
        ourSubjectName: '',
        businessLicence: '',
        bankName: '',
        bankCardNo: '',
        bankCardName: '',
        contactAddress: '',
        contactPhone: '',
        legalPersonName: null,
        legalPersonIdCard: null,
        legalPersonPhone: null
      };
    } else {
      this.pageTitle = '修改我方主体';
      this.params = item;
    }
  }

  handleClose(done: any): void {
    this.$confirm('确认关闭？')
      .then(() => {
        done();
        let ourSubjectInfForm: any = this.$refs['ourSubjectInfForm'];
        ourSubjectInfForm.clearValidate();
        ourSubjectInfForm.resetFields();
        this.params = {
          isLegalPersonExist: true,
          ourSubjectId: '',
          ourSubjectName: '',
          businessLicence: '',
          bankName: '',
          bankCardNo: '',
          bankCardName: '',
          contactAddress: '',
          contactPhone: '',
          legalPersonName: null,
          legalPersonIdCard: null,
          legalPersonPhone: null
        };
      })
      .catch(() => {});
  }

  confirm(): void {
    const vm = this;
    let ourSubjectInfForm: any = this.$refs['ourSubjectInfForm'];
    let propsArr = !this.params.isLegalPersonExist
      ? this.checkArrays
      : this.checkArrays.concat(this.legalPersonCheckArrays);

    let flag = true;
    ourSubjectInfForm.validateField(propsArr, (valid: any) => {
      if (valid) {
        flag = false;
      }
    });

    if (flag) {
      vm.loading = true;
      appApi
        .updateOurSubjectInf({
          ...vm.params,
          actionType: vm.type
        })
        .then(({ data: { status, message } }) => {
          vm.loading = false;
          if (status) {
            vm.showOurSubjectDialog = false;
            vm.$notify({
              title: '提示',
              message: message,
              type: 'success'
            });
            vm.$emit('loadTable');
          } else {
            // do nothing
          }
        })
        .catch(() => {
          vm.loading = false;
        });
    }
  }

  cancle(): void {
    this.showOurSubjectDialog = false;
    let ourSubjectInfForm: any = this.$refs['ourSubjectInfForm'];
    ourSubjectInfForm.clearValidate();
    ourSubjectInfForm.resetFields();
    this.params = {
      isLegalPersonExist: true,
      ourSubjectId: '',
      ourSubjectName: '',
      businessLicence: '',
      bankName: '',
      bankCardNo: '',
      bankCardName: '',
      contactAddress: '',
      contactPhone: '',
      legalPersonName: null,
      legalPersonIdCard: null,
      legalPersonPhone: null
    };
  }
}
