<template>
  <ul class="types">
    <li :class="{selected:value === '-', [classPrefix+'-item']:classPrefix}"
        @click="selectType('-')">支出
    </li>
    <li :class="{selected:value === '+', [classPrefix+'-item']:classPrefix}"
        @click="selectType('+')">收入
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component //引入component修饰器，修饰在class上
  //让下面这些东西会自动处理成data等

  export default class Types extends Vue {
    @Prop() readonly value!: string;
    @Prop(String) classPrefix?: string  //？表示可能是undefined
    //@Prop(Number) xxx = 0;  //给初始值之后ts会自动猜类型，也不用对undefined负责l
    //如果有undefined,则后面用到xxx的地方都需要进行undefined检测
    //Prop装饰器，告诉vue这不是data，是props
    //声明Number，是告诉vue这是个Number——运行时
    //名字叫propA
    //number或者undefined 告诉 TS 这个数据的类型——编译时

    selectType(type: string) { //type 只能是是 '-' 和 '+' 中的一个
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      }
      this.$emit("update:value",type)
    }
  }

  // export default {
  //   name: 'Types',
  //   props:['xxx'],
  //   data() {
  //     return {
  //       type: '-', // '-'表示支出，'+'表示收入
  //     }
  //   },
  //   methods: {
  //     selectType(type) { //type 只能是是 '-' 和 '+' 中的一个
  //       if (type !== '-' && type !== '+') {
  //         throw new Error('type is unknown')
  //       }
  //       this.type = type
  //     }
  //   },
  //   mounted(){
  //   }
  // }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .types {
    background: #c4c4c4;
    display: flex;
    font-size: 24px;

    > li {
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