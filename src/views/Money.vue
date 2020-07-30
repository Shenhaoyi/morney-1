<template>
  <Layout class-prefix="layout">
    <NumberPad :amount.sync="record.amount" @submit="saveRecord"/>
    <div class="noteDate-wrapper">
      <div class="createAt-wrapper">
        <FormItem name='date'
                  type="date"
                  placeholder="输入日期"
                  :value.sync="record.createAt"/>
      </div>

      <div class="notes-wrapper">
        <FormItem name='note'
                  placeholder="输入备注…"
                  :value.sync="record.notes"/>
      </div>
    </div>
    <tags :selectedTags.sync="record.tags"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Reference.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, Tags, FormItem, Types, NumberPad},
    computed: {}
  })
  export default class Money extends Vue {
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createAt: new Date().toISOString()};
    recordTypeList = recordTypeList;

    //更新都用sync实现了
    xx(value: number) {
      this.record.amount = value;
    }

    saveRecord() {
      if (this.record.tags.length === 0) {
        window.alert('请至少选择一个标签');
      } else {
        this.$store.commit('createRecord', this.record);
        this.record.notes = '';
        this.record.tags = [];
        this.record.type = '-';
        this.record.amount = 0;
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/assets/style/helper.scss';

  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .noteDate-wrapper {
    width:100%;
    display: flex;
    /*justify-content: center;*/

    .notes-wrapper {
      width:50%;
      padding-top: 12px;
      padding-bottom: 12px;
      border:1px solid #d2d2d2;
    }

    .createAt-wrapper {
      width: 50%;
      padding-top: 12px;
      padding-bottom: 12px;
      border:1px solid #d2d2d2;
    }
  }

</style>

<style lang="scss" scoped>
</style>