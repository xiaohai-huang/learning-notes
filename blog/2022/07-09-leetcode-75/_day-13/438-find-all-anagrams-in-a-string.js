function getNumFreq(num) {
  const freq = {};
  for (const char of "1234567890") {
    freq[char] = 0;
  }

  for (let i = 0; i < num.length; i++) {
    const char = num[i];
    freq[char] += 1;
  }

  return freq;
}

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  let bulls = 0;
  let cows = 0;

  const secretFreq = getNumFreq(secret);
  const guessFreq = getNumFreq(guess);
  for (let i = 0; i < secret.length; i++) {
    // find bulls - accurate match (same digit with same position)
    if (secret.charAt(i) === guess.charAt(i)) {
      bulls++;
      secretFreq[secret.charAt(i)]--;
      guessFreq[secret.charAt(i)]--;
    }
  }

  for (const digit of Object.keys(secretFreq)) {
    if (secretFreq[digit] !== 0) {
      if (guessFreq[digit] >= secretFreq[digit]) {
        cows += secretFreq[digit];
      } else {
        cows += guessFreq[digit];
      }
    }
  }

  return `${bulls}A${cows}B`;
};

console.log(getHint("1807", "7810")); // 1A3B
console.log(getHint("1123", "0111")); // 1A1B
console.log(getHint("1234", "0111")); // "0A1B"
console.log(getHint("1122", "0001")); // 0A1B
