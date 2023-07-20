// 首页模块
// @ts-ignore
import http from '@/request'
import type { HospitalResponseType } from './type'

enum API {
  HOSPITAL_URL = '/hosp/hospital/', // 获取已有医院数据列表
}

// 获取已有医院数据列表
export const getHospitalApi = (page: number, limit: number, params?: any) => {
  return http.get<any, HospitalResponseType>(API.HOSPITAL_URL + `${page}/${limit}`, {params})
}