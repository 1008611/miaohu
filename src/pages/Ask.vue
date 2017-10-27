<template>
  <div class="ask">

    <mu-appbar title="福布斯最佳候选人">
      <mu-icon-button icon="close" slot="left" @click="goBack"/>
    </mu-appbar>


    <mu-list class="ask-content" id="myData">

      <template v-for="(item,index) in list">

        <mu-list-item v-if="item.robotText">
          <mu-avatar slot="leftAvatar" icon="android"/>
          <mu-card>
            <mu-card-text>{{item.robotText}}</mu-card-text>
          </mu-card>
        </mu-list-item>

        <mu-list-item v-else>
          <mu-card>
            <mu-card-text>{{item.text}}</mu-card-text>
            <mu-flat-button v-if="item.url" @click="toDetail(item.url)" label="查看详情" labelPosition="before" icon=":fa fa-arrow-right"/>
          </mu-card>
          <mu-avatar slot="rightAvatar" icon=":fa fa-opencart"/>
        </mu-list-item>

      </template>
    </mu-list>

    <div class="b-input">
      <mu-text-field label="come on " v-model="info" :errorText="errorText" @keyup.enter.native="sendMsg" labelFloat/>
      <mu-icon-button icon=":fa fa-send" @click="sendMsg"/>
    </div>
  </div>
</template>

<script>

  import api from '../api/index'

  export default {
    name: '',
    data() {
      return {
        info: '',
        errorText: '',
        result: '',
        list: []
      }
    },
    watch: {
      list() {
        console.log(this.list)
        console.log(document.getElementById('myData').scrollTop)
        console.log(document.getElementById('myData').scrollHeight)

        this.$nextTick(function () {
          document.getElementById('myData').scrollTop = document.getElementById('myData').scrollHeight;
        })

      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      sendMsg() {
        if (this.info) {
          this.errorText = ''
          this.list.push({robotText: this.info})
          this.getMsg()
        } else {
          this.errorText = '发送内容不能为空'
          return
        }
      },
      getMsg() {
        let self = this
        let params = {
          key: 'd379909848d2aeb63f34e1f14f094fba',
          info: self.info,
          userid: '123123'
        }

        api.askRobot(params).then((res) => {
          self.list.push(res.data)
          self.info = ""
        })
      },
      toDetail(url){
        window.open(url)
      },
    }
  }
</script>

<style lang="less">
  .ask {
    width: 100%;
    height: 100%;
    .ask-content {
      position: relative;
      padding: 5px;
      height: 530px;
      margin-bottom: 70px;
    }
    .b-input {
      width: 100%;
      position: fixed;
      bottom: 0px;
      left: 0px;
      text-align: center;
      background-color: #e4e4e4;
    }
  }

</style>
