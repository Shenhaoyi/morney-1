<template>
  <Layout>
    <div class="navBar">
      <div class="titleWrapper">
        <span class="title">标签管理</span>
      </div>
    </div>
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
    components: {Button},
    computed: {
      tags() {
        return this.$store.state.tagList;
      }
    }
  })
  export default class Labels extends Vue {

    created() {
      this.$store.commit('fetchTags');
    }

    createTag() {
      this.$store.commit('createTag');
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .navBar {
    background: $theme-color;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;

    .titleWrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top:5px;
      margin-bottom:5px;
      /*border:1px solid black;*/
      /*border-radius: 2px;*/
      padding:0 10px;
      .title {
        width: 100%;
        text-align: center;
        background: $theme-color;
        color: black;
      }
    }
  }

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
    padding: 0 16px;
    margin-top: 16px;
  }

</style>