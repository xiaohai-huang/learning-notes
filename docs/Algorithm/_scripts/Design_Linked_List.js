var MyLinkedList = function () {
  this.head = null;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  let currentNode = this.head;
  let currentIndex = 0;

  while (currentNode) {
    if (currentIndex === index) return currentNode.val;
    currentNode = currentNode.next;
    currentIndex++;
  }

  return -1;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const newHead = { val, next: this.head };
  this.head = newHead;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  if (!this.head) {
    this.addAtHead(val);
    return;
  }
  let currentNode = this.head;
  while (currentNode.next) {
    currentNode = currentNode.next;
  }
  currentNode.next = { val, next: null };
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  let prevNode = null;
  let currentNode = this.head;
  let currentIndex = 0;
  if (index === 0) {
    this.addAtHead(val);
    return;
  }
  while (currentNode) {
    if (currentIndex === index) {
      const newNode = { val, next: currentNode };
      prevNode.next = newNode;
      return;
    }
    prevNode = currentNode;
    currentNode = currentNode.next;
    currentIndex++;
  }

  if (currentIndex === index) {
    const newNode = { val, next: null };
    prevNode.next = newNode;
  }
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  let prevNode = null;
  let currentNode = this.head;
  let currentIndex = 0;
  if (index === 0) {
    this.head = this.head.next;
    return;
  }

  while (currentNode) {
    if (currentIndex === index) {
      prevNode.next = currentNode.next;
    }
    prevNode = currentNode;
    currentNode = currentNode.next;
    currentIndex++;
  }
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
function assert(expected, real, message = "") {
  if (expected === real) {
    console.log(`PASS: ${message}`);
  } else {
    console.log(`FAIL: ${message}`);
    throw new Error(`FAIL: ${message}` + JSON.stringify({ expected, real }));
  }
}

// test add/delete
function test1() {
  var obj = new MyLinkedList();
  obj.addAtHead(1);
  obj.addAtHead(2);
  obj.addAtHead(3);
  // 3->2-1
  assert(obj.get(0), 3);
  obj.deleteAtIndex(0);
  assert(obj.get(0), 2);

  // 2-1
  obj.deleteAtIndex(1);
  // 2
  assert(obj.get(0), 2);
  assert(obj.get(1), -1);
}

function test5() {
  var obj = new MyLinkedList();
  obj.addAtHead(7);
  obj.addAtHead(2);
  obj.addAtHead(1);
  // 1-2-7
  obj.addAtIndex(3, 0);
  // 1-2-7-0
  assert(0, obj.get(3));

  obj.deleteAtIndex(2);
  // 1 2 0
  assert(0, obj.get(2));
  obj.addAtHead(6);
  // 6-1-2-0
  assert(6, obj.get(0));

  obj.addAtTail(4);
  // 6-1-2-0-4
  assert(4, obj.get(4));
}

function test6() {
  var obj = new MyLinkedList();
  obj.addAtIndex(0, 10);
  obj.addAtIndex(0, 20);
  obj.addAtIndex(1, 30);
  //  20 30 10
  assert(20, obj.get(0));
}

function test7() {
  var obj = new MyLinkedList();
  obj.addAtTail(1);
  assert(1, obj.get(0));
}
test1();
test5();
test6();

test7();
