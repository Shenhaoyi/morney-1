<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"></Icon>
      <div class="titleWrapper">
        <span class="title">{{tag.name}}</span>
      </div>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
            <FormItem @update:value="onUpdateTag"
                      name="rename"
                      placeholder="请输入新的标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="goBack">确认修改</Button>
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
    components: {Button, FormItem},
    computed:{
    }
  })
  export default class EditLabel extends Vue {
    get tag(){
      return this.$store.state.currentTag
    }

    created() {
      this.$store.commit('fetchTags');
      this.$store.commit('findTag', this.$route.params.id);
      if (!this.tag) {
        this.$router.replace('/404');// 用push会回退不了
      }
    }

    onUpdateTag(name: string) {
      if (!this.tag) return;
      this.$store.commit('updateTag',{id:this.tag.id,name:name})
    }

    remove() {
      if (this.tag) {
        this.$store.commit('removeTag', this.tag);
        this.goBack();
      }
    }

    goBack() {
      this.$router.replace('/labels');
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .navBar {
    text-align: center;
    font-size: 24px;
    background: $theme-color;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .leftIcon {
      width: 24px;
      height: 24px
    }

    .titleWrapper{
      /*width:25%;*/
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top:5px;
      margin-bottom:5px;
      border:1px solid black;
      border-radius: 2px;
      padding:0  10px;
      .title {
        width: 100%;
        text-align: center;
        background: $theme-color;
        color: black;
      }
    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    margin-top: 16px;
    background: white;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-evenly;
    padding: 16px;
    margin-top: 16px;
  }
</style>