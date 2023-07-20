// @ts-ignore
import http from '@/request'

export const getBanner = (page: number, limit: number) => {
  return http.get(`/hosp/hospital/${page}/${limit}`)
}