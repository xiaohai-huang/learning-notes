/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n, memo = {}) {
    if (n in memo) return memo[n];

    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;
    const value = climbStairs(n - 1, memo) + climbStairs(n - 2, memo)
    memo[n] = value
    return value;
};

console.log(climbStairs(4)); // 5