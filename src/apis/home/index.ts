// 首页模块
// @ts-ignore
import http from '@/request'
import type { HospitalResponseType, DictCodeResponseType } from './type'

enum API {
  HOSPITAL_URL = '/hosp/hospital/', // 获取已有医院数据列表
  HOSPITALLEVELORPLACE_URL = '/cmn/dict/findByDictCode/', // 获取医院等级或地区
}

// 获取医院等级或地区
export const getHospitalDictCodeApi = (dictCode: string) => {
  return http.get<any, DictCodeResponseType>(API.HOSPITALLEVELORPLACE_URL + `${dictCode}`)
}

// 获取已有医院数据列表
export const getHospitalApi = (page: number, limit: number, params?: any) => {
  return http.get<any, HospitalResponseType>(API.HOSPITAL_URL + `${page}/${limit}`, {params})
}