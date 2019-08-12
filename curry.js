// 函数柯里化
mutil(2)(3)(4); // 24
function mutil(a) {
    return function (b) {
        return function (c) {
            return a * b * c;
        }
    }
}
// 接收多个参数的函数转化为接收单一参数的函数, 并且返回接收余下参数且返回结果的新函数的技术。
// 1.参数复用
// 2.提前返回
// 3.延迟执行
const curry = (fn, n = fn.length, args = []) =>
    n === 0 ? fn(...args) : (...args1) => curry(fn, n - args1.length, [...args, ...args1]);

var arr = [1, 2, 3], arr2 = [3, 3, 45];
console.log([...arr, ...arr2]); //[ 1, 2, 3, 3, 3, 45 ]
function add(a, b) { return a + b; }; console.log(add.length); // 2
// arguments.callee返回正在执行的对象

var curry = function (fn) {
    var args = [].slice.call(arguments, 1); //将伪数组转化为数组
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    }
}

var arr = [1, 2, 3, 4];
console.log([].slice.call(arr, 1)); // [2,3,4]
console.log([8, 9].concat([].slice.call(arr))); // [ 8, 9, 1, 2, 3, 4 ]

// 实现add(1)(2)(3)(4)//10
function currying(fn) {
    var allArgs = [];
    return function next() {
        var args = [].slice.call(arguments);
        if (args.length > 0) {
            allArgs = allArgs.concat(args);
            return next;
        }
        // 字符类型
        next.toString = function () {
            return fn.apply(null, allArgs);
        };
        // 数值类型
        next.valueOf = function () {
            return fn.apply(null, allArgs);
        }
        return next;
    }
}
var add = currying(function () {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
});
console.log(add(1)(2)(3)(4).valueOf());


function currying() {
    var arg = [].slice.call(arguments); // 将传入参数转为数组
    var _fn = function () {
        arg = arg.concat([].slice.call(arguments));
        return _fn;
    }
    _fn.valueOf = function () {
        return arg.reduce(function (i, j) { return i + j; });
    }
    return _fn;
}
console.log(currying(1)(2)(3).valueOf());

function curry(fn) {
    var arr = [];
    return function _fn() {
        var args = [].slice.call(arguments);
        if (args.length == 0) return fn(...args);
        else {
            arr = arr.concat(args);
            return _fn;
        }
    }
}

//  https://www.cnblogs.com/lhh520/p/10191168.html


function curry(fn) {
    function _c(restNum, argsList) {
        console.log('.............');
        console.log(restNum);
        console.log(argsList);
        return restNum === 0 ?
            fn.apply(null, argsList) :
            function (x) {
                console.log('---------');
                console.log(x);
                return _c(restNum - 1, argsList.concat(x));
            };
    }
    return _c(fn.length, []);
}
var plus = curry(function (a, b) {
    return a + b;
});
curry(1)(2)(3);



//  函数柯里化
function curry(fn) {
    var res = [];
    return function _fn() {
        if (fn.length > 0) {
            res = res.concat([].slice.call(arguments));
            return _fn;
        } else {
            return _fn(...[].slice.call(arguments));
        }
    }
}



