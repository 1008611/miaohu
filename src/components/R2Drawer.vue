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
          {title: '推荐', path: '-101', icon: ':fa fa-home'},
          {title: '视频', path: '-104', icon: ':fa fa-star'},
          {title: '段友秀', path: '-301', icon: ':fa fa-share'},
          {title: '直播', path: '-10002', icon: ':fa fa-quora'},
          {title: '图片', path: '-103', icon: ':fa fa-bank'},
          {title: '段子', path: '-102', icon: ':fa fa-bank'},
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
