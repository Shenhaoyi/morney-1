<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script>
  export default {
    name: 'Types',
    props:['xxx'],
    data() {
      return {
        type: '-', // '-'表示支出，'+'表示收入
      }
    },
    methods: {
      selectType(type) { //type 只能是是 '-' 和 '+' 中的一个
        if (type !== '-' && type !== '+') {
          throw new Error('type is unknown')
        }
        this.type = type
      }
    },
    mounted(){
      console.log(this.xxx)
    }
  }
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