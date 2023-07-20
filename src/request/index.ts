import axios from 'axios';
import { ElMessage } from 'element-plus';
// 对axios二次封装

const http = axios.create({
  baseURL: '/api',
  // baseURL: 'http://atguigu.com',
  timeout: 5000, // 超时时间
})

http.interceptors.request.use((config) => {
  // 请求拦截器配置对象

  return config
})

http.interceptors.response.use((response) => {
  console.log(response);
  // 响应拦截器成功回调
  return response.data
}, (error) => {
  // 响应失败.一般为网络错误或路径不存在
  ErrorMessageFn(error.response.status)

  return Promise.reject(new Error(error.message))
})

const ErrorMessageFn = (status: number) => {
  switch (status) {
    case 400:
      ElMessage.error('请求失败，请求参数有误')
      break;
    case 401:
    case 403:
      ElMessage.error('请求失败，用户未登录')
      break;
    case 404:
      ElMessage.error('请求失败，路径不存在')
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
      ElMessage.error('服务器异常,稍后再重试')
      break;
    default:
      break;
  }
}

export default http