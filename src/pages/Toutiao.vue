<template>
  <div class="index">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <div class="header">
      <mu-appbar title="Toutiao">
        <mu-icon-button icon=":fa fa-bars" slot="left" @click="openLeftMenu"/>
        <mu-icon-button icon="search" slot="right" @click="search"/>
        <mu-icon-button icon=":fa fa-bars" slot="right" @click="openRightMenu"/>

      </mu-appbar>
    </div>

    <drawer></drawer>
    <r-drawer></r-drawer>

    <mu-list class="list mt" v-show="latest">
      <template v-for="(item,index) in latest">
        <mu-list-item >
          <mu-card >
            <mu-card-header v-if="item.user_info" :title="item.user_info.name" :subTitle="item.user_info.description">
              <mu-avatar v-if="item.user_info" :src="item.user_info.avatar_url" slot="avatar"/>
            </mu-card-header>

            <mu-card-title :title="item.title" :subTitle="item.abstract" @click.native="toDetail(item.url)"/>
            <mu-divider/>

            <mu-card-actions>
              <mu-flat-button :label="item.read_count+''" icon=":fa fa-bookmark"/>
              <mu-flat-button :label="item.share_count+''" icon=":fa fa-share"/>
              <mu-flat-button class="fr" :label="item.publish_time|formatDate" icon=":fa fa-pencil"/>
            </mu-card-actions>
          </mu-card>
        </mu-list-item>
      </template>
    </mu-list>

    <!--<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>-->


  </div>
</template>

<script>
  import swiper from '../components/swiper.vue'
  import drawer from '../components/drawer.vue'
  import RDrawer from '../components/RDrawer.vue'
  import api from '../api/index'
  import * as format from '../common/DateFormat'
  import {bus} from '../common/bus'

  export default {
    name: 'index',
    components: {
      drawer,
      RDrawer
    },
    data() {
      return {
        refreshing: false,
        trigger: null,

        latest: [],
        category: 'news_hot',
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
    computed: {
      categoryIsChange() {
        return this.$store.state.category;
      }
    },
    watch: {
      categoryIsChange(res) {
        console.log(res)
        this.category = res
        this.latest = []
        this.initData()
      }
    },
    methods: {

      initData() {
        let self = this
        let parmas = {
          category: self.category,
        }
        api.getHistory(parmas).then((res) => {
          let arr = res.data.data
          for (let item of arr) {
            self.latest.push(JSON.parse(item.content))
          }

        })
      },

      openLeftMenu() {
        bus.$emit('open', true)
      },
      openRightMenu() {
        bus.$emit('openR', true)
      },

      //下拉刷新
      refresh() {
        this.refreshing = true
        this.page = 1
        this.latest = []
        this.initData()
      },

      //去详情页
      toDetail(url) {
        window.open(url)
      },
      //问答
      search() {

      },

    },
    filters: {
      formatDate(v) {
        let data = new Date(v * 1000)
        return data.toLocaleString()
      }
    }
  }
</script>

<style lang="less">
  .index {

    .mt {
      margin-top: 50px;
    }

    .mu-flat-button {
      min-width: 66px;
    }
  }

</style>
