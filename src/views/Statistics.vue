<template>
  <Layout>
    <Tabs class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"/>
    <Chart :option="option"></Chart>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,key) in groupedList" :key="key">
        <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
        <ol>
          <li class="record"
              v-for="item in group.items" :key="item.createAt">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes.length>0 ? '('+'备注：'+item.notes+')':''}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="no-result">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Chart from '@/components/Chart.vue';

  @Component({
    components: {Chart, Tabs},
  })
  export default class Statistics extends Vue {
    get option() {
      return {
        title: {
          show: true,
          text: '销量统计',
          right: 20
        },
        tooltip: {
          show: true
        },
        legend: {
          data: ['金额']
        },
        xAxis: {
          type: 'category',
          data: ['1', '2']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          lineStyle: {
            color: 'blue'
          },
          itemStyle: {
            borderWidth: 10
          },
          name: '金额',
          data: ['12', '23'],
          type: 'line'
        }]
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    //按照type筛选，并按日期放置
    get groupedList() {
      const {recordList} = this;
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      if (recordList.length < 1) return []; //as Result[]
      const newRecordList = clone(recordList).filter(item => item.type === this.type).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
      if (newRecordList.length < 1) return []; //as Result[]
      const result: Result = [{
        title: dayjs(newRecordList[0].createAt).format('YYYY-MM-DD'),
        items: [newRecordList[0]]
      }];
      for (let i = 1; i < newRecordList.length; i++) {
        const current = newRecordList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.forEach(group => {
        group.total = group.items.reduce((sum, item) => {return sum + item.amount;}, 0);
      });
      return result;
    }

    type = '-';

    recordTypeList = recordTypeList;

    created() {
      this.$store.commit('fetchRecords');
    }

    tagString(tags: Tag[]) {
      const tagNames = tags.map(item => item.name);
      return tags.length === 0 ? '无' : tagNames.join('，');
    }

    beautify(date: string) {
      const api = dayjs(date);  //可以转换成中国标准时间
      const now = dayjs(); //获取现在的中国标准时间
      if (api.isSame(now, 'day')) {
        return '今天';
      } else if (api.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (api.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (api.isSame(now, 'year')) {
        return api.format('M月D日');
      }
      {
        return api.format('YYYY年M月D日');
      }
    }
  }
</script>


<style lang="scss" scoped>
  ::v-deep {
    .type-item {
      background: #c4c4c4;

      &.selected {
        background: white;

        &::after {
          display: none;
        }
      }

    }

    .interval-item {
      height: 40px;
    }

    %item {
      padding: 8px 16px;
      line-height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      @extend %item;
    }

    .record {
      @extend %item;
      background: white;
    }

    .notes {
      margin-right: auto;
      margin-left: 16px;
      color: #999
    }
  }

  .no-result {
    padding: 16px;
    text-align: center;
  }
</style>