<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {
    tags = window.tagList;

    createTag() {
      window.createTag();
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 20px;
    padding-left: 16px;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;

      > svg {
        color: #666;
        margin-right: 16px;
        width: 18px;
        height: 18px;
      }
    }
  }

  .createTag-wrapper {
    display: flex;
    justify-content: center;
    padding: 16px;
    margin-top: 44-16px;
  }

</style>