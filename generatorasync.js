// 回调函数
// js语言对异步编程的实现
// 把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。
false.readFile('/etc/test', 'utf-8', function(err, data) {
    if (err) throw err;
    console.log(data);
});
// 第三个参数是回调函数，等到函数返回/etc/test这个文件之后才执行
// 为什么回调函数中的第一个参数是err(如果没有错误第一个参数就是null)
// 由于第一段执行完以后，任务所在的上下文环境就已经结束了。在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。

// 异步应用
fs.readFile(fileA, 'utf-8', function (err, data) {
    fs.readFile(fileB, 'utf-8', function (err, data) {
      // ...
    });
});

var readFile = require('fs-readfile-promise');
readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});
// 可以看到，Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。
// Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不一堆then，原来的语义变得很不清楚。

// generator
// 协程
// 1.协程A开始执行
// 2.协程A执行到一半，暂停，执行权转移到协程B
// 3.一段时间后，协程B交还执行权
// 4.协程A恢复执行
function* test() {
    let a = yield test2();
}
// 执行到yield的时候将执行权交出给test2()，协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。


// 数据交换和错误处理
// next返回值的 value 属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据。
function* test(x) {
    let y = yield x + 2;
    return y;
}
var g = test(1);
console.log(g.next());
console.log(g.next(2));
//错误处理
function* test(x) {
    try {
        var y = yield x + 2;
    } catch (e) {
        console.log(e);
    }
    return y;
}
var g = test(1);
console.log(g.next().value);
g.throw('error'); // error


// generator执行一个真正的异步任务
var fetch = require('node-fetch');
function* gen(){
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}
// 执行
var g = gen();
let result = g.next();
result.value.then(function(data){
    return data.json();
}).then(function(data) {
    g.next(data);
})
/**虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。 */

// Thunk 函数是自动执行 Generator 函数的一种方法。
// 参数的求值策略
var x = 1;
function f(m) {
  return m * 2;
}
f(x + 5);
// 传值调用,c语言,f(6),传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。
// 传名调用,Haskell语言,f(x + 5) * 2;

// Thunk函数
// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
// 它是“传名调用”的一种实现策略，用来替换某个表达式。
var thunk = function () {
    return x + 5;
} 
function f(thunk) {
    return thunk() * 2;
}

// Thunk自动执行generator函数
function run (f) {
    let gen = f();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
function* g() {
    var f1 = yield readFileThunk('fileA');
    var f2 = yield readFileThunk('fileB');
    // ...
    var fn = yield readFileThunk('fileN');
}
run(g);