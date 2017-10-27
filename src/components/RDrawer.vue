<template>

  <mu-drawer right :open="openRightMenu" :docked="docked" @close="closeMenu()">
    <mu-list>
      <mu-list-item :title="item.title" v-for="(item,index) in themeList" :key="index" @click="switchTheme(item.path)">
        <mu-icon slot="right" :value="item.icon"/>
      </mu-list-item>
    </mu-list>

  </mu-drawer>

</template>

<script>
  import api from '../api/index'
  import {bus} from '../common/bus'

  export default {
    name: '',
    data() {
      return {
        themeList: [
          {title: '热点', path: 'news_hot', icon: ':fa fa-home'},
          {title: '视频', path: 'video', icon: ':fa fa-star'},
          {title: '社会', path: 'news_society', icon: ':fa fa-share'},
          {title: '娱乐', path: 'news_entertainment', icon: ':fa fa-quora'},
          {title: '问答', path: 'question_and_answer', icon: ':fa fa-bank'},
          {title: '图片', path: '组图', icon: ':fa fa-bank'},
          {title: '科技', path: 'news_tech', icon: ':fa fa-bank'},
          {title: '汽车', path: 'news_car', icon: ':fa fa-bank'},
          {title: '体育', path: 'news_sport', icon: ':fa fa-bank'},
          {title: '财经', path: 'news_finance', icon: ':fa fa-bank'},
          {title: '军事', path: 'news_military', icon: ':fa fa-bank'},
          {title: '国际', path: 'news_world', icon: ':fa fa-bank'},
          {title: '段子', path: 'essay_joke', icon: ':fa fa-bank'},
          {title: '趣图', path: 'image_funny', icon: ':fa fa-bank'},
        ],
        docked: true,
        openRightMenu: false,
      }
    },
    created() {
      bus.$on('openR', res => {
        console.log(res)
        this.openRightMenu = true
        this.docked = false
      })
    },
    methods: {
      closeMenu() {
        this.openRightMenu = false
      },

      //去详情页
      switchTheme(v) {
        this.openRightMenu = false
        this.$store.commit('CHANGE_CATEGORY',v)
//        this.$store.dispatch('changecategory',v)
      }

    }
  }
</script>

<style lang="less" scoped>

</style>
