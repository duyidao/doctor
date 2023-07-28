// @ts-ignore
import http from "@/request";

import type {
  orderInfoResponseType,
  qrCodeResponseType,
  payResponseType,
  UserInfoResponseType,
  CertifiteResponseType,
} from "./type.ts";

enum API {
  SUBMITORDER_URL = "/order/orderInfo/auth/submitOrder/", // 获取订单号码
  ORDERINFO_URL = "/order/orderInfo/auth/getOrderInfo/", // 获取订单详情
  CANCEL_URL = "/order/orderInfo/auth/cancelOrder/", // 取消预约
  QRCODE_URL = "/order/weixin/createNative/", // 获取订单二维码
  PAY_URL = "/order/weixin/queryPayStatus/", // 支付
  USERINFO_URL = "/user/auth/getUserInfo/", // 获取用户信息
  CERTIFITETYPE_URL = "/cmn/dict/findByDictCode/", // 获取身份证选项
  USERRENZHEN_URL = "/user/auth/userAuah", // 用户认证
}

// 用户认证
export const userCertitionApi = (data: any) => {
  return http.post<any, any>(API.USERRENZHEN_URL, data);
};

// 获取身份证选项
export const getCertifiteTypeApi = (CertificatesType = "CertificatesType") => {
  return http.get<any, CertifiteResponseType>(
    API.CERTIFITETYPE_URL + CertificatesType
  );
};

// 获取用户信息
export const getUserInfoApi = () => {
  return http.get<any, UserInfoResponseType>(API.USERINFO_URL);
};

// 支付
export const payApi = (id: string) => {
  return http.get<any, payResponseType>(API.PAY_URL + `${id}`);
};

// 获取订单二维码
export const getQRCodeApi = (id: string) => {
  return http.get<any, qrCodeResponseType>(API.QRCODE_URL + `${id}`);
};

// 取消预约
export const cancelOrderApi = (id: string) => {
  return http.get<any, any>(API.CANCEL_URL + `${id}`);
};

// 获取订单详情
export const getOrderInfoApi = (id: string) => {
  return http.get<any, orderInfoResponseType>(API.ORDERINFO_URL + `${id}`);
};

// 获取订单号码
export const submitOrderApi = (
  hoscode: string,
  scheduleId: string,
  patientId: number
) => {
  return http.post<any, any>(
    API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`
  );
};
