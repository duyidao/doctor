interface responseType {
  code: number;
  message: string;
  ok: boolean;
}

// 订单详情类型
export interface orderInfoType {
  id: number;
  createTime: string;
  updateTime: string;
  isDelete: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: string;
  title: string;
  reserveTime: number;
  reserveDate: string;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}
export interface orderInfoResponseType extends responseType {
  data: orderInfoType;
}

// 订单二维码接口类型
export interface codeType {
  codeUrl?: string;
  orderId?: number;
  totalFee?: number;
  resultCode?: string;
}
export interface qrCodeResponseType extends responseType {
  data: codeType;
}

// 支付结果接口类型
export interface payResponseType extends responseType {
  data: boolean;
}

// 用户信息接口类型
export interface UserType {
  id?: number;
  createTime?: string;
  updateTime?: string;
  isDeleted?: number;
  param?: UserTypeParam;
  openid?: any;
  nickName?: any;
  phone?: string;
  name?: string;
  certificatesType?: any;
  certificatesNo?: any;
  certificatesUrl?: any;
  authStatus?: number;
  status?: number;
}
export interface UserTypeParam {}
export interface UserInfoResponseType extends responseType {
  data: UserType;
}

// 证件对象类型
export interface CertifiteItemType {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: CertifiteItemTypeParam;
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}
export interface CertifiteItemTypeParam {}
export interface CertifiteResponseType extends responseType {
  data: CertifiteItemType[];
}

// 订单列表接口类型
export interface OrderItemType {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: OrderItemTypeParam;
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: any;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}
export interface OrderItemTypeParam {
  orderStatusString: string;
}
export interface OrderListResponseType extends responseType {
  data: {
    searchCount: boolean;
    size: number;
    total: number;
    records: OrderItemType[];
    current: number;
    hitCount: boolean;
    orders: any;
    pages: number;
  };
}

// 全部用户信息类型
export interface AllUserItemType {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: AllUserItemTypeParam;
  userId: number;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
  isInsure: number;
  cardNo: any;
  status: string;
}
export interface AllUserItemTypeParam {
  certificatesTypeString: string;
  contactsCertificatesTypeString: string;
  cityString: string;
  fullAddress: string;
  districtString: string;
  provinceString: string;
}
export interface AllUserResponseType extends responseType {
  data: AllUserItemType[];
}

// 订单状态类型
export interface OrderStatuItemType {
  comment: string;
  status: number;
}
export interface OrderStatuResponseType extends responseType {
  data: OrderStatuItemType[];
}

// 就诊人新增编辑数据类型
export interface AddUpdateDataType {
  id?: number | string;
  address: string;
  name: string;
  birthdate: string;
  certificatesNo: string;
  certificatesType: string;
  sex: string | number;
  phone: string;
  isMarry: string | number;
  isInsure: string | number;
  addressSelected: string[];
  contactsName: string;
  contactsPhone: string;
  contactsCertificatesNo: string;
  contactsCertificatesType: string;
}
