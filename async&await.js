// async是generator函数的语法糖
// async对generator函数的改进
/**1）内置执行器
Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。
也就是说，async函数的执行，与普通函数一模一样，只要一行。
asyncReadFile();
上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。
这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。
2）更好的语义。
async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
3）更广的适用性。
co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
4）返回值是 Promise。
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。 */

// await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的
async function f() {
    await Promise.reject('出错了');
}
f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了

// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
async function f() {
    await Promise.reject('出错了');
    await Promise.resolve('hello world'); // 不会执行
}
// 第二个await语句是不会执行的，因为第一个await语句状态变成了reject

// 即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
async function f() {
    try {
      await Promise.reject('出错了');
    } catch(e) {
    }
    return await Promise.resolve('hello world');
}  
f()
.then(v => console.log(v))
// hello world

async function f() {
    await Promise.reject('出错了')
      .catch(e => console.log(e));
    return await Promise.resolve('hello world');
}
f()
.then(v => console.log(v))
// 出错了
// hello world