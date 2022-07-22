/**
 * Definition for a Node.
 * @param {number} val 
 * @param {Node[]} children 
 */
function TreeNode(val, children) {
    this.val = val;
    this.children = children;
};

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorderRecursive = function (root) {
    // root left right
    const result = [];
    _preorder(root, result);
    return result
};

var _preorder = function (root, array) {
    if (!root) return
    array.push(root.val)
    root.children?.forEach(node => {
        _preorder(node, array)
    })
}

// preorderIterative
const preorder = (root) => {
    if (!root) return [];

    const result = [];
    const stack = [root];

    while (stack.length) {
        const node = stack.pop()
        if (node.children) {
            stack.push(...node.children.reverse())
        }
        result.push(node.val)
    }

    return result;
}

const root = new TreeNode(1);
const three = new TreeNode(3);
const two = new TreeNode(2);
const four = new TreeNode(4);
const five = new TreeNode(5);
const six = new TreeNode(6);

root.children = [three, two, four]
three.children = [five, six];

console.log(preorder(root))