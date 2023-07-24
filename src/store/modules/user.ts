import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getUserCodeApi } from '@/apis/hospital/index.ts'
import type { GetCodeResponseType } from '@/apis/hospital/type.ts'

const useUserStore = defineStore('user', () => {
  const dialogVisible = ref<boolean>(false) // 登录弹窗是否显示

  // 发起接口获取验证码
  const getCodeFn = async (phone: string) => {
    const res: GetCodeResponseType = await getUserCodeApi(phone)
    if(res.code === 200) return res.data
    else return Promise.reject(new Error(res.message))
  }

  return {
    dialogVisible,
    getCodeFn
  }
}, {
  persist: true
})

export default useUserStore