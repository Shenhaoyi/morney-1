<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource"
        class="tabs-item"
        :class="{selected : item.value === value, [classPrefix+'-item']:classPrefix}"
        :key="item.value"
        @click="select(item)"

    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = {text: string; value: string}

  @Component
  export default class Tabs extends Vue {
    @Prop({required:true,type:Array})
    dataSource!: DataSourceItem[]   //强制初始化的写法,

    @Prop()
    readonly value!: string;

    @Prop(String)
    classPrefix?: string  //？表示可能是undefined

    select(item: DataSourceItem){
        this.$emit('update:value',item.value)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .tabs {
    background: #c4c4c4;
    display: flex;
    font-size: 24px;

    &-item {
      width: 50%;
      line-height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected {
        /*&表示li表示当前的li被selected的*/
        &::after {
          content: '';
          /*不写是话不会出现*/
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #333;
        }
      }
    }
  }
</style>