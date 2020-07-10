type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型
  createAt?: Date; // 类——即构造函数 ?表示可以不存在
}