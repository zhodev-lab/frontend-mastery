// Q1. 
function sum(a, b, c) {
  return a + b + c;
}

const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      }
    }
  }
}

const curried = curry(sum);
console.log(curried(1)(2)(3)); // 输出 6
console.log(curried(1, 2)(3)); // 输出 6
console.log(curried(1)(2, 3)); // 输出 6
