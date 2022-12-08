// add(5, 2)  7
// add(5)(2)  7
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return Reflect.apply(func, undefined, args);
    } else if (args.length < func.length) {
      return (...a) => curried(...args, ...a);
    }
  };
}

function add(a, b) {
  return a + b;
}
const curriedAdd = curry(add);
console.log(curriedAdd(2)(5)); // 7
console.log(curriedAdd(2, 5)); // 7
