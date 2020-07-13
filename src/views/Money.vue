<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <types :value.sync="record.type"/>
    <div class="notes-wrapper">
      <FormItem field-name="备注："
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <tags @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import oldStore from '@/store/index2';

  @Component({
    components: {Tags, FormItem, Types, NumberPad},
    computed: {

    }
  })
  export default class Money extends Vue {
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    onUpdateTags(value: Tag[]) {
      this.record.tags = value; //选中的tags
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    //type的更新用sync实现了

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      oldStore.createRecord(this.record);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes-wrapper {
    padding-top: 12px;
    padding-bottom: 12px;
  }
</style>

<style lang="scss" scoped>
</style>