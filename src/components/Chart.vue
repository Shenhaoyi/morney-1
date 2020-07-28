<template>
  <div ref='container'>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts, {EChartOption} from 'echarts';

  @Component
  export default class Chart extends Vue {
    @Prop() option?: EChartOption

    mounted() {
      const width = document.documentElement.clientWidth
      const container =  this.$refs.container as HTMLDivElement
      container.style.width = `${width - 20}px`
      container.style.height = `${(width - 20) * 1.2}px`
      const chart = echarts.init(container, 'light')
      chart.setOption(this.option!)
    }
    @Watch('option')
      onOptionchanged(){
      this.chart.setOption(this.option)
    }
  }
</script>

<style lang="scss" scoped>

</style>