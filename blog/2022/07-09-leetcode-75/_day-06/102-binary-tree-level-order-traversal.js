// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return [];
    const result = []
    const queue = [root];

    while (queue.length) {
        const numNodes = queue.length;

        const level = [];
        // enqueue all the children of each node in the current level
        for (let i = 0; i < numNodes; i++) {
            const node = queue.shift();
            level.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        // finish current level
        result.push(level);
    }

    return result
};

const three = new TreeNode(3);
const nine = new TreeNode(9);
const twenty = new TreeNode(20);
const fifteen = new TreeNode(15);
const seven = new TreeNode(7);
const one = new TreeNode(1);

three.left = nine;
three.right = twenty;

twenty.left = fifteen;
twenty.right = seven

nine.left = one

// Output: [[3],[9,20],[15,7]]
console.log(levelOrder(three));