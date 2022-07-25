var isValidBST = function (root) {
    const nums = [];
    in_order_traversal(root, (val) => nums.push(val));

    // check if the values are in the correct order
    for (let i = 0; i < nums.length - 1; i++) {
        if (!(nums[i] < nums[i + 1])) {
            return false
        }
    }
    return true
}

function in_order_traversal(root, cb) {
    if (!root) return
    in_order_traversal(root.left, cb);
    root && cb(root.val);
    in_order_traversal(root.right, cb);
}

// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * Create a binary tree from array and return the root
 * @param {number[]} nums 
 * @return {TreeNode} The root of the binary tree
 */
function createTree(nums) {
    const nodes = nums.map((num => num !== null ? new TreeNode(num) : null));
    let current = null;

    for (let idx = 0; idx < nums.length; idx++) {
        // left child: idx * 2 + 1
        // right child: idx * 2 + 2
        current = nodes[idx];
        if (!current) continue
        current.left = nodes[idx * 2 + 1]
        current.right = nodes[idx * 2 + 2]
    }
    return nodes[0];
}

// in_order_traversal(createTree([3, 1, 5, 0, 2, 4, 6]), console.log)
console.log(isValidBST(createTree([2, 1, 3])) === true); // true
console.log(isValidBST(createTree([5, 4, 6, null, null, 3, 7])) === false); // false
console.log(isValidBST(createTree([32, 26, 47, 19, null, null, 56, null, 27])) === false); // false
console.log(isValidBST(createTree([3, 1, 5, 0, 2, 4, 6])) === true); // true
console.log(isValidBST(createTree([120, 70, 140, 50, 100, 130, 160, 20, 55, 75, 110, 119, 135, 150, 200])) === false); // false