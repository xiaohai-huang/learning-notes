// Input: nums = [1,2,3,4]
// Output: [1,3,6,10]
// Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
    const sum = Array(nums.length).fill(0);

    sum[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        sum[i] = sum[i - 1] + nums[i];
    }
    return sum;
};

console.log(runningSum([1, 2, 3, 4])); // [1,3,6,10]


console.log(runningSum([1, 7, 3, 6, 5, 6]));
console.log(runningSum([1, 7, 3, 6, 5, 6].reverse()));