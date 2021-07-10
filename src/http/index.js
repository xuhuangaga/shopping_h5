// 封装axios
import axios from 'axios'
import { Toast } from 'vant'

let http = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 相应拦截
//处理每次请求的结果（成功和失败）
http.interceptors.response.use(res => {
  return res.data
}, err => {
  //每次请求失败的状态码
  let status = err.response & err.response.status
  switch (status) {
    case 400:
      Toast.fail('参数错误')
      break;
    case 401:
      Toast.fail('登录过期')
      break
    case 403:
      Toast.fail('没有权限')
      break
    case 404:
      Toast.fail('路径错误')
      break
    case 500:
      Toast.fail('服务器错误')
      break
    case 503:
      Toast.fail('服务器维护')
      break;
  }
  return Promise.reject(err)
})

export default http