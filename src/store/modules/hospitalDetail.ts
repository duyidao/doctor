import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getHospDetailApi } from '@/apis/hospital/index';
import type { HospitalDetailType, HospitalDetailResponseType } from '@/apis/hospital/type';

const useDetailStore = defineStore('detail', () => {
  const hospitalInfo = ref<HospitalDetailType>({}) // 医院详情数据

  const getHospDetailFn = async (code: string) => {
    const res: HospitalDetailResponseType = await getHospDetailApi(code)
    console.log(res)
    if(res.code === 200) {
      hospitalInfo.value = res.data
    }
  }

  return {
    hospitalInfo,
    getHospDetailFn
  }
}, {
  persist: true
})

export default useDetailStore