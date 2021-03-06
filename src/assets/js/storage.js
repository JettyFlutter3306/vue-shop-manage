/**
 * 对localStorage进行了扩展
 * 原生的localStorage不能进行定时销毁
 * 扩展之后可以进行定时清除
 */

Storage.prototype.setExpire = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire
  };

  //localStorage 设置的值不能为对象,转为json字符串
  localStorage.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getExpire = key => {
  let val = localStorage.getItem(key);

  if (!val) {
    return val;
  }

  val = JSON.parse(val);

  if (Date.now() - val.time > val.expire) {
    localStorage.removeItem(key);

    return null;
  }

  return val.data;
}
