import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getUserCodeApi, loginApi } from '@/apis/hospital/index.ts'
import type { GetCodeResponseType, userLoginDataType, LoginResponseType, LoginType } from '@/apis/hospital/type.ts'

const useUserStore = defineStore('user', () => {
  const dialogVisible = ref<boolean>(false) // 登录弹窗是否显示

  // 发起接口获取验证码
  const getCodeFn = async (phone: string) => {
    const res: GetCodeResponseType = await getUserCodeApi(phone)
    if(res.code === 200) return res.data
    else return Promise.reject(new Error(res.message))
  }

  const userInfo = ref<LoginType>({})
  // 登录
  const loginFn = async (data: userLoginDataType) => {
    const res: LoginResponseType = await loginApi(data)
    if(res.code === 200) {
      userInfo.value = res.data
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  }

  // 退出登录
  const logout = () => {
    userInfo.value = {}
  }

  return {
    dialogVisible,
    userInfo,
    getCodeFn,
    loginFn,
    logout
  }
}, {
  persist: true
})

export default useUserStore