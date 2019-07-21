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
function* gen() {
    this.a = 'a';
    yield this.b = 'b';
    yield this.c = 'c';
}
function F() {
    return gen.call(gen.prototype);
}
var f = F.call(F.prototype);
f.next();
f.next();
f.next();
f.a;
f.b;
f.c;

// generator与状态机
function* f() {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
}

// generator与协程（协作的线程）
// 协程与子例程差异
// 1.子例程采用堆栈式，后进先出，只用当前调用的子函数全部执行完毕才会执行父函数
// 2.协程多个线程（单线程情况下多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态，线程（或函数）之间可以交换执行权。
// 一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。
// 这种可以并行执行、交换执行权的线程（或函数），就称为协程。

// 在内存中子例程只调用一个栈，而协程是同时调用多个栈，但只有一个栈在运行的状态。以多占内存为代价实现多任务并行。

// 协程与普通线程的差距
// 相同点：
// 协程适合用于多任务运行的环境。在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。
// 差异：
// 同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。
// 普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

// 应用
// 异步操作的同步化表达(处理异步操作，改写回调函数)
function* numbers() {
    let file = new FileReader("test.text");
    try {
        while(!file.eof) {
            yield parseInt(file.readLine(), 10);
        }
    } finally {
        file.close();
    }
}
