// what is closure
// 闭包就是函数可以“记住”并访问它定义时作用域中的变量，即使这个函数在其外部执行。

function outer() {
  let count = 0; // 外部函数作用域中的变量

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer(); // outer 执行后返回 inner 函数
counter(); // 输出 1
counter(); // 输出 2

// 一个函数带着它定义时周围的“行李箱”一起旅行，里面装着它需要访问的外部变量。

/*
Q1 题目：
create a function createCounter()，make the create counter is indenpant createCounter。
const counter1 = createCounter();
console.log(counter1()); // output: 1
console.log(counter1()); // output: 2

const counter2 = createCounter();
console.log(counter2()); // output: 1
console.log(counter1()); // output: 3
*/

const createCounter = () => {
    let count = 1;
    return () => {
        return count++;
    }
}


// Q2 what is these out put 

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// flow - up question
// how can we make it 1,2,3

// method-1 IIFE
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(() => {
      console.log(index);
    }, 1000);
  })(i);
}

// change var to let each time create own scope 
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// Q3
// 实现一个 once 函数，它接受一个函数作为参数，只允许这个函数执行一次，之后每次调用都返回第一次执行的结果。
// function once(fn) {
//   // logic 
// }

// const add = (a, b) => a + b;
// const onceAdd = once(add);

// console.log(onceAdd(1, 2)); // output 3
// console.log(onceAdd(5, 6)); // still output 3，function will not be output

function once(fn) {
  let res = null;
  return (...args) => {
    if(!res){
      res = fn(...args);
    }
    return res;
  }
}
const add = (a, b) => { return a + b};
const onceAdd = once(add);

console.log(onceAdd(1, 2)); // 3
console.log(onceAdd(5, 6)); // 3

// Q4
// write a function memorized
// function memoize(fn) {
  // logic
// }

// const add = (a, b) => {
//   console.log('calculating...');
//   return a + b;
// };

// const memoizedAdd = memoize(add);

// console.log(memoizedAdd(1, 2)); // output : calculating... \n 3
// console.log(memoizedAdd(1, 2)); // output : 3（not calculating...）
// console.log(memoizedAdd(2, 3)); // output : calculating... \n 5

// 注意⚠️ JSON.stringify(args) not ...args
function memoize(fn) {
  const dict = new Map();
  return (...args) => {
    const _key = JSON.stringify(args);
    if(dict.has(_key)){
      return dict.get(_key)
    }else{
      const res = fn(...args);
      dict.set(_key, res);
      return res;
    }
  }
}

const add1 = (a, b) => {
  console.log('calculating...');
  return a + b;
};


// Q5
// const memoizedAdd = memoize(add1);

// console.log(memoizedAdd(1, 2)); // output : calculating... \n 3
// console.log(memoizedAdd(1, 2)); // output : 3（not calculating...）
// console.log(memoizedAdd(2, 3)); // output : calculating... \n 5


// const emitter = new EventEmitter();

// function onFoo(data) {
//   console.log('foo event:', data);
// }

// emitter.on('foo', onFoo);      // 注册事件
// emitter.emit('foo', 123);      // 输出 -> foo event: 123
// emitter.off('foo', onFoo);     // 取消监听
// emitter.emit('foo', 456);      // 无输出
