function getWordFreq(str) {
    const freq = {}
    for (const char of "abcdefghijklmnopqrstuvwxyz") {
        freq[char] = 0;
    }

    for (let i = 0; i < str.length; i++) {
        const char = str[i]
        freq[char] += 1;
    }

    return freq;
}

function isSameFreq(freq1, freq2) {
    for (const char of "abcdefghijklmnopqrstuvwxyz") {
        if (freq1[char] !== freq2[char]) {
            return false;
        }
    }

    return true;
}

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    if (p.length > s.length) return []
    const wordFreq = getWordFreq(p);
    const indices = [];


    const sliceWordFreq = getWordFreq(s.slice(0, p.length));
    for (let i = 0; i < s.length; i++) {

        if (isSameFreq(wordFreq, sliceWordFreq)) indices.push(i);

        // remove the current char
        sliceWordFreq[s[i]] -= 1;
        // add the next char
        sliceWordFreq[s[i + p.length]] += 1;

    }
    return indices
};

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
console.log(findAnagrams("abab", "ab")); // [0, 1, 2]
console.log(findAnagrams("aaaaaaaaaa", "aaaaaaaaaaaaa"));