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
  .button {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    padding: 8px 16px;
  }
</style>