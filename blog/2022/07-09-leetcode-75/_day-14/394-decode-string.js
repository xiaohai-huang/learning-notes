/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "]") {
      let temp = "";
      let popped = stack.pop();
      while (popped !== "[") {
        temp = popped + temp;
        popped = stack.pop();
      }

      // repeat the content
      let k = "";
      while (/\d/.test(stack.at(-1))) {
        k = stack.pop() + k;
      }
      k = Number(k);

      let repeated = "";
      for (let j = 0; j < k; j++) {
        repeated += temp;
      }

      stack.push(repeated);
    } else {
      stack.push(char);
    }
  }

  return stack.join("");
};

console.log(decodeString("3[a]2[bc]")); // "aaabcbc"
console.log(decodeString("3[a2[c]]")); // "accaccacc"
console.log(decodeString("101[a2[c]]")); // "accaccacc"
