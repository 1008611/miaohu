<template>

  <mu-drawer :open="openLeftMenu" :docked="docked" @close="closeMenu()">
    <div class="drawer-header">
      <mu-list-item title="妙乎" disabled class="mt8">
        <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">2B</mu-avatar>
      </mu-list-item>
    </div>

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
          {title:'cnode',path:'/cnode',icon:':fa fa-home'},
          {title:'gank',path:'/gank',icon:':fa fa-star'},
          {title:'toutiao',path:'/toutiao',icon:':fa fa-share'},
          {title:'neihan',path:'/neihan',icon:':fa fa-quora'},
          {title:'sss',path:'job',icon:':fa fa-bank'},
        ],
        docked: true,
        openLeftMenu: false,
      }
    },
    created() {
      bus.$on('open', res => {
        console.log(res)
        this.openLeftMenu = true
        this.docked = false
      })
    },
    methods: {
      closeMenu() {
        this.openLeftMenu = false
      },

      //去详情页
      switchTheme(v) {
        this.openLeftMenu = false
        this.$router.push({path: v})
//        bus.$emit('tab', v)
      }

    }
  }
</script>

<style lang="less" scoped>
  .drawer-header {
    padding: 5px;
    background-color: #e57373;
    .mt8 {
      margin-top: 8px;
    }
    .mu-flat-button {
      color: #fff;
    }
    .mu-item {
      color: #fff;
    }
  }

</style>
