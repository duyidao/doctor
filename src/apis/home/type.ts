interface responseType {
  code: number,
  message: string,
  ok: boolean
}

export interface Param {
  hostypeString: string;
  fullAddress: string;
}

export interface BookingRule {
  cycle: number;
  releaseTime: string;
  stopTime: string;
  quitDay: number;
  quitTime: string;
  rule: string[];
}

export interface Content {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro?: any;
  route: string;
  status: number;
  bookingRule: BookingRule;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

// 获取医院列表类型
export interface HospitalResponseType extends responseType {
  data: {
    content: Content[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    sort: Sort;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  }
}


// 获取医院等级或地区接口类型
export interface DictCodeType {
    id: number
    createTime: string
    updateTime: string
    isDeleted: number
    param: Param
    parentId: number
    name: string
    value: string
    dictCode: string
    hasChildren: boolean
}
export interface DictCodeResponseType extends responseType {
  data: DictCodeType[]
}


// 根据名称获取医院数据类型
export interface HospiatlByNameParam {}

export interface BookingRule {
  cycle: number
  releaseTime: string
  stopTime: string
  quitDay: number
  quitTime: string
  rule: string[]
}
export interface HospiatlByNameType {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: HospiatlByNameParam
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro: string
  route: string
  status: number
  bookingRule: BookingRule
}

export interface HospitalByNameResponseType extends responseType {
  data: HospiatlByNameType[]
}
