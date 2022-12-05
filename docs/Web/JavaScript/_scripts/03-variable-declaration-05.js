"use strict";
var b = 2;
if (true) {
  let a = 2;
  var b = 3;
  var c = 4;
  const d = 5;
}

// console.log(a); ReferenceError: a is not defined
console.log(b);
console.log(c);
console.log(d);
var d = 6;