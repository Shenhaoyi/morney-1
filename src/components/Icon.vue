<template>
  <svg class="icon">
    <use v-bind:xlink:href="'#'+name"></use>
  </svg>
</template>

<script lang="ts">
  // import x from '@/assets/icons/labels.svg';//把svg变成symbol标签。再放入svg标签中
  // import y from '@/assets/icons/money.svg';
  // import z from '@/assets/icons/statistics.svg';

  //引入所有svg
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

  export default {
    props: ['name'],
    name: 'Icon'
  };
</script>

<style lang="scss" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

</style>