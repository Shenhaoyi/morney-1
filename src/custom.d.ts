type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型
  createAt?: Date; // 类——即构造函数 ?表示可以不存在
}

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

interface Window {
  tagList: Tag[];
  createTag: () => void;
  removeTag: (tag: Tag) => boolean;
  updateTag: TagListModel['update'];
  findTag: (id: string) => Tag|undefined;
  recordList: RecordItem[];
  recordCreate: (record: RecordItem) => void;
}
