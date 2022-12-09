/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let right = 0;
  const set = new Set();
  let result = 0;
  while (right < s.length) {
    while (set.has(s.charAt(right))) {
      set.delete(s.charAt(left)); // move left boundary
      left++;
    }

    set.add(s.charAt(right));
    right++;
    result = Math.max(result, set.size);
  }

  return result;
};

console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
