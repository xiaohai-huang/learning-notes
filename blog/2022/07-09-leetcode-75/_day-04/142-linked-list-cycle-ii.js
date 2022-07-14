function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    // There is a cycle in a linked list if there is some node in the list that can be reached again
    const s = new Set();
    while (head) {
        if (s.has(head)) return head;
        s.add(head);
        head = head.next;
    }

    return null;
};