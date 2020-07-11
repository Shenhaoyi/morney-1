import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; //success 表示成功； duplicated 表示name重复
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name: string) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) > -1) return 'duplicated';
    const id = createId().toString()
    this.data.push({id: id, name: name}); //id有了数据库之后换为数字
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  update(id: string, name: string) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) > -1) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) > -1) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];//引用
        tag.name = name;
        tag.id = name
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  }
};

export default tagListModel;