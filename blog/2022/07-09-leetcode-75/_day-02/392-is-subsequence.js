/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
    let startIdx = 0;
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        for (let j = startIdx; j < t.length; j++) {
            if (char === t[j]) {
                count++;
                startIdx = j + 1;
                break;
            }
        }
    }

    return s.length === count;
};


console.log(isSubsequence("abc", "ahbgdc")); // true
console.log(isSubsequence("axc", "ahbgdc")); // false

console.log(isSubsequence("bc", "abagdc")); // true
console.log(isSubsequence("aa", "abagdc")); // true