// 实现call函数
function add(c, d) {
    return this.a + this.b + c + d;
}
var obj = {
    a: 1,
    b: 2
}
console.log(add.call(obj, 3, 4));//10

var obj = {
    a: 1,
    b: 2,
    add: function (c, d) {
        return this.a + this.b + c + d;
    }
}
obj.add(); // 10
// 原理实现
Function.prototype.myCall = function (context) {
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}

function test() {
    console.log([...arguments].slice(1));
}
test(1, 2, 3, 4);//[2, 3, 4]

// 实现apply函数
Array.prototype.myApply = function (context) {
    context = context || window;
    context.fn = this;
    let res;
    if (arguments[1]) {
        res = context.fn(...arguments[1]);
    } else {
        res = context.fn();
    }
    delete context.fn;
    return res;
}

// 实现bind函数
Array.prototype.myBind = function (context) {
    let _this = this;
    let args = [...arguments].slice(1);
    // let args = Array.prototype.slice.call(arguments);
    return function () {
        let bindArgs = [...arguments];
        return _this.apply(context, args.concat(bindArgs));
    }
}


// 实现instanceof
function myInstanceof(l, r) {
    let left = l.__proto__;
    let right = r.prototype;
    while (true) {
        if (left === null) {
            return false;
        }
        if (left === right) {
            return true;
        }
        left = left.__proto__;
    }
}

// 实现new
// (1) 创建一个新对象；
// (2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
// (3) 执行构造函数中的代码（为这个新对象添加属性）；
// (4) 返回新对象。
var obj = {};
obj.__proto__ = Base.prototype;
Base.apply(obj);

// 实现promise


// 使用setTimeout和setInterval
setTimeout(() => {
    setTimeout(arguments.callee, 500);
}, 500)

// ajax
let xhr = new XMLHttpRequest();
xhr.open();
xhr.send();
onreadystatechange = () => {
    if (xhr.readyStatus === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}