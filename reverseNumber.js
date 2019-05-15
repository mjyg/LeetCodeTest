/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let str = x < 0 ? -x : x;
  str = str.toString();
  str = parseInt(str.split('').reverse().join(''));
  x = x < 0 ? -str : str;
  if (x>Math.pow(2,31) - 1 || x < -Math.pow(2,31)) {
    return 0;
  }
  return x
};

var reverse2 = function(x) {
  let n = Math.abs(x);
  let re = 0;
  while(n > 0) {
    re = re * 10 + n % 10;
    n = parseInt(n /10);
  }
  re = x < 0 ? -re : re;
  return x < Math.pow(-2, 31) || x > Math.pow(2,31) - 1 ? 0 : re
};

console.log(reverse2(1534236469))
