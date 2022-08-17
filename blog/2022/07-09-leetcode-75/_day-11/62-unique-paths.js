/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    const dp = Array(m).fill(null).map(() => [...Array(n)].fill(0));

    // initialize the table by filling ones to the bottom and right
    // fill the bottom line
    for (let col = 0; col < n; col++) {
        dp[m - 1][col] = 1;
    }
    // fill the right line
    for (let row = 0; row < m; row++) {
        dp[row][n - 1] = 1;
    }

    for (let row = m - 2; row >= 0; row--) {
        for (let col = n - 2; col >= 0; col--) {
            dp[row][col] = dp[row + 1][col] + dp[row][col + 1]
        }
    }

    return dp[0][0]
};

console.log(uniquePaths(3, 2)); // 3
console.log(uniquePaths(3, 7)); // 28
