import {
  API_CNODE,
  API_GANK,
} from './config.js'

let api_cnode = {
  Topics:'/topics',
  Topic:'/topic'
}

let api_gank = {
  Meizi:'/data/',
}

export const Topics = API_CNODE.concat(api_cnode.Topics)  //主题首页
export const Topic = API_CNODE.concat(api_cnode.Topic)  //主题详情


export const Meizi = API_GANK.concat(api_gank.Meizi)  //Meizi

export const Robot = '/api/'  //Robot




