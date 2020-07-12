import tagListModel from '@/models/tagListModel';

export default {
  tagList: tagListModel.fetch(),
  createTag() {
    const tagName = window.prompt('请输入标签名');
    if (tagName === '') {
      window.alert('标签名不能为空');
    } else if (tagName === null) {
      return;
    } else {
      const message = tagListModel.create(tagName);
      if (message === 'duplicated') {
        window.alert('标签名重复了');
      }
    }
  },
  removeTag(tag: Tag) {
    return tagListModel.remove(tag.id);
  },
  updateTag(id: string, name: string) {
    return tagListModel.update(id, name);
  },
  findTag(id: string) {
    const result = this.tagList.filter(tag => tag.id === id)[0];
    console.log(result);
    return this.tagList.filter(tag => tag.id === id)[0]; //filter返回数组

  },
};