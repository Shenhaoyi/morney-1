<template>
  <label class="formItem">
    <span class="name">{{this.fieldName}}</span>
    <template v-if="type === 'date'">
      <input :type="type"
             :value="x(value)"
             class = 'date'
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder"/>
    </template>
    <template v-else>
      <input :type="type || 'text'"
             :value="value"
             class = 'type'
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder"/>
    </template>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class FormItem extends Vue {

    @Prop({required:true}) fieldName!: string; //required，必须传进来数据
    @Prop() placeholder?: string;
    @Prop() value?: string
    @Prop() type?: string

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }
    x(isoString: string){
      return dayjs(isoString).format('YYYY-MM-DD')
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .formItem {
    font-size: 20px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    //@extend %outterShadow;
    /*box-shadow:;*/




    .name {
      /*padding-right: 16px;*/
      /*border:1px solid red;*/
    }

    /*.date{*/
    /*  text-align: center;*/
    /*  border: none;*/
    /*  background: white;*/
    /*}*/

    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border:none;
      padding-right: 16px;
    }
  }
</style>