<template>
  <Layout>
    <Tabs class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"/>
    <div class="wrapper" ref="wrapper">
      <Chart class='chart' :option="option"></Chart>
    </div>
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

    get recordList() {
      return (this.$store.state as RootState)?.recordList;
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

    get datesAndTotals() {
      const array = new Array(30);
      const latestDay = dayjs().format('YYYY-MM-DD');
      for (let i = 0; i < 30; i++) {
        const currentDay = dayjs(latestDay).subtract(i, 'day').format('YYYY-MM-DD');
        let total = 0;
        for (const i of this.groupedList) {
          if (i.title === currentDay) {
            if (i) {
              total += i.total ? i.total : 0;
            }
          }
        }

        array[i] = {data: currentDay.substring(5), total: total};
      }
      return array.reverse();
    }

    get option() {
      const dates = this.datesAndTotals.map(item => item.data);
      const values = this.datesAndTotals.map(item => item.total);
      return {
        grid: {
          right: 5,
          left: 30
        },
        title: {
          show: true,
          text: this.type === '-' ? '30天收入曲线' : '30天支出曲线',
          padding:[20,0,0,0],
          left:'center'
        },
        dataZoom:[
          {
            show:true,
            realtime:true,
            start:78,
            end:100
          },
        ],
        tooltip: { //点击显示
          show: true,
          triggerOn: 'click',
          position: 'top',
          formatter: '{c}',
        },
        legend: {
          data: ['金额'],
          show:false
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          show: true,
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
          data: values,
          type: 'line'
        }]
      };
    }

    type = '-';

    recordTypeList = recordTypeList;

    created() {
      this.$store.commit('fetchRecords');
    }

    mounted() {
      //曲线移到最右
      const div = this.$refs.wrapper as HTMLDivElement;
      div.scrollLeft = div.scrollWidth;
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

  .wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .chart {
    /*width: 430%;*/
    height: 40vh;
  }
</style>