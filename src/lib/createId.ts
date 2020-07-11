let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') ||0 //保底有字符串 保底不是nan等字符串

function createId() {
  id++
  window.localStorage.setItem('_idMax',id.toString())
  return id
}
export  default  createId