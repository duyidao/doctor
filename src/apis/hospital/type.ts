interface responseType {
  code: number,
  message: string,
  ok: boolean
}

// 医院详情类型
export interface HospitalDetailResponseType extends responseType {
  data: HospitalDetailType
}
export interface HospitalDetailType {
  bookingRule?: BookingRule
  hospital?: Hospital
}

export interface BookingRule {
  cycle: number
  releaseTime: string
  stopTime: string
  quitDay: number
  quitTime: string
  rule: string[]
}

export interface Hospital {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: Param
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro: any
  route: string
  status: number
  bookingRule: any
}

export interface Param {
  hostypeString: string
  fullAddress: string
}


// 科室接口返回类型
export interface HospitalDepartmentResponseType extends responseType {
  data: HospitalDepartmentItemType[]
}
export interface HospitalDepartmentItemType {
  depcode: string
  depname: string
  children?: Children[]
}

export interface Children {
  depcode: string
  depname: string
  children: any
}