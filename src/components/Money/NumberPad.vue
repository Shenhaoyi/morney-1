<template>
  <div class="numberPad">
    <div class="output">￥{{output}}</div>
    <div class="buttons">
      <button @click.prevent="inputContent">1</button>
      <button @click.prevent="inputContent">2</button>
      <button @click.prevent="inputContent">3</button>
      <button @click.prevent="remove">
        <Icon class="leftIcon" name="delete"></Icon>
      </button>
      <button @click.prevent="inputContent">4</button>
      <button @click.prevent="inputContent">5</button>
      <button @click.prevent="inputContent">6</button>
      <button @click.prevent="clear">归零</button>
      <button @click.prevent="inputContent">7</button>
      <button @click.prevent="inputContent">8</button>
      <button @click.prevent="inputContent">9</button>
      <button class="ok" @click="ok">确定</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click.prevent="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class NumberPad extends Vue {
    @Prop() amount!: number;
    output = this.amount.toString(); //这个句子只在一开始执行一次！！


    x(isoString: string) {
      return dayjs(isoString).format('YYYY-MM-DD');
    }


    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement); //强制指定为button
      const input = button.textContent!;
      if (this.output.length === 16) return;
      //已经存在'.'了
      if (this.output.indexOf('.') > -1 && input === '.') {
        return;
      }
      //第一个输入
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) > -1) {
          this.output = input;
          return;
        }
      }
      this.output += input;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
        return;
      }
      this.output = this.output.slice(0, -1);
    }

    clear() {
      this.output = '0';
    }

    ok() {
      this.$emit('update:amount', parseFloat(this.output));
      this.$emit('submit');
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .numberPad {
    .output {
      font-size: 24px;
      padding: 9px 16px;
      text-align: right;
      background: white;
      border: 1px solid #d2d2d2;
    }

    .buttons {
      //引入清除浮动
      @extend %clearFix;

      > button {
        float: left;
        width: 25%;
        height: 64px;
        background: transparent;
        border: 1px solid #d2d2d2;

        &:active {
          background: $theme-color;
        }

        &.ok {
          height: 64*2px;
          float: right;
          background: $theme-color;
        }

        &.zero {
          width: 25*2%;
        }
      }
    }
  }
</style>