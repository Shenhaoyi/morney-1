<template>
  <div id=app>
    <router-view></router-view> <!--    替换router中设置的路径中的内容-->
  </div>
</template>

<style lang="scss">
  @import '~@/assets/style/reset.scss';
  @import '~@/assets/style/helper.scss';

  body {
    line-height: 1.5;
    font-family: $font-hei;
    font-size:16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }

</style>
