import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  createTag() {
    const tagName = window.prompt('请输入标签名');
    if (tagName === '') {
      window.alert('标签名不能为空');
    } else if (tagName === null) {
      return;
    } else {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(tagName) > -1) {
        window.alert('标签名重复了');
        return;
      }
      const id = createId().toString();
      this.tagList.push({id: id, name: tagName});
      this.saveTags();
    }
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
  removeTag(tag: Tag) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === tag.id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.tagList.splice(index, 1);
      this.saveTags();
      return true;
    } else {
      return true;
    }
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) > -1) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) > -1) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];//引用
        tag.name = name;
        tag.id = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  findTag(id: string) {
    return this.tagList.filter(tag => tag.id === id)[0]; //filter返回数组
  },
};

tagStore.fetchTags();

export default tagStore;