<template>
  <div class="tags">
<!--    <div class="new">-->
<!--      <button @click="create">-->
<!--        新增标签-->
<!--      </button>-->
<!--    </div>-->
    <ul class="current">
      <li v-for="tag in tags" :key="tag.id" :class="selectedTags.indexOf(tag)>=0 && 'selected'"
          @click="toggle(tag)">
        {{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component(
    {
      computed:{
        tags(){
          return this.$store.state.tagList
        }
      }
    }
  )
  export default class Tags extends Vue {
    @Prop({required:true,type:Array}) selectedTags!: Tag[];

    created(){
      this.$store.commit('fetchTags');
    }

    toggle(tag: Tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    // create() {
    //   this.$store.commit('createTag');
    // }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';

  .tags {
    border-top:1px solid #d2d2d2;
    border-bottom:1px solid #d2d2d2;
    background: white;
    flex-grow: 1;
    font-size: 20px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;

    > .current {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      overflow: auto;

      > li {
        $h: 30px;
        background: lighten($theme-color,40%);;
        height: $h;
        line-height: $h;
        border:1px solid $theme-color;
        border-radius: $h/2;
        padding: 0 16px;
        margin:8px;

        &.selected {
          background: $theme-color;
          border: 1px solid black;
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