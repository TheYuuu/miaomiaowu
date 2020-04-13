function checkOurSubjectId(rule: any, value: string, callback: Function): void {
  if (!value) {
    callback(new Error('我方主体编号不能为空'));
  } else if (
    !/^\d+$/.test(value) ||
    Number(value) < 1 ||
    Number(value) > 99999999
  ) {
    callback(new Error('我方主体编号必须大于等于1小于等于99999999的正整数'));
  } else {
    callback();
  }
}

function checkOurSubjectName(
  rule: any,
  value: string,
  callback: Function
): void {
  if (!value) {
    callback(new Error('公司名称不能为空'));
  } else if (/[a-z|A-Z]|\d+/.test(value)) {
    callback(new Error('公司名称不能存在字母和数字'));
  } else if (value.length < 2 || value.length > 20) {
    callback(new Error('公司名称字数不得小于2个字不得超过20个字'));
  } else {
    callback();
  }
}

function checkBusinessLicence(
  rule: any,
  value: string,
  callback: Function
): void {
  if (!value) {
    callback(new Error('统一社会信用代码不能为空'));
  } else if (!/^([A-Z]|\d)+$/.test(value)) {
    callback(new Error('统一社会信用代码仅允许有大写字母和数字组成'));
  } else if (value.length !== 18) {
    callback(new Error('统一社会信用代码必须18位'));
  } else {
    callback();
  }
}

function checkBankName(rule: any, value: string, callback: Function): void {
  if (!value) {
    callback(new Error('开户行不能为空'));
  } else if (value.length > 50) {
    callback(new Error('开户行不得超过50个字'));
  } else {
    callback();
  }
}

function checkBankCardName(rule: any, value: string, callback: Function): void {
  if (!value) {
    callback(new Error('开户名不能为空'));
  } else if (value.length > 50) {
    callback(new Error('开户名不得超过50个字'));
  } else {
    callback();
  }
}

function checkBankCardNo(rule: any, value: string, callback: Function): void {
  if (!value) {
    callback(new Error('账号不能为空'));
  } else if (!/^\d{6,29}$/.test(value)) {
    callback(new Error('账号必须为大于5位小于30位的数字'));
  } else {
    callback();
  }
}

function checkContactPhone(rule: any, value: string, callback: Function): void {
  if (!value) {
    callback(new Error('电话不能为空'));
  } else if (!/^(\d|-|\+){6,20}$/.test(value)) {
    callback(new Error('仅支持6-20位的数字和"-"、"+"字符'));
  } else {
    callback();
  }
}

function checkLegalPersonName(
  rule: any,
  value: string,
  callback: Function
): void {
  if (!value) {
    callback(new Error('法人姓名不能为空'));
  } else if (!/^([\u4e00-\u9fa5]){2,6}$/.test(value)) {
    callback(new Error('姓名仅支持2-6个汉字'));
  } else {
    callback();
  }
}

function checkLegalPersonIdCard(
  rule: any,
  value: string,
  callback: Function
): void {
  if (!value) {
    callback(new Error('法人身份证号不能为空'));
  } else if (!/^([A-Z]|\d)+$/.test(value)) {
    callback(new Error('身份证号仅允许有大写字母和数字组成'));
  } else if (value.length !== 18) {
    callback(new Error('身份证号必须18位'));
  } else {
    callback();
  }
}

function checkLegalPersonPhone(
  rule: any,
  value: string,
  callback: Function
): void {
  if (!value) {
    callback(new Error('法人手机号码不能为空'));
  } else if (!/^\d{11,11}$/.test(value)) {
    callback(new Error('法人手机号仅支持11位数字'));
  } else {
    callback();
  }
}

export default {
  ourSubjectId: [{ validator: checkOurSubjectId, trigger: ['blur', 'change'] }],
  ourSubjectName: [
    { validator: checkOurSubjectName, trigger: ['blur', 'change'] }
  ],
  businessLicence: [
    { validator: checkBusinessLicence, trigger: ['blur', 'change'] }
  ],
  bankName: [{ validator: checkBankName, trigger: ['blur', 'change'] }],
  bankCardName: [{ validator: checkBankCardName, trigger: ['blur', 'change'] }],
  bankCardNo: [{ validator: checkBankCardNo, trigger: ['blur', 'change'] }],
  contactPhone: [{ validator: checkContactPhone, trigger: ['blur', 'change'] }],
  legalPersonName: [
    { validator: checkLegalPersonName, trigger: ['blur', 'change'] }
  ],
  legalPersonIdCard: [
    { validator: checkLegalPersonIdCard, trigger: ['blur', 'change'] }
  ],
  legalPersonPhone: [
    { validator: checkLegalPersonPhone, trigger: ['blur', 'change'] }
  ]
};
