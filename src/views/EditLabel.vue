<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="onUpdateTag"
                :field-name="'重命名：'" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: Tag = undefined;

    created() {
      this.tag = window.findTag(this.$route.params.id)
      if (!this.tag) {
        this.$router.replace('/404');// 用push会回退不了
      }
    }

    onUpdateTag(name: string) {
      if (!this.tag) return;
      window.updateTag(this.tag.id,name)
    }

    remove() {
      if (this.tag) {
        if (window.removeTag(this.tag)) {
          this.goBack();
        }
      }
    }

    goBack() {
      this.$router.replace('/labels');
      // this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .leftIcon {
      width: 24px;
      height: 24px
    }

    > .title {
    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    margin-top: 8px;
    background: white;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>