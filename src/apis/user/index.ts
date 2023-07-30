// @ts-ignore
import http from "@/request";

import type {
  orderInfoResponseType,
  qrCodeResponseType,
  payResponseType,
  UserInfoResponseType,
  CertifiteResponseType,
  OrderListResponseType,
  AllUserResponseType,
  OrderStatuResponseType,
  AddUpdateDataType,
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
  USERORDERLIST_URL = "/order/orderInfo/auth/", // 获取挂号订单列表
  USERALL_URL = "/user/patient/auth/findAll", // 获取就诊人信息
  ORDERSTATUS_URL = "/order/orderInfo/auth/getStatusList", // 获取订单状态
  CITY_URL = "/cmn/dict/findByParentId/", // 获取城市数据
  ADDUSER_URL = "/user/patient/auth/save", // 新增就诊人
  UPDATEUSER_URL = "/user/patient/auth/update", // 编辑就诊人
  REMOVEUSER_URL = "/user/patient/auth/remove/", // 删除就诊人
}

// 删除就诊人
export const removeUserApi = (id: string) => {
  return http.delete<any, any>(API.REMOVEUSER_URL + id);
};

// 新增就诊人
export const addUserApi = (data: AddUpdateDataType) => {
  return http.post<any, any>(API.ADDUSER_URL, data);
};

// 编辑就诊人
export const updateUserApi = (data: AddUpdateDataType) => {
  return http.put<any, any>(API.UPDATEUSER_URL, data);
};

// 获取城市数据
export const getCityApi = (id: string) => {
  return http.get<any, any>(API.CITY_URL + id);
};

// 获取就诊人信息
export const getAllUserApi = () => {
  return http.get<any, AllUserResponseType>(API.USERALL_URL);
};

// 获取订单状态
export const getAllOrderStatusApi = () => {
  return http.get<any, OrderStatuResponseType>(API.ORDERSTATUS_URL);
};

// 获取挂号订单列表
export const getUserOrderListApi = (
  page: number,
  limit: number,
  patientId: string,
  orderStatus: string
) => {
  return http.get<any, OrderListResponseType>(
    API.USERORDERLIST_URL +
      `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`
  );
};

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
