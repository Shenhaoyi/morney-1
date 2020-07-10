<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清除</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    output = '0';

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
      if(this.output.length===1) {
        this.output ='0';
        return
      }
      this.output = this.output.slice(0, -1);
    }

    clear() {
      this.output = '0';
    }

    ok() {
      this.$emit('update:value', this.output);
      this.$emit('submit',this.output)
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .numberPad {
    .output {
      //@extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace; /*设置等宽字体，与系统一致*/
      padding: 9px 16px;
      text-align: right;
      height: 72px;
    }

    .buttons {
      //引入清除浮动
      @extend %clearFix;

      > button {
        float: left;
        width: 25%;
        height: 64px;
        background: transparent;
        border: none;

        &.ok {
          height: 64*2px;
          float: right;
        }

        &.zero {
          width: 25*2%;
        }

        $bg: #f2f2f2;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 8%);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 12%);
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 16%);
        }

        &:nth-child(12) {
          background: darken($bg, 24%);
        }

        &:nth-child(14) {
          background: darken($bg, 20%);
        }
      }
    }
  }
</style>