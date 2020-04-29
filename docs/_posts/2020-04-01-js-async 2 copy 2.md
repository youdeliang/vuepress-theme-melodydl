---
layout: post
title: "JS异步编程方案总结"
date: 2019-02-19
category: demo
tags:
  - Promise
  - JavaScript
  - JavaScript2
  - JavaScript3
  - JavaScript4
  - JavaScript5
  - JavaScript6
  - JavaScript7
---

本篇博客用来。。。。
<!-- more -->
::: danger
这是一个危险警告
:::
## 前言
Javcscript是单线程机制，单线程模型指的是，JavaScript只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。JavaScript 之所以采用单线程，而不是多线程，原因是不想让浏览器变得太复杂，因为多线程需要共享资源、且有可能修改彼此的运行结果，对于一种网页脚本语言来说，这就太复杂了。
## 异步编程解决了什么问题？
单线程的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段JavaScript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

为了解决JavaScript执行任务只能一个一个排队执行得问题（同步执行）引入了异步编程方案来实现（异步并行执行任务），对于几种常见异步编程方案有：
- 回调函数
- 事件监听
- 发布/订阅
- Promise对象
- Generator/yield（ES6）
- async/await（ES7）
## 同步和异步任务
程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）。

- `同步任务`:是指那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。

- `异步任务`:是指那些被引擎放在一边，不进入主线程、而进入任务队列的任务。

只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。`JavaScript`运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。

异步任务的写法通常是`回调函数`。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

**下面总结一下异步操作的几种模式。**

## 1、回调函数
回调函数是异步操作最基本的方法，一般指函数里面嵌套函数来调用其他函数。

```
function f1(callback) {
  // ...
  callback();
}

function f2() {
  // ...
}

f1(f2);
```
- `优点`：简单、容易理解和实现。
- `缺点`：不利于代码的阅读和维护，容易形成‘回调地狱’，各个部分之间高度耦合（coupling），使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。
## 2、事件监听
事件监听是采用事件驱动模式。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

```
f1.on('done', f2);

function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done'); // 触发done事情
  }, 1000);
}
```
上面代码使用JQuery编写， 首先，为`f1`绑定一个事件，当`f1`发生`done`事件，就执行`f2`，而`f1`执行完成后，立即触发`done`事件，从而开始执行`f2`。

- `优点`：比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现模块化。
- `缺点`：整个程序都要变成事件驱动型，运行流程会变得很不清晰。
## 3、发布/订阅
事件完全可以理解成`信号`，如果存在一个`信号中心`，某个任务执行完成，就向信号中心`发布`一个信号，其他任务可以向信号中心`订阅`这个信号，从而知道什么时候自己可以开始执行。这就叫做`发布/订阅模式`，又称`观察者模式`。

```
// 订阅信号
jQuery.subscribe('done', f2);

function f1() {
  setTimeout(function () {
    // ...
    // 向信号中心jQuery发布done信号,从而引发f2的执行
    jQuery.publish('done');
  }, 1000);
}

// 取消订阅
jQuery.unsubscribe('done', f2);
```
上面代码使用JQuery编写，首先，`f2`向信号中心`jQuery`订阅`done`信号。`f1`执行完成后，向信号中心`jQuery`发布`done`信号，从而引发`f2`的执行。

这种方法的性质与`事件监听`类似，但是明显优于后者。因为可以通过查看`消息中心`，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。
## 4、Promise
`Promise` 实际就是一个对象， 从它可以获得异步操作的消息，`Promise` 对象有三种状态，`pending`(进行中)、`fulfilled`（已成功）和`rejected`（已失败）。`Promise` 的状态一旦改变之后，就不会在发生任何变化,将回调函数变成了链式调用。

`Promise` 的设计思想是，每一个异步任务返回一个`Promise`对象，该对象有一个`then`方法，用来指定下一步的回调函数。

```
var p1 = new Promise(f1);
p1.then(f2);
```
上面代码中，`f1`的异步操作执行完成，就会执行`f2`。

```
function f1(){
    var dfd = $.Deferred();
    setTimeout(function () {
        // f1的任务代码
        dfd.resolve();
    }, 500);
    return dfd.promise;
}
```
每次调用返回的都是一个新的Promise实例(then可用链式调用的原因)

```
// 传统写法
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // ...
      });
    });
  });
});

// Promise 的写法
(new Promise(step1))
  .then(step2)
  .then(step3)
  .then(step4);
```
传统的写法可能需要把`f2`作为回调函数传入`f1`，比如写成`f1(f2)`，异步操作完成后，在`f1`内部调用`f2`。`Promise`使得`f1`和`f2`变成了链式写法。不仅改善了可读性，而且对于多层嵌套的回调函数尤其方便。
## 5、Generator
`Generator` 函数是协程在 `ES6` 的实现，最大特点就是可以交出函数的执行权（即暂停执行）

`Generator` 函数是一个状态机，封装了多个内部状态。执行 `Generator` 函数会返回一个遍历器对象，使用该对象的 `next()` 方法，可以遍历 `Generator` 函数内部的每一个状态，直到 `return` 语句。

`Generator` 函数的特征:
- `function` 关键字与函数名之间有一个星号
- 函数体内部使用 `yield` 表达式，`yield` 是暂停执行的标记
- `next()` 方法遇到 `yield` 表达式，就暂停执行后面的操作,并返回后面的值。

```
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```
上面代码中，第一个 `next` 方法的 `value` 属性，返回表达式 `x + 2` 的值`3`。第二个 `next` 方法带有参数`2`，这个参数可以传入 `Generator` 函数，作为上个阶段异步任务的返回结果，被函数体内的变量 `y` 接收。因此，这一步的 `value` 属性，返回的就是`2`（变量 y 的值）。
## 6、async/await
`async` 函数就是 `Generator` 函数的语法糖。`async` 函数返回一个 `Promise` 对象，可以使用 `then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

`async/await`的特征有：
- `async/await`是基于`Promise`实现的，它不能用于普通的回调函数。
- `async/await`与`Promise`一样，是非阻塞的。
- `async/await`使得异步代码看起来像同步代码，这正是它的魔力所在。

```
async function async1() {
  return 2
}
console.log(async1()) // Promise {<resolved>: 2}
```
上面代码中，函数前面加上 `async` 就会返回一个 `promise` 对象。

```
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
// Generator 函数写法
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// aynsc 函数写法
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
一比较就会发现，`async`函数就是将`Generator`函数的星号`*`替换成`async`，将`yield`替换成`await`，仅此而已。

`优点`：更好的语义,更广的适用性,返回值是 Promise。
## 总结
JS 异步编程发展史：`callback` -> `promise` -> `generator` -> `async + await`。`async/await`函数的实现是将`Generator`函数和自动执行器，包装在一个函数里。它也是目前异步最好的解决方案了。
