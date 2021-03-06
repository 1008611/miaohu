import axios from 'axios'

// axios.defaults.withCredentials = true
axios.defaults.timeout = 5000
//
// 添加请求拦截器
axios.interceptors.request.use(
  response => {
    console.log('请求成功：')
    return response
  },
  error => {
    console.log('请求失败：')
    return Promise.reject(error)
  }
)


// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    console.log('响应成功：' + response)
    return response
  },
  error => {
    console.log('响应失败')
    return Promise.reject(error)
  }
)

//-----------------华丽丽的的分割线---------------------------------
//
import {
  Topics,
  Topic,
  Meizi,
  Robot
} from './resource'

let qs = require('qs');
export default {

  getTopics(data) {
    return axios.get(Topics + '?tab=' + data.tab + '&page=' + data.page + '&limit=' + data.limit)
  },
  getTopicsDetails(data) {
    return axios.get(Topic + '/' + data)
  },
  getMeizi(data) {
    return axios.get(Meizi + data.tab + '/' + data.pageSize + '/' + data.pageIndex)
  },
  askRobot(data) {
    return axios.post('http://www.tuling123.com/openapi/api', qs.stringify(data))
  },
  getHistory(data) {
    return axios.post('/api/news/feed/v51/', qs.stringify(data))
  },
  getNH(data) {
    return axios.post('/stream/mix/v1/',qs.stringify(data))
  }
}
