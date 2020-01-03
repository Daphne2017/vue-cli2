// 一、找出字符串中第一个只出现一次的字符？
在一个字符串(0 <= 字符串长度 <= 10000，全部由字母组成)中找到第一个只出现一次的字符, 并返回它的位置, 如果没有则返回 - 1（需要区分大小写）.

(function(){
  function FirstNotRepeatingChar(str) {
    // write code here
    let arr = [];
    for (let i = 0; i < str.length; i++) {
      if (arr[str[i]] == undefined) {
        arr[str[i]] = 1;
      } else {
        arr[str[i]]++;
      }
    }
    for (let i = 0; i < str.length; i++) {
      if (arr[str[i]] == 1)
        return i;
    }
    return -1;
  }
})()

function FirstNotRepeatingChar(str) {
  if (str.length === 0)
    return -1;
  var arr = str.split("");
  var map = {};

  for (var i = 0; i < arr.length; i++) {
    var cur = arr[i];
    if (!map[cur]) {
      map[cur] = 1;
    } else {
      map[cur]++;
    }
  }
  for (var i = 0; i < arr.length; i++) {
    if (map[arr[i]] === 1)
      return i;
  }

  return -1;
}