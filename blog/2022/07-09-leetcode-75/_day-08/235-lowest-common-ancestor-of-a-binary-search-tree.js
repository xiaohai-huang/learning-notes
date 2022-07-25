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

function levelOrderTraversal(root, cb) {
    const queue = [root];
    let levelNum = 0;
    while (queue.length !== 0) {
        // num nodes at the current level
        const numNodes = queue.length;
        for (let i = 0; i < numNodes; i++) {
            let currentNode = queue.shift();
            currentNode.left && queue.push(currentNode.left);
            currentNode.right && queue.push(currentNode.right);
            if (cb(currentNode, levelNum)) return
        }
        levelNum++;
    }
}

/**
 * Search a node in a binary search tree. Use the `.val` to make comparison
 * @param {TreeNode} root root of a binary search tree
 * @param {TreeNode} target the target node to search
 * @return {TreeNode} If the node is found, return the node otherwise null.
 */
function search(root, target) {
    if (!root) return null;
    if (root.val === target.val) return root;
    if (target.val < root.val) return search(root.left, target);
    if (target.val > root.val) return search(root.right, target);
    return null;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    let maxLevel = -Infinity
    let commonAncestor = null;
    // level order traversal
    levelOrderTraversal(root, (node, levelNum) => {
        // search for p, q
        if (search(node, p) && search(node, q)) {
            if (levelNum > maxLevel) {
                maxLevel = levelNum;
                commonAncestor = node;
            }
        } else {
            return false
        }
    })

    return commonAncestor;

};

function eg1() {
    const root = createTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
    const p = root.left;
    const q = root.right;
    console.log(lowestCommonAncestor(root, p, q).val);
}

function eg2() {
    const root = createTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
    const p = root.left;
    const q = p.right;
    console.log(lowestCommonAncestor(root, p, q).val);
}

eg1();
eg2();