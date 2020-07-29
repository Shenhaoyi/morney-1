<template>
  <div>
    <button class="button">
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';


  @Component
  export default class Button extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .button {
    background: $theme-color;
    color: black;
    border-radius: 4px;
    border: 1px solid black;
    padding: 8px 16px;
  }
</style>