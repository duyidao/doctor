// @ts-ignore
import http from '@/request'

import type { HospitalDetailResponseType, HospitalDepartmentResponseType } from './type.ts'

enum API {
  HOSPITALDETAIL_URL = '/hosp/hospital/', // 医院详情
  HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/', // 获取医院科室
}

// 获取医院科室
export const getHospDepartmentApi = (hoscode: string) => {
  return http.get<any, HospitalDepartmentResponseType>(API.HOSPITALDEPARTMENT_URL + hoscode)
}

// 医院详情
export const getHospDetailApi = (hoscode: string) => {
  return http.get<any, HospitalDetailResponseType>(API.HOSPITALDETAIL_URL + hoscode)
}