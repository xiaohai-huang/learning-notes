/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit1 = function (prices) {
    if (prices.length === 1) return 0;

    let max = 0;
    let maxSellPrice = 0;
    let maxSellPriceIdx = -1;
    for (let i = 0; i < prices.length; i++) {
        const buyPrice = prices[i];
        // find max sell price after current day
        if (i >= maxSellPriceIdx) {
            const remainingPrices = prices.slice(i);
            maxSellPrice = Math.max(...remainingPrices);
            maxSellPriceIdx = remainingPrices.lastIndexOf(maxSellPrice);
        }
        max = Math.max(maxSellPrice - buyPrice, max);

    }
    return max;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let maxProfit = 0;
    let minPrice = Number.MAX_VALUE;

    prices.forEach(price => {
        minPrice = Math.min(minPrice, price);
        let profit = price - minPrice;
        maxProfit = Math.max(maxProfit, profit)
    })

    return maxProfit
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([1])); // 0
console.log(maxProfit([1, 2])); // 1