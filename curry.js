// 函数柯里化
mutil(2)(3)(4); // 24
function mutil(a) {
    return function (b) {
        return function (c){
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

var curry = function(fn) {
    var args = [].slice.call(arguments, 1); //将伪数组转化为数组
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    }
} 

var arr = [1,2,3,4];
console.log([].slice.call(arr, 1)); // [2,3,4]
console.log(arr.concat([].slice.call()))

// 实现add(1)(2)(3)(4)//10
function currying(fn) {
    var curarr = [];
    return function next(){
        var args = [].slice.call(arguments);
        if(args.length > 0) {
            curarr = curarr.concat(args);
            return next;
        } else {
            return fn.apply(null, curarr);
        }
    }
}