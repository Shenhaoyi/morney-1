<template>
  <label class="formItem">
    <span class="name">{{this.fieldName}}</span>
    <input type="text"
           @input="onValueChanged($event.target.value)"
           :placeholder="placeholder"/>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {

    @Prop({required:true}) fieldName!: string; //required，必须传进来数据
    @Prop() placeholder?: string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 40px;
      flex-grow: 1;
      border: none;
      background: transparent;
      padding-right: 16px;
    }
  }
</style>