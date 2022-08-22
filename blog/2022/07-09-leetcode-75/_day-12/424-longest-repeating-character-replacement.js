function createFreq() {
    const freq = {}
    for (const char of "abcdefghijklmnopqrstuvwxyz".toUpperCase()) {
        freq[char] = 0;
    }
    return freq;
}

function findMaxFreq(freq) {
    return Math.max(...Object.values(freq));
}

function getWindowSize(freq) {
    return Object.values(freq).reduce((sum, current) => sum + current, 0)
}

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
    let left = 0;
    let right = 0;
    const freq = createFreq()

    let maxLength = 0;

    while (right < s.length) {
        freq[s.charAt(right)]++;

        const size = (right - left + 1);
        const isWindowValid = size - findMaxFreq(freq) <= k
        if (!isWindowValid) {
            freq[s.charAt(left)]--;
            left++;
        } else {
            maxLength = Math.max(size, maxLength)
        }
        right++;
    }

    return maxLength;
};

console.log(characterReplacement("AABABBA", 1)); // 4

console.log(characterReplacement("ABAB", 2)); // 4
console.log(characterReplacement("ABBB", 2)); // 4
console.log(characterReplacement("ABAA", 0)); // 2
console.log(characterReplacement("AAAB", 0)); // 3
console.log(characterReplacement("AABABBAAAABAAAA", 1)); // 9