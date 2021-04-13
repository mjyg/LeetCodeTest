/*
给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
输入：root = [4,2,6,1,3]
输出：1
 */
/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  //先序遍历二叉搜索树得到递增数列，递增数列相邻元素的差的最小值即为树中任意节点的差的最小值
  let pre = null
  let re = Infinity;
  const stack = []
  let node = root;
  // 非递归中序遍历（左中右）：遍历左子树入栈，当左子树为空时，Pop栈顶元素，打印，遍历其右子树；当右子树为空且栈为空时退出循环，遍历结束
  while(node || stack.length) {
    while(node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    if(pre) re = Math.min(re,node.val - pre.val)
    pre = node;
    node = node.right;
  }
  return re;
};

var middleOrder2 = function(root) {
  //递归中序遍历
  if(root) {
    middleOrder2(root.left)
    console.log(root.val)
    middleOrder2(root.right)
  }
}

var preOrder = function(root) {
  // 非递归先序遍历（中左右）：先遍历左子树，并入栈,入栈的时候打印；当左子树为空的时候，pop栈顶元素，遍历其右子树；当右子树为空且栈为空时退出循环，遍历结束
  let node = root;
  const stack = []
  while(node || stack.length) {
    while(node) {
      console.log(node.val)
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    node = node.right
  }
}

const preOrder2 = function(root) {
  // 递归先序遍历
  if (root){
    console.log(root.val)
    preOrder2(root.left)
    preOrder2(root.right)
  }
}

const postOrder = function(root) {
  // 递归后序遍历
  if(root) {
    postOrder(root.left)
    postOrder(root.right)
    console.log(root.val)
  }
}

const root = {
  val:4,
  left:{
    val:2,
    left:{
      val:1,
    },
    right:{
      val:3
    }
  },
  right: {
    val:6
  }
}

postOrder(root)
