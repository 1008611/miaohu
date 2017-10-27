<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  #app {

    .header {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 40px;
      z-index: 9;
    }
    .list {
      background: #F2F2F2;
      .r-top {
        float: right;
        padding: 2px 4px;
        background: #80bd01;
        border-radius: 5px;
        font-size: 12px;
        color: #fff;
      }
      .fr {
        float: right;
      }
      .mu-icon {
        font-size: 16px
      }
      .mu-flat-button-label {
        font-size: 12px
      }
    }
    .mu-card-title-container {
      padding-top: 0;
    }
    .mu-card-title {
      font-size: 18px;
    }

    .mu-card-header-title {
      margin-right: 25px;
      padding-right: 25px;
    }

  }
</style>
