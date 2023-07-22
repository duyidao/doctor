// 首页模块
// @ts-ignore
import http from '@/request'
import type { HospitalResponseType, DictCodeResponseType, HospitalByNameResponseType } from './type'

enum API {
  HOSPITAL_URL = '/hosp/hospital/', // 获取已有医院数据列表
  HOSPITALLEVELORPLACE_URL = '/cmn/dict/findByDictCode/', // 获取医院等级或地区
  HOSPITALINFO_URL = '/hosp/hospital/findByHosname/', // 根据医院名称获取医院数据
}

// 根据医院名称获取医院数据
export const getHospitalInfoApi = (hosname: string) => {
  return http.get<any, HospitalByNameResponseType>(API.HOSPITALINFO_URL + `${hosname}`)
}

// 获取医院等级或地区
export const getHospitalDictCodeApi = (dictCode: string) => {
  return http.get<any, DictCodeResponseType>(API.HOSPITALLEVELORPLACE_URL + `${dictCode}`)
}

// 获取已有医院数据列表
export const getHospitalApi = (page: number, limit: number, hostype: string = '', districtCode: string = '') => {
  return http.get<any, HospitalResponseType>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
}