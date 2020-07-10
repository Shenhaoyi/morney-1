<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <types :value.sync="record.type"/>
    <notes @update:value="onUpdateNotes"/>
    <tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';

  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
  }

  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {tags: [], notes: '', type: '-', amount: 0};
    recordList: Record[] = [];  //数组成员是Record类型

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateType(value: string) {
      this.record.type = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      const record2 = JSON.parse(JSON.stringify((this.record)));
      this.recordList.push(record2);
    }
    @Watch('recordList')
    onRecordListChange(){
      localStorage.setItem('recordList',JSON.stringify(this.recordList)) //转化为字符串保存
    }
  }
</script>

<style lang="scss">
  .layout-content {
    border: 3px solid red;
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
</style>