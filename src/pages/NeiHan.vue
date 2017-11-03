<template>
  <div class="index">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <div class="header">
      <mu-appbar title="NeiHan">
        <mu-icon-button icon=":fa fa-bars" slot="left" @click="openLeftMenu"/>
        <mu-icon-button icon="search" slot="right" @click="search"/>
        <mu-icon-button icon=":fa fa-bars" slot="right" @click="openRightMenu"/>

      </mu-appbar>
    </div>

    <drawer></drawer>
    <r-drawer></r-drawer>

    <video
      src="http://ic.snssdk.com/neihan/video/playback/?video_id=64732f68329e49b3b94ce3bce8949113&quality=480p&line=0&is_gif=0&device_platform=.mp4"></video>

    <mu-list class="list mt" v-show="latest">
      <template v-for="(item,index) in latest">
        <mu-list-item>
          <mu-card>
            <mu-card-header v-if="item.user" :title="item.user.name">
              <mu-avatar v-if="item.user" :src="item.user.avatar_url" slot="avatar"/>
            </mu-card-header>


            <mu-card-media v-if="video">

              <video controls="controls"
                     :src="video"
              ></video>
            </mu-card-media>

            <!--<mu-card-media v-if="item.large_cover">-->
              <!--<img v-img :src="item.large_cover.url_list[0].url"/>-->
            <!--</mu-card-media>-->

            <mu-card-title :title="item.text" @click.native="toDetail(item.url)"/>
            <mu-divider/>

            <mu-card-actions style="display: flex">
              <mu-flat-button :label="item.digg_count+''" icon=":fa fa-bookmark"/>
              <mu-flat-button :label="item.share_count+''" icon=":fa fa-share"/>
              <mu-flat-button class="fr" :label="item.create_time|formatDate" icon=":fa fa-pencil"/>
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
  import RDrawer from '../components/R2Drawer.vue'
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
        video: '',
        category: '-101',
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
          content_type: self.category,
        }
        api.getNH(parmas).then((res) => {
          console.log(res.data.data.data)
          let arr = res.data.data.data
          for (let item of arr) {
            self.latest.push(item.group)

//            let data = item.group['360p_video']
//            if(data.url_list){
//              self.video = data.url_list[0].url
//            }
//            self.video = data.url_list[0].url
//            self.video = "http://v3-nh.ixigua.com/d18cfde3b4e3b57cd5807cdd827bd4d1/59f83f61/video/m/22052578e57260748a18219b0f94499c6e11151ee3b00005aacde1429a5/"
//         self.video = '"http://ic.snssdk.com/neihan/video/playback/?video_id=e2a5e7c2a81841169c77fa5177dbde02&quality=360p&line=0&is_gif=0&device_platform="'



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


      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      }


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

    .video {
      width: 100%;
      height: auto;
    }
    .mu-flat-button {
      min-width: 60px;
    }
  }

</style>
