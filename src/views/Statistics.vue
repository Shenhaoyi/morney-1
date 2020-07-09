<template>
  <div>
    <div class="nav-wrapper">
      <div class="content">
        Statistics.vue
      </div>
      <Nav/>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Statistics',
  };
</script>

<style lang="scss" scoped>
  .nav-wrapper {
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .content {
    overflow:auto; //由浏览器定夺，如果内容被修剪，就会显示滚动条
    flex-grow: 1;  //分配多余空间，其他的默认为0，不分配，所以都分配给content
    border:1px solid blue;
  }
</style>