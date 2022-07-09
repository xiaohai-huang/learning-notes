// e.g 1
// Input: nums = [1,7,3,6,5,6]
// Output: 3
// Explanation:
// The pivot index is 3.
// Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
// Right sum = nums[4] + nums[5] = 5 + 6 = 11

// e.g. 2
// Input: nums = [1,2,3]
// Output: -1
// Explanation:
// There is no index that satisfies the conditions in the problem statement.

// e.g. 3
// Input: nums = [2,1,-1]
// Output: 0
// Explanation:
// The pivot index is 0.
// Left sum = 0 (no elements to the left of index 0)
// Right sum = nums[1] + nums[2] = 1 + -1 = 0

var pivotIndex = function (nums) {
    let leftSum = 0;
    let rightSum = sum(nums);
    for (let i = 0; i < nums.length; i++) {
        rightSum = rightSum - nums[i];
        if (leftSum === rightSum) return i;
        leftSum += nums[i];
    }

    return -1;
};


var runningSum = function (nums) {
    const sum = Array(nums.length).fill(0);

    sum[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        sum[i] = sum[i - 1] + nums[i];
    }
    return sum;
};


//  0   1   2   3    4  5
// [1,  7,  3,  6,   5, 6]
// [1,  8,  11, 17, 22, 28] look at the element on the left of the i-th element
// [28, 27, 20, 17, 11, 6]  look at the element on the right of the i-th element
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex1 = function (nums) {
    let leftRunningSum = runningSum(nums);
    let rightRunningSum = runningSum([...nums].reverse()).reverse();

    let leftSum = 0;
    let rightSum = 0;
    for (let i = 0; i < nums.length; i++) {
        leftSum = leftRunningSum[i - 1]
        rightSum = rightRunningSum[i + 1]
        if (leftSum === undefined) leftSum = 0;
        if (rightSum === undefined) rightSum = 0;


        if (leftSum === rightSum) return i;
    }

    return -1;
};

var sum = nums => nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
/**
 * @param {number[]} nums
 * @return {number}
 */


console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // 3
console.log(pivotIndex([1, 2, 3])); // -1
console.log(pivotIndex([2, 1, -1])); // 0