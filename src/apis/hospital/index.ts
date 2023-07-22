// @ts-ignore
import http from '@/request'

import type { HospitalDetailResponseType } from './type.ts'

enum API {
  HOSPITALDETAIL_URL = '/hosp/hospital/', // 医院详情
}

// 医院详情
export const getHospDetailApi = (hoscode: string) => {
  return http.get<any, HospitalDetailResponseType>(API.HOSPITALDETAIL_URL + hoscode)
}