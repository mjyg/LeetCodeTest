//先冒泡排序，再用排完序的和原来的比较，如果元素不同，则计数+1
//时间复杂度O(n*n),空间复杂度O(n)
/**
 * @param {number[]} heights
 * @return {number}
 */
function heightChecker(heights) {
  let count = 0;
  const origin = [];
  const len = heights.length;
  for (let i = 0; i < len; i++) {
    origin.push(heights[i]);
  }
  for (let i = 0; i < len; i++) {
    let swapFlag = false; //哨兵，如果该趟排序没有交换，则整个数组有序
    for (let j = 0; j < len - 1 - i; j++) {
      if (heights[j] > heights[j + 1]) {
        const temp = heights[j];
        heights[j] = heights[j + 1];
        heights[j + 1] = temp;
        swapFlag = true;
      }
    }
    if (!swapFlag) break;
    swapFlag = false;
  }
  for (let i = 0; i < len; i++) {
    if (origin[i] !== heights[i]) count++;
  }
  return count;
}

//桶排序
//时间复杂度：O(n),空间复杂度O(1)（一个固定长度的计数数组与一个统计变量，与输入 N 的大小无关），如果100不是定值，即heights中有m个圆嘟嘟，则时间复杂度为O(m+n)
var heightChecker2 = function(heights) {
  let count = 0;
  // 值的范围是1 <= heights[i] <= 100，因此需要1,2,3,...,99,100，共101个桶
  const arr = new Array(101).fill(0);
  // 遍历数组heights，计算每个桶中有多少个元素，也就是数组heights中有多少个1，多少个2，。。。，多少个100
  // 将这101个桶中的元素，一个一个桶地取出来，元素就是有序的
  for (let i = 0; i < heights.length; i++) {
    arr[heights[i]]++;
  }
  for (let i = 1, j = 0; i < 101; i++) {
    while (arr[i]-- > 0) {
      // 从桶中取出元素时，元素的排列顺序就是非递减的，然后与heights中的元素比较，如果不同，计算器就加1
      if (heights[j++] !== i) count++;
    }
  }
  return count;
};
