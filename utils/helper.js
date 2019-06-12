
class Helper {
  constructor(){

  }
  /*
    防抖
    1.事件触发->延时->执行回调函数 =搜索操作
    2.事件触发->执行回调函数->延时 =以及反馈按钮
    immediate
  */
  debounce(fun, delay = 500,immediate = false){
    let timer = null //保存定时器
    return function (args) {
      let that = this
      let _args = args
      if (timer) clearTimeout(timer);
        if (immediate) {
        if ( !timer) fun.apply(that, _args)
          timer = setTimeout(function(){
              timer = null;
          }, delay)
        }
        else {
          timer = setTimeout(function(){
              fun.call(that, _args)
          }, delay);
        }
    }
  }
  /*
    *数组本身是否有重复元素
  */
  isRepeat(arr){
    let hash = {};
    for(let i in arr) {
        if(hash[arr[i]])
            return true;
        hash[arr[i]] = true;
    }
    return false;
  }
}

export default new Helper()
