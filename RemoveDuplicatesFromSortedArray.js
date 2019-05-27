// Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.
//
// Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.


/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let len = nums.length;
    if (len === 1 || len === 0) {
        return nums;
    }
    let i = 0;
    while (i < len - 1) {
        if (nums[i] === nums[i+1]) {
            nums.splice(i+1, 1); //此处i不需要+1，防止出现3个及以上的重复数字
            len --;
        } else {
            i ++;
        }
    }
    return nums
};
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]));