<template>
    <div class="container" ref='container'>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import echarts, {EChartOption} from 'echarts';

  @Component
  export default class Chart extends Vue {
    @Prop() option?: EChartOption;

    mounted() {
      const container = this.$refs.container as HTMLDivElement;
      const chart = echarts.init(container, 'light');
      chart.setOption(this.option!);
    }

    // @Watch('option')
    //   onOptionchanged(){
    //   this.chart.setOption(this.option)
    // }
  }
</script>

<style lang="scss" scoped>

</style>