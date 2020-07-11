const localStorageKeyName = 'tagList';
type Tag ={
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; //success 表示成功； duplicated 表示name重复
  save: () => void;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name: string) {
    const names = this.data.map(item =>item.name)
    if (names.indexOf(name) > -1) return 'duplicated';
    this.data.push({id:name,name:name}); //id有了数据库之后换为数字
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default tagListModel;