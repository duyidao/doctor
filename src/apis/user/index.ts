// @ts-ignore
import http from '@/request'

import type { orderInfoResponseType } from './type.ts'

enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/', // 获取订单号码
  ORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/', // 获取订单详情
  CANCEL_URL = '/order/orderInfo/auth/cancelOrder/', // 取消预约
}

// 取消预约
export const cancelOrderApi = (id: string) => {
  return http.get<any, any>(API.CANCEL_URL + `${id}`)
}

// 获取订单详情
export const getOrderInfoApi = (id: string) => {
  return http.get<any, orderInfoResponseType>(API.ORDERINFO_URL + `${id}`)
}

// 获取订单号码
export const submitOrderApi = (hoscode: string, scheduleId: string, patientId: number) => {
  return http.post<any, any>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
}