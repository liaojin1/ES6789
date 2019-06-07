// 函数参数的默认值
// ES5写法
function say(x, y) {
    y = y || ' World!';
    console.log(x+y);
}
say('hello', ''); // hello World!
// ES6写法
function say(x, y = ' World!') {
    console.log(x+y);
}
say('hello', ''); // hello


// 与解构赋值默认值结合使用
function foo({x, y = 5}) {
    console.log(x, y);
}
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
// 上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。
// 只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。
// 如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错。避免foo()报错情况
function foo({x, y = 5} = {}) {
    console.log(x, y);
}
foo() // undefined 5

/**注意：
 * 1.只有参数是一个{}时才会进行解构赋值
 * 2.解构赋值默认值写法{x=1,y=2}
 * 3.函数参数默认值写法function foo({x=1,y=2}={}) {}
 */
// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
}
// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}
// 上面两种写法都对函数的参数设定了默认值
// 区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；
// 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]
// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]
// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

// 函数的length属性，将返回没有指定默认值的参数个数。也不包括...rest参数

// rest参数用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
function sortArr() {
    Array.prototype.slice.call(arguments).sort();
}
const sortArr = (...num) => {num.sort()};

// 尾调用优化是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

// 尾递归*****
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。
// 但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

// 计算n的阶乘
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
factorial(5) // 120
// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。
// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial(n, total = 1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}
factorial(5, 1) // 120

// Fibonacci 数列
function Fibonacci(n) {
    if(n <= 1) {return 1;}
    return Fibonacci(n-1) + Fibonacci(n-2);
}
// 改进版
function Fibonacci2(n, num1 = 1, num2 = 1) {
    if (n <= 1) return num2;
    return Fibonacci(n-1, num2, num2+ num1);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity