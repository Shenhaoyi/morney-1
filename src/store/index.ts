import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);
const KeyNameOfRecordList = 'recordList';
const KeyNameOfTagList = 'tagList';

const store = new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    //recordList
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(KeyNameOfRecordList) || '[]');
      console.log(state.recordList);
      return state.recordList;
    },
    createRecord(state,record: RecordItem){
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();
      state.recordList.push(record2);
      console.log(state.recordList);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem(KeyNameOfRecordList , JSON.stringify(state.recordList));
      return true;
    },


    //tagList
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(KeyNameOfTagList) || '[]');
      console.log(state.tagList);
      return state.tagList;
    },
    createTag(state) {
      const tagName = window.prompt('请输入标签名');
      console.log(tagName);
      if (tagName === '') {
        window.alert('标签名不能为空');
      } else if (tagName === null) {
        return;
      } else {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(tagName) > -1) {
          window.alert('标签名重复了');
          return;
        }
        console.log(111);
        const id = createId().toString();
        state.tagList.push({id: id, name: tagName});
        store.commit('saveTags');
      }
    },
    saveTags(state) {
      window.localStorage.setItem(KeyNameOfTagList, JSON.stringify(state.tagList));
    },
    removeTag(state,tag: Tag) {
      let index = -1;
      for (let i = 0; i < this.tagList.length; i++) {
        if (state.tagList[i].id === tag.id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        return true;
      } else {
        return true;
      }
    },
    // updateTag(state, id: string, name: string) {
    //   const idList = state.tagList.map(item => item.id);
    //   if (idList.indexOf(id) > -1) {
    //     const names = state.tagList.map(item => item.name);
    //     if (names.indexOf(name) > -1) {
    //       return 'duplicated';
    //     } else {
    //       const tag = state.tagList.filter(item => item.id === id)[0];//引用
    //       tag.name = name;
    //       tag.id = name;
    //       store.commit('saveTags');
    //       return 'success';
    //     }
    //   } else {
    //     return 'not found';
    //   }
    // },
    findTag(state,id: string) {
      return state.tagList.filter(tag => tag.id === id)[0] as Tag; //filter返回数组
    },
  },
  actions: {},
  modules: {}
});

export default store;