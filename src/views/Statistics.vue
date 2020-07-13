<template>
  <Layout>
    <Tabs class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"/>
    <Tabs class-prefix="interval"
          :data-source="intervalList"
          :value.sync="interval"/>
    <ol>
      <li v-for="group in result" :key="group.title">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li class="record"
              v-for="item in group.items" :key="item.createAt">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">({{item.notes}})</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<style lang="scss" scoped>
  ::v-deep {
    .type-item {
      background: white;

      &.selected {
        background: #c4c4c4;

        &::after {
          display: none;
        }
      }

    }

    .interval-item {
      height: 40px;
    }

    %item{
      padding: 8px 16px;
      line-height:24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title{
      @extend %item;
    }
    
    .record{
      @extend %item;
      background: white;
    }

    .notes{
      margin-right:auto;
      margin-left:16px;
      color:#999
    }
  }

</style>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      const hashTable: { [key: string]: { title: string; items: RecordItem[] } } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []}; //该时间段第一个就创建数组
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    tagString(tags: Tag[]){
      const tagNames = tags.map(item=>item.name)
      return tags.length===0? '无': tagNames.join('，')
  }

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';

    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }

</script>


