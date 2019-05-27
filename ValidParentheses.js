let isValid = function(s) {
  let obj = {
    ']': '[',
    ')': '(',
    '}': '{',
  };
  let arr = [];
  for (let i = 0; i < s.length; i ++) {
    if (['[', '(', '{'].includes(s[i])) {
      arr.push(s[i]);
    } else {
      if (arr.pop() !== obj[s[i]]) {}
      return false
    }
  }
  return !arr.length;
};

