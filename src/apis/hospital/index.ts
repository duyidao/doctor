// @ts-ignore
import http from '@/request'

import type { HospitalDetailResponseType, HospitalDepartmentResponseType, GetCodeResponseType, userLoginDataType, LoginResponseType } from './type.ts'

enum API {
  HOSPITALDETAIL_URL = '/hosp/hospital/', // 医院详情
  HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/', // 获取医院科室
  GETUSERCODE_URL = '/sms/send/', // 获取验证码
  LOGIN_URL = '/user/login', // 登录
}

// 登录
export const loginApi = (data: userLoginDataType) => {
  return http.post<any, LoginResponseType>(API.LOGIN_URL, data)
}

// 获取验证码
export const getUserCodeApi = (phone: string) => {
  return http.get<any, GetCodeResponseType>(API.GETUSERCODE_URL + phone)
}

// 获取医院科室
export const getHospDepartmentApi = (hoscode: string) => {
  return http.get<any, HospitalDepartmentResponseType>(API.HOSPITALDEPARTMENT_URL + hoscode)
}

// 医院详情
export const getHospDetailApi = (hoscode: string) => {
  return http.get<any, HospitalDetailResponseType>(API.HOSPITALDETAIL_URL + hoscode)
}