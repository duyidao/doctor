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
