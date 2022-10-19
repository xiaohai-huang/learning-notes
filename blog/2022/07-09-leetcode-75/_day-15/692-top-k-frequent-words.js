/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
  const freq = {};
  words.forEach((word) => {
    if (!freq[word]) freq[word] = 1;
    else freq[word]++;
  });
  const results = Object.entries(freq).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
  return results.slice(0, k).map((el) => el[0]);
};

console.log(
  topKFrequent(
    ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],
    4
  )
);

console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2));
