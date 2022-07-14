function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var reverseList = function (head) {
    let prevHead = null;
    let nextHead = null;
    while (head) {
        nextHead = head.next;
        head.next = prevHead;

        prevHead = head;
        head = nextHead;
    }
    return prevHead;
};

/**
 * @param {ListNode} head
 * @return {ListNode} the reversed list
 */
var reverseList1 = function (head) {
    // no element []
    if (!head) return head;

    // only one element [1]
    if (!head.next) return head;

    // the first node's prev node is null
    let prevNode = null;
    let movingNode = head.next;
    // connect the first node's next to null
    head.next = prevNode;
    prevNode = head;

    while (movingNode) {
        let temp = movingNode.next;
        // connect to the moving node to the left node
        movingNode.next = prevNode;
        prevNode = movingNode;
        movingNode = temp;
    }

    return prevNode
};

/**
 * @param {ListNode} root 
 */
function print(root) {
    let current = root;
    const nums = [];
    while (current) {
        nums.push(current.val);
        current = current.next;
    }
    console.log(nums);
}
/**
 * @param {number[]} nums 
 */
function toListNode(nums) {
    const dummy = new ListNode();
    let current = dummy;
    nums.forEach(num => {
        current.next = new ListNode(num);
        current = current.next
    })
    return dummy.next
}

print(reverseList(toListNode([1, 2]))); // [2,1]
print(reverseList(toListNode([1, 2, 3, 4, 5]))); // [5,4,3,2,1]
