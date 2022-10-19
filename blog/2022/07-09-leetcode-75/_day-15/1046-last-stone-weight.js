/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  if (stones.length === 0) return 0;
  if (stones.length === 1) return stones[0];

  buildHeap(stones);
  let numStones = stones.length;
  while (numStones > 0) {
    const left = 1;
    const right = 2;
    let xIdx = stones[left] > stones[right] ? left : right;
    if (right >= stones.length) xIdx = left;

    const y = stones[0];
    const x = stones[xIdx];
    if (x === y) {
      stones[0] = 0;
      stones[xIdx] = 0;
      numStones -= 2;
    }
    if (x !== y) {
      stones[0] -= stones[xIdx];
      stones[xIdx] = 0;
      numStones--;
    }
    heapify(stones, xIdx);
    heapify(stones, 0);
  }
  return stones[0];
};

/**
 * Build a heap represented by an array.
 * @param {number[]} nums
 */
function buildHeap(nums) {
  // Total nodes
  const N = nums.length;
  // Last Non-leaf node index: (N/2)-1
  const startIdx = Math.ceil(N / 2) - 1;

  // heapify the nodes in reverse order level by level
  for (let i = startIdx; i >= 0; i--) {
    heapify(nums, i);
  }
}

/**
 *
 * @param {number[]} nums
 * @param {number} rootIdx The index of the node to heapify
 */
function heapify(nums, rootIdx) {
  let largest = rootIdx;
  const l = rootIdx * 2 + 1;
  const r = rootIdx * 2 + 2;

  if (l < nums.length && nums[l] > nums[largest]) {
    largest = l;
  }

  if (r < nums.length && nums[r] > nums[largest]) {
    largest = r;
  }

  // make the swap
  if (largest !== rootIdx) {
    const temp = nums[rootIdx];
    nums[rootIdx] = nums[largest];
    nums[largest] = temp;

    heapify(nums, largest);
  }
}

console.log(lastStoneWeight([9, 3, 2, 10])); // 0
console.log(lastStoneWeight([1, 3])); // 2
console.log(lastStoneWeight([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]));
console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])); // 1
console.log(lastStoneWeight([1])); // 1
