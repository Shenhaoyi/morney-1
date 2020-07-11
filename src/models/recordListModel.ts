const localStorageKeyName = 'recordList';

// type recordList ={
//   data:RecordItem[]
//   fetch:()=>RecordItem[]
//   save:()=> boolean
//   clone:()=>RecordItem[]
// }

const recordListModel = {
  data : [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    return true
  },
  clone() {
    return JSON.parse(JSON.stringify((this.data)));
  }
};

export default recordListModel;