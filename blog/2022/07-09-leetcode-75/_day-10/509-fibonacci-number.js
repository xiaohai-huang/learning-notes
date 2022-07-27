/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    if (n === 0) return 0;
    if (n === 1) return 1;
    const value = fib(n - 1, memo) + fib(n - 2, memo);
    memo[n] = value;
    return value;
};

function eg() {
    console.log(fib(2)); // 1
    console.log(fib(3)); // 2
    console.log(fib(4)); // 3
    console.log(fib(5)); // 5

}

eg()