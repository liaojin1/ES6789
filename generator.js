// 函数提供一种异步编程的方案
// 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。
// 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
// Generator特征function* () {},里边使用yield
// 调用方法，后边加一个(),但是调用之后不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象
// 必须调用next方法，使指针指向下一个状态，直到遇到return为止
// yield表达式是暂停执行的标记，而next方法可以恢复执行。

// Generator 函数不用yield表达式，就变成了一个单纯的暂缓执行函数。
function* f() {
    console.log('f');
}
var a = f(); //如果不使用generator函数那么这时候会直接输出console.log()
setTimeout(function() {
    a.next(); // 但是generator函数需要调用next才可以执行
},2000);

// for...of循环可以自动遍历generator函数
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }
  for (let v of foo()) {
    console.log(v);// 1 2 3 4 5
  }

// generator函数的this
// generator函数总是返回一个遍历器，这个遍历器就是generator函数的实例也继承了prototype方法
function* g() {}
g.prototype.say = function() {
    return 'hello';
}
console.log(g().say());
// 拿不到generator函数中的属性a
function* g() {
    this.a = 'hi';
}
console.log(g().a); //undefined
// 也不可以使用new去创建

// 解决：使generator函数既可以使用this又可以使用next
function* F() {
    this.a = 'a';
    this.b = 'b';
}
