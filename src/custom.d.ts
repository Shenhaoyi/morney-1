type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number; //数据类型
  createAt?: string; // 类——即构造函数 ?表示可以不存在
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

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}