//快乐数
var isHappy = function(n) {
  let existedNum = {};
  let re = 0;
  let lastNum = n;
  while (re !== 1) {
    n = lastNum;
    re = 0;
    while (n >= 1) {
      let b = n % 10;
      re += b * b;
      n = (n / 10) >>> 0; //对非负整数右移取整
    }
    if (existedNum[re]) return false;
    existedNum[re] = true;
    lastNum = re;
  }
  return true;
};
