function isEquivalent(a, b, n) {
  const diff = a - b;
  const divisible = diff % n === 0;
  return divisible;
}

// a = 40, b = 70, n = 10
console.log(isEquivalent(40, 70, 10));

// a = 40, b = 70, n = 8
console.log(isEquivalent(40, 70, 8));