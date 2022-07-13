/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    if (s.length !== t.length) return false;
    const map = {};
    const values = new Set();

    for (let i = 0; i < s.length; i++) {
        const leftChar = s[i];
        const rightChar = t[i];

        if (map[leftChar] === undefined) {
            if (values.has(rightChar)) return false
            map[leftChar] = rightChar;
            values.add(rightChar)

            continue;
        }

        const mappedChar = map[leftChar];
        if (mappedChar !== rightChar) {
            return false
        }
    }
    return true
};

console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false
console.log(isIsomorphic("paper", "title")); // true
console.log(isIsomorphic("badc", "baba")); // false  b->b   a->a   d->b  c->a

// No two characters may map to the same character, but a character may map to itself.