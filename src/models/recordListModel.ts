import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

// type recordList ={
//   data:RecordItem[]
//   fetch:()=>RecordItem[]
//   save:()=> boolean
//   clone:()=>RecordItem[]
// }

const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    return true;
  },
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createAt = new Date();
    this.data.push(record2);
    this.save();
  }
};

export default recordListModel;