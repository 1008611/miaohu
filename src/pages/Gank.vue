<template>
  <div class="gank">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <div class="header">
      <mu-appbar title="gank">
        <mu-icon-button icon=":fa fa-bars" slot="left" @click="openMenu"/>
      </mu-appbar>
    </div>

    <mu-tabs class="gank-tab" :value="activeTab" @change="handleTabChange">
      <mu-tab value="前端" icon="invert_colors" title="前端"/>
      <mu-tab value="休息视频" icon="live_tv" title="休息视频"/>
      <mu-tab value="福利" icon="pages" title="福利"/>
      <mu-tab value="拓展资源" icon="whatshot" title="拓展资源"/>
      <!--<mu-tab value="瞎推荐" icon="person_pin" title="瞎推荐"/>-->
    </mu-tabs>

    <drawer></drawer>

    <div class="fuli-list" v-if="activeTab=='福利'">
      <mu-grid-list>
        <mu-grid-tile v-for="tile,index in latest" :key="'tile' + index">
          <img v-img :src="tile.url"/>
        </mu-grid-tile>
      </mu-grid-list>
    </div>


    <mu-list class="list gank-list" v-show="latest" v-else>
      <template v-for="(item,index) in latest">
        <mu-list-item @click="toDetail(item.url)">
          <mu-card>
            <mu-card-header :title="item.desc" :subTitle="item.createdAt">
              <!--<mu-avatar slot="avatar" color="deepOrange300" backgroundColor="purple500">{{item.type}}</mu-avatar>-->
              <mu-avatar slot="avatar" :icon="icon" color="deepOrange300" backgroundColor="purple500"></mu-avatar>
            </mu-card-header>
          </mu-card>
        </mu-list-item>
      </template>
    </mu-list>


    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>


  </div>
</template>

<script>
  import swiper from '../components/swiper.vue'
  import drawer from '../components/drawer.vue'
  import api from '../api/index'
  import * as format from '../common/DateFormat'
  import {bus} from '../common/bus'

  export default {
    name: 'index',
    components: {
      drawer
    },
    data() {
      return {
        refreshing: false,
        trigger: null,

        latest: [],
        pageSize: 20,
        pageIndex: 1,
        activeTab: '前端',
        icon: 'invert_colors',
        loading: false,
        scroller: null,

      }
    },
    mounted() {
      this.trigger = this.$el
      this.scroller = this.$el
    },
    created() {
      this.initData()
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val
        this.tab = val
        this.latest = []
        switch (val) {
          case '前端':
            this.icon = 'invert_colors'
            break
          case '休息视频':
            this.icon = 'live_tv'
            break
          case '福利':
            this.icon = 'pages'
            break
          case '拓展资源':
            this.icon = 'whatshot'
            break
        }

        this.initData()
      },
      initData() {
        let self = this
        let parmas = {
          pageSize: self.pageSize,
          pageIndex: self.pageIndex,
          tab: self.activeTab
        }
        api.getMeizi(parmas).then((res) => {
          console.log(res)
          console.log(res.data.results)
          self.refreshing = false
          self.loading = false
//          self.latest = res.data.results

          let arr = res.data.results
          for (let i of arr) {
            self.latest.push(i)
          }

          self.latest.filter(i => {
            i.createdAt = i.createdAt.substr(0, 10)
          })
        })
      },

      openMenu() {
        bus.$emit('open', true)
      },

      //下拉刷新
      refresh() {
        this.refreshing = true
        this.pageIndex = 1
        this.latest = []
        this.initData()
      },
      //上拉加载
      loadMore() {
        console.log('123')
        this.loading = true
        this.pageIndex++
        this.initData()
      },
      //去详情页
      toDetail(url) {
        console.log(url)
//        this.$router.push({name: 'Detail', params: {id: id}})
        window.open(url);
      },

    },

  }
</script>

<style lang="less">
  .gank {
    .gank-tab {
      position: fixed;
      left: 0;
      top: 50px
    }
    .gank-list {
      margin-top: 120px;
    }
    .fuli-list {
      position: relative;
      margin-top: 150px;
    }

    .mu-avatar-inner {
      font-size: 12px;
    }
  }

</style>
