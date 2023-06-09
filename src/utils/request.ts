/**
 * @description [ axios 请求封装]
 */
import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { showDialog, showToast } from 'vant'
import { config } from '@/config'

const service = axios.create({
  baseURL: config.baseApi, // url = base url + request url
  timeout: 5000,
  headers: {}
})

// Request interceptors
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('config:', config)
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 0) {
      // token 过期
      if (res.code === 401) {
        // 警告提示窗
        return
      }
      if (res.code == 403) {
        return
      }
      // 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // 注意返回值
      return response.data
    }
  },
  (error: any) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          error.message = '未授权,请登录(401)'
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 405:
          error.message = '请求方法未允许(405)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器内部错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = `连接错误: ${error.message}`
      }
    } else {
      if (error.message == 'Network Error') {
        error.message == '网络异常，请检查后重试！'
      }
      error.message = '连接到服务器失败，请联系管理员'
    }
    showToast(error.message)
    // store.auth.clearAuth()
    // store.dispatch('clearAuth')
    return Promise.reject(error)
  }
)

export default service
