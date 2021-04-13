function hasPath(root, value) {
  if (!root) return 0;

  if (!root.left && !root.right) return root.val === value;

  return hasPath(root.left, value - root.val) || hasPath((root.right, value - root.val));
}

const root = {
  val: 5,
  left: {
    val: 4,
    right: {
      val: 3,
    },
  },
  right: { val: 3 },
};

console.log(hasPath(root, 8));
console.log(hasPath(root, 12));
