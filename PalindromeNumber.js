/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if (x < 0) {
    return false;
  }
  x = x.toString();
  a = x.toString();
  return x.reverse() === x
};

isPalindrome(10)
