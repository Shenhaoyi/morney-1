<template>
  <div class="wrapper">
    <Icon class="icon" :name="name"></Icon>
    <label class="formItem">
      <template v-if="type === 'date'">
        <input :type="type"
               :value="format(value)"
               class='date'
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder"/>
      </template>
      <template v-else>
        <input :type="type || 'text'"
               :value="value"
               class='type'
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder"/>
      </template>
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class FormItem extends Vue {

    @Prop({required: true}) name!: string; //required，必须传进来数据
    @Prop() placeholder?: string;
    @Prop() value?: string;
    @Prop() type?: string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }

    format(isoString: string) {
      return dayjs(isoString).format('YYYY-MM-DD').toString();
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .wrapper{
    display: flex;
    align-items: center;

    .icon {
      padding-left:10px;
      width:20%;
      min-width:20px;
    }

    .formItem {
      padding-left:10px;
      font-size: 18px;
      width:80%;

      input {
        max-width: 100%;
        flex-grow: 1;
        background: transparent;
        border: none;
      }
    }
  }

</style>