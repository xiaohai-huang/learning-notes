function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var middleNode1 = function (head) {
    let length = 0;
    const dummy = new ListNode();
    dummy.next = head;

    while (head) {
        length++;
        head = head.next;
    }

    let middle = dummy.next;
    for (let i = 0; i < Math.floor(length / 2); i++) {
        middle = middle.next;
    }

    return middle;
};


/**
 * Fast and Slow Pointer
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};

function print(root) {
    let current = root;
    const nums = [];
    while (current) {
        nums.push(current.val);
        current = current.next;
    }
    console.log(nums);
}

function toListNode(nums) {
    const dummy = new ListNode();
    let current = dummy;
    nums.forEach(num => {
        current.next = new ListNode(num);
        current = current.next
    })
    return dummy.next
}

print(middleNode(toListNode([1, 2, 3, 4, 5]))); // [3,4,5]
print(middleNode(toListNode([1, 2, 3, 4, 5, 6]))); // [4,5,6]
