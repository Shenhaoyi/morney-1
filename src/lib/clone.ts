function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify((data)));
}

export default clone;

//输入什么类型，就输出什么类型