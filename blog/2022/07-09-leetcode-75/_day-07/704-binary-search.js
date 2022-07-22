/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let middle = Math.floor((right + left) / 2);
        const middleNum = nums[middle];
        if (middleNum < target) {
            left = middle + 1;
        } else if (middleNum > target) {
            right = middle - 1;
        } else {
            return middle;
        }
    }
    return -1;
};

console.log(search([-1, 0, 3, 5, 9, 12], 9)); // 4
console.log(search([-1, 0, 3, 5, 9, 12, 88], 2)); // -1
console.log(search([5], 5)); // 0
console.log(search([-1, 0, 3, 5, 9, 12], 9)); // 4