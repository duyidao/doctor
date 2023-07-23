import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getHospDetailApi, getHospDepartmentApi } from '@/apis/hospital/index';
import type { HospitalDetailType, HospitalDetailResponseType, HospitalDepartmentResponseType, HospitalDepartmentItemType } from '@/apis/hospital/type';

const useDetailStore = defineStore('detail', () => {
  const hospitalInfo = ref<HospitalDetailType>({}) // 医院详情数据

  const getHospDetailFn = async (code: string) => {
    const res: HospitalDetailResponseType = await getHospDetailApi(code)
    if(res.code === 200) {
      hospitalInfo.value = res.data
    }
  }

  const hospitalDepartmentData = ref<HospitalDepartmentItemType[]>([])
  // 获取科室
  const getHospDepartmentFn = async (code: string) => {
    const res: HospitalDepartmentResponseType = await getHospDepartmentApi(code)
    console.log(res)
    if(res.code === 200) {
      hospitalDepartmentData.value = res.data
    }
  }

  return {
    hospitalInfo,
    hospitalDepartmentData,
    getHospDetailFn,
    getHospDepartmentFn
  }
}, {
  persist: true
})

export default useDetailStore