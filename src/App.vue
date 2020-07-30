<template>
  <div id=app ref="app">
    <router-view></router-view> <!--    替换router中设置的路径中的内容-->
  </div>
</template>

<style lang="scss">
  @import '~@/assets/style/reset.scss';
  @import '~@/assets/style/helper.scss';

  body {
    line-height: 1.5;
    font-family: $font-hei;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    background: white;
  }

  #app {
    max-width: 450px;
    margin: 0 auto;
    height:100%;
  }

</style>
