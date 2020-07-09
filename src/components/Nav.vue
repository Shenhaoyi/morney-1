<template>
  <nav>
    <router-link to="/money" class="item" active-class='selected'>
      <Icon name="money"></Icon>
      记账
    </router-link>

    <router-link to="/labels" class="item" active-class='selected'>
      <Icon name="labels"></Icon>
      标签
    </router-link>

    <router-link to="/statistics" class="item" active-class='selected'>
      <Icon name="statistics"></Icon>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav',
  };
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  nav {
    @extend %outterShadow;
    display: flex;
    font-size: 12px;

    > .item {
      padding: 2px 0;
      width: 33.333%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .icon {
        width: 32px;
        height: 32px;
      }

    }
    > .item.selected {
      color:$color-highlight;
    }
  }
</style>