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


// 获取验证码接口类型
export interface GetCodeResponseType extends responseType {
  data: string
}


// 登录接口参数类型
export interface userLoginDataType {
  phone: string, code: string
}
// 登录接口类型
export interface LoginResponseType extends responseType {
  data: LoginType
}
export interface LoginType {
	name?: string;
	token?: string;
}


// 科室挂号接口类型
export interface BookingType {
  total: number
  bookingScheduleList: BookingScheduleList[]
  baseMap: BaseMap
}
export interface BookingScheduleList {
  workDate: string
  workDateMd: string
  dayOfWeek: string
  docCount: number
  reservedNumber: any
  availableNumber: number
  status: number
}
export interface BaseMap {
  workDateString?: string
  releaseTime?: string
  bigname?: string
  stopTime?: string
  depname?: string
  hosname?: string
}
export interface BookingResponseType extends responseType {
  data: BookingType
}