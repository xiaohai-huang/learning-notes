function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    const dummy = new ListNode();

    let current = dummy;
    let left = list1;
    let right = list2;
    while (left && right) {
        if (left.val <= right.val) {
            current.next = new ListNode(left.val)
            left = left.next
        } else {
            current.next = new ListNode(right.val);
            right = right.next
        }

        current = current.next;
    }

    // deal with the remaining numbers
    if (left || right) {
        current.next = left ? left : right
    }

    return dummy.next;
};

/**
 * 
 * @param {ListNode} root 
 */
function print(root) {
    let current = root;
    while (current) {
        console.log(current.val);
        current = current.next;
    }
}
/**
 * 
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

print(mergeTwoLists(toListNode([1, 2, 4]), toListNode([1, 3, 4])))