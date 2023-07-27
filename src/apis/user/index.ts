// @ts-ignore
import http from '@/request'

enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/', // 获取订单号码
}

// 获取订单号码
export const submitOrderApi = (hoscode: string, scheduleId: string, patientId: number) => {
  return http.post<any, any>(API.SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/', // 获取订单号码
  + `${hoscode}/${scheduleId}/${patientId}`)
}