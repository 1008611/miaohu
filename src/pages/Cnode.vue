<template>
  <div class="index">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <div class="header">
      <mu-appbar title="cnode">
        <mu-icon-button icon=":fa fa-bars" slot="left" @click="openMenu"/>
        <mu-icon-button icon="fingerprint" slot="right" @click="ask"/>
      </mu-appbar>
    </div>

    <drawer></drawer>

    <mu-list class="list mt" v-show="latest">
      <template v-for="(item,index) in latest">
        <mu-list-item @click="toDetail(item.id)">
          <mu-card>
            <mu-card-header v-if="item.author.loginname" :title="item.author.loginname" :subTitle="item.create_at">
              <mu-avatar v-if="item.author" :src="item.author.avatar_url" slot="avatar"/>
              <div class="r-top" v-if="item.top && item.good">置顶</div>
              <div class="r-top" v-else-if="item.top">置顶</div>
              <div class="r-top" v-else-if="item.good">精华</div>
            </mu-card-header>

            <mu-card-title :title="item.title"/>
            <mu-divider/>

            <mu-card-actions>
              <mu-flat-button :label="item.reply_count + '/' + item.visit_count" icon=":fa fa-bookmark"/>
              <mu-flat-button class="fr" :label="item.create_at" icon=":fa fa-pencil"/>
            </mu-card-actions>


          </mu-card>
        </mu-list-item>
      </template>
    </mu-list>


    <mu-paper class="bottom-tab">
      <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
        <mu-bottom-nav-item value="all" title="首页" icon="home"/>
        <mu-bottom-nav-item value="good" title="订单" icon="assessment"/>
        <mu-bottom-nav-item value="share" title="经销商" icon="person"/>
        <mu-bottom-nav-item value="ask" title="商品" icon="local_mall"/>
        <mu-bottom-nav-item value="job" title="更多" icon="more"/>
      </mu-bottom-nav>
    </mu-paper>


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
        page: 1,
        tab: 'all',
        limit: 20,
        mdrender: '',

        loading: false,
        scroller: null,

        index: 1,
        bottomNav: 'all',
      }
    },
    mounted() {
      this.trigger = this.$el
      this.scroller = this.$el
    },
    created() {
      this.initData()
//      bus.$on('tab', res => {
//        console.log(res)
//        this.tab = res
//        this.latest = []
//        this.initData()
//      })
    },
    methods: {
      handleChange(val) {
        this.bottomNav = val
        this.tab = val
        this.latest = []
        this.initData()
      },
      initData() {
        let self = this
        let parmas = {
          page: self.page,
          tab: self.tab,
          limit: self.limit,
          mdrender: self.mdrender,
        }
        api.getTopics(parmas).then((response) => {
          console.log(response)
          self.refreshing = false
          self.loading = false

          let arr = response.data.data
          for (let i of arr) {
            self.latest.push(i)
          }

          self.latest.filter(i => {
            i.create_at = i.create_at.substr(0, 10)
          })


        })
      },

      openMenu() {
        bus.$emit('open', true)
      },

      //下拉刷新
      refresh() {
        this.refreshing = true
        this.page = 1
        this.latest = []
        this.initData()
      },
      //上拉加载
      loadMore() {
        console.log('123')
        this.loading = true
        this.page++
        this.initData()
      },
      //去详情页
      toDetail(id) {
        console.log(id)
        this.$router.push({name: 'Detail', params: {id: id}})
      },
     //问答
      ask() {
        this.$router.push({path: '/ask'})
      },

    },

  }
</script>

<style lang="less">
  .index {

    .mt {
      margin-top: 50px;
    }

    .bottom-tab {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0px;
    }
  }

</style>
