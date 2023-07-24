import { ref } from 'vue';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', () => {
  const dialogVisible = ref<boolean>(false) // 登录弹窗是否显示

  return {
    dialogVisible,
  }
}, {
  persist: true
})

export default useUserStore