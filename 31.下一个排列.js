/*
实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
必须原地修改，只允许使用额外常数空间。
以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
补充说明：
找出这个数组排序出的所有数中，刚好比当前数大的那个数
比如当前 nums = [1,2,3]。这个数是123，找出1，2，3这3个数字排序可能的所有数，排序后，比123大的那个数 也就是132
如果当前 nums = [3,2,1]。这就是1，2，3所有排序中最大的那个数，那么就返回1，2，3排序后所有数中最小的那个，也就是1，2，3 -> [1,2,3]
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/*
算法过程
标准的“下一个排列”算法可以描述为：
从后向前查找第一个相邻升序的元素对 (i,j)，满足 A[i] < A[j]。此时 [j,end) 必然是降序
在 [j,end) 从后向前查找第一个满足 A[i] < A[k] 的 k。A[i]、A[k] 分别就是上文所说的「小数」、「大数」
将 A[i] 与 A[k] 交换
可以断定这时 [j,end) 必然是降序，逆置 [j,end)，使其升序
如果在步骤 1 找不到符合的相邻元素对，说明当前 [begin,end) 为一个降序顺序，则直接跳到步骤 4
该方法支持数据重复，且在 C++ STL 中被采用。
如12385764->1238[6]7[5]4->12386[457]
 */

// 交换元素
function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

var nextPermutation = function(nums) {
  //从后往前找第一个升序序列
  let i = nums.length - 1;
  while (nums[i] <= nums[i - 1] && i > 0) i--;
  if (i > 0) {
    //整个序列不是降序的

    i--; //i为5的下标

    //5之后的数列一定是降序，从后往前找第一个比5大的数
    let j = nums.length - 1;
    while (nums[j] <= nums[i] && j >= 0) j--;
    //找到6，和5交换
    swap(nums, i, j); //1238[6]7[5]4

    //从i开始降序
    i++;

  //6之后的数列一定是降序或i=0整个序列为降序，逆置使之升序
  let start = i;
  let end = nums.length - 1;
  while (start < end) {
    swap(nums, start++, end--);
  }
  return nums;
}

console.log(nextPermutation([1, 2, 3, 8, 5, 7, 6, 4]));
console.log(nextPermutation([3, 2, 1]));
