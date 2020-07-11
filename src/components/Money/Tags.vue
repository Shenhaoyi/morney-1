<template>
  <div class="tags">
    <div class="new">
      <button @click="create">
        新增标签
      </button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id" :class="selectedTags.indexOf(tag)>=0 && 'selected'"
          @click="toggle(tag.name)">
        {{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';

  @Component
  export default class Tags extends Vue {
    @Prop() readonly dataSource: string[] | undefined;
    selectedTags: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    create() {
      const tagName = window.prompt('请输入标签名');
      if (tagName === '') {
        window.alert('标签名不能为空');
      } else if (this.dataSource) {
        const message = tagListModel.create(tagName!);
        if (message === 'duplicated') {
          window.alert('标签名重复了');
        }
        // this.$emit('update:dataSource', [...this.dataSource, tagName]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .tags {
    background: white;
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: #d9d9d9;
        background: $bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          background: darken($bg, 35%);
          color: white;
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 3px;
      }
    }
  }
</style>