/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
    if (s.length === 1) return 1;

    const termFreq = tf(s);
    console.log(termFreq);
    let length = 0;

    for (const count of Object.values(termFreq)) {
        if (count % 2 === 0) {
            length += count;
        } else {
            length += count - 1;
        }

        // we can only add 1 unique char to the center
        // length % 2 === 0 means we haven't added a unique center char
        if (length % 2 === 0 && count % 2 === 1) {
            length++;
        }
    }

    return length
};
/**
 * Get the term frequency of a string
 * @param {string} s 
 */
function tf(s) {
    const termFreq = {};
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (termFreq[char]) {
            termFreq[char] += 1
        } else {
            termFreq[char] = 1;
        }
    }
    const sortable = Object.fromEntries(
        Object.entries(termFreq).sort(([, a], [, b]) => b - a)
    );

    return sortable;
}

console.log(longestPalindrome("abccccdde") === 7); // 7, e.g., dccaccd | ccdcc
console.log(longestPalindrome("a") === 1); // 1
console.log(longestPalindrome("bb") === 2); // 2

console.log(longestPalindrome("bananas") === 5); // 5 e.g. naban | odd even
console.log(longestPalindrome("ccccdd") === 6); // 6 e.g. ccddcc

console.log(longestPalindrome("aaaa") === 4);
console.log(longestPalindrome("tattarrattat") === 12);
console.log(longestPalindrome("tattarrattatxx") === 14); // tatta  rxxr attat