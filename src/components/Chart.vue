<template>
  <div class="container" ref='container'>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts, {EChartOption, ECharts} from 'echarts';

  @Component
  export default class Chart extends Vue {
    @Prop() option?: EChartOption;
    chart?: ECharts;

    mounted() {
      const container = this.$refs.container as HTMLDivElement;
      this.chart = echarts.init(container, 'light');
      this.chart.setOption(this.option!);
    }

    @Watch('option')
    onOptionchanged() {
      this.chart?.setOption(this.option!);
    }
  }
</script>

<style lang="scss" scoped>

</style>