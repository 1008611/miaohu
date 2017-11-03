import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '../pages/Index.vue'
import Cnode from '../pages/Cnode.vue'
import Gank from '../pages/Gank.vue'
import Detail from '../pages/Detail.vue'
import Theme from '../pages/Theme.vue'
import Comment from '../pages/CommentDetail.vue'
import Ask from '../pages/Ask.vue'
import Toutiao from '../pages/Toutiao.vue'
import NeiHan from '../pages/NeiHan.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/cnode',
      name: 'Cnode',
      component: Cnode
    },
    {
      path: '/gank',
      name: 'Gank',
      component: Gank
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/theme/:id',
      name: 'Theme',
      component: Theme
    },
    {
      path: '/comment/:id',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/ask',
      name: 'Ask',
      component: Ask
    },{
      path: '/toutiao',
      name: 'Toutiao',
      component: Toutiao
    },{
      path: '/neihan',
      name: 'NeiHan',
      component: NeiHan
    },
  ]
})
