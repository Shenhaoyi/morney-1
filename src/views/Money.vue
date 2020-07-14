<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <div class="notes-wrapper">
      <FormItem field-name="备注："
                placeholder="在这里输入备注"
                :value.sync="record.notes"/>
    </div>
    <tags @update:value="onUpdateTags"/>
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
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createAt:''};
    recordTypeList = recordTypeList;

    onUpdateTags(value: Tag[]) {
      this.record.tags = value; //选中的tags
    }

    //type的更新用sync实现了

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      if(this.record.tags.length ===0){
        window.alert('请至少选择一个标签')
      }else{
        this.$store.commit('createRecord', this.record);
        this.record.notes=''
      }
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