// 准备知识：执行栈、闭包、
// js执行栈
// js中有三种执行上下文
// 1.全局执行上下文默认的，在浏览器中是 window 对象，并且 this 在非严格模式下指向它(严格模式下指向undefined)。
// 2.函数执行上下文，JS 的函数每当被调用时会创建一个上下文。
// 3.Eval 执行上下文，eval 函数会产生自己的上下文，这里不讨论。
function foo() {
    console.log(1);
    bar();
    console.log(3);
}
function bar() {
    console.log(2);
}
foo(); // 1 2 3
// 执行栈：当foo被调用的时候压入执行栈，输出1。当bar被调用的时候压入执行栈，输出2。执行完之后bar弹出执行栈。foo接着向下执行。输出3。
// -------------------------------------------------------------------------------------------------------------------------------
// 闭包
// 种种原因我们需要访问到函数内部的变量。
function foo() {
    var f = 100;
    function bar() { // 链接foo函数内部和外部的一座桥梁
        console.log(f);
    }
    return bar;
}
// 上述代码中bar可以访问到foo的所有内部变量。既然bar可以得到所有foo的内部变量，那么将bar作为返回值我们就可以拿到foo内部变量了。
// 闭包的用处：1.访问函数内部变量。2.让这些变量的值始终保存在内存中。
function foo() {
    var n = 10;
    nadd = function() {
        n += 1;
    }
    function bar() {
        console.log(n);
    }
    return bar;
}
var res = foo();
res(); // 10
nadd();
res(); // 11
// -------------------------------------------------------------------------------------------------------------------------------
// 函数的this
var name = "Leo";
function getName() {
  var name = "Neil";
  console.log(this); // [object Window]
  return this.name;
}
getName(); // Leo
// 对象的this
var name = 'Neil';
var person = {
  name: 'Leo',
  sayHi: function() {
    console.log(this); // person
    return 'Hi! My name is ' + this.name;
  }
};
person.sayHi(); // "Hi! My name is Leo"
// 改变this
var leo = {
    name: 'Leo',
    sayHi: function () {
      return "Hi! My name is " + this.name;
    }
}
var neil = {
    name: 'Neil'
};
leo.sayHi(); // "Hi! My name is Leo"
leo.sayHi.call(neil); // "Hi! My name is Neil"
// 闭包中的this
var name = 'Neil';
var person = {
  name: 'Leo',
  sayHi: function() {
    return function () {
      return 'Hi! My name is ' + this.name;
    }
  }
};
person.sayHi()(); // "Hi! My name is Neil"
// 解决this，使他指向Leo
person.sayHi().call(person); //  "Hi! My name is Leo"
var name = 'Neil';
var person = {
  name: 'Leo',
  sayHi: function() {
    var that = this;
    return function () {
      return 'Hi! My name is ' + that.name;
    }
  }
};
person.sayHi()(); // "Hi! My name is Neil"
// -------------------------------------------------------------------------------------------------------------------------------
// call apply bind
function Person(name) {
    this.name = name;
}
Person.prototype = {
    constructor: Person,
    sayName: function() {
        console.log(this.name);
    }
}
var p = new Person('liaojin');
p.sayName(); // liaojin
var Gzz = {name:'Gzz'};
// 想输出Gzz对象的name
p.sayName.call(Gzz); // Gzz
p.sayName.apply(Gzz); // Gzz
p.sayName.bind(Gzz)(); // Gzz
// call apply bind三者区别
// call和apply改变了this之后直接执行函数，bind是返回了一个函数
// call apply区别
// 他们俩之间的差别在于参数的区别，call和aplly的第一个参数都是要改变上下文的对象
// 而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。
fn.call(obj, arg1, arg2, arg3);
fn.apply(obj, [arg1, arg2, arg3]);
// 应用：
// 1.求数组中的最大和最小值
var arr = [1,2,3,11,23];
Math.min.apply(undefined, arr);
Math.max.call(undefined, [1,2,3,11,23]);
// 2.将伪数组转化为数组
var arrayLike = {
  0: 'qianlong',
  1: 'ziqi',
  2: 'qianduan',
  length: 3
}
Array.prototype.slice.call(arrayLike);
// 3.数组追加
var arr1 = [1,2,3];
var arr2 = [4,5,6];
[].push.apply(arr1, arr2);
// 4.判断变量类型
Object.prototype.toString.call([]) == '[Object Array]'; // 判断是否为数组
// 5.利用call和apply做继承
function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Boy(name) {
    Person.call(this, name);
}
function Girl(name, age) {
    Person.apply(this, arguments);
}
console.log(new Boy('Gzz'));
console.log(new Girl('Lj', 20));