// 构造函数创建一个对象
function Foo() {

}
let f = new Foo();
f.name = 'liaojin';
console.log(f.name); // liaojin

// prototype 原型
// 1.每个函数都有prototype属性，是只有函数才有的属性
function Foo () {}
Foo.prototype.name = 'liaojin';
var f1 = new Foo();
var f2 = new Foo();
console.log(typeof f1); // Object
console.log(f1.name) // liaojin
console.log(f2.name) // liaojin
// 2.prototype指向了一个对象，调用该构造函数创建的实例(f1,f2)的原型
// 什么是原型？每一个JavaScript对象(null除外)在创建的时候就会关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

// 构造函数和实例原型的关系
// Foo（构造函数）-(prototype)->Foo.prototype（实例原型）

// __proto__ 原型
// 1.每个js对象（null除外）都具有的一个属性__proto__,这个属性会指向该对象的原型
function Foo(){};
console.log(new Foo().__proto__ === Foo.prototype); // true

// 实例与实例原型的关系
// Foo（构造函数）-(prototype)->Foo.prototype（实例原型）
// Foo --> f1 (对象实例化）
// f1 -(__proto__)-> Foo.prototype（实例原型）

// constructor每个原型都有一个 constructor 属性指向关联的构造函数。
// Foo（构造函数）-(prototype)->Foo.prototype（实例原型）
// Foo --> f1 (对象实例化）
// f1 -(__proto__)-> Foo.prototype（实例原型）
// Foo（构造函数）<-(constroctor)- Foo.prototype（实例原型）

// 实例与原型
// 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。
function Person() {}
Person.prototype.name = 'baba';
let p1 = new Person();
p1.name = 'son';
console.log(p1.name); // son
delete p1.name;
console.log(p1.name); // baba
// 但是如果没有定义Person.prototype.name = 'baba';呢？原型的原型是什么？

// 原型的原型
// 原型对象就是通过 Object 构造函数生成的
// Foo（构造函数）-(prototype)->Foo.prototype（实例原型）
// Foo --> f1 (对象实例化）
// f1 -(__proto__)-> Foo.prototype（实例原型）
// Foo（构造函数）<-(constroctor)- Foo.prototype（实例原型）
// Foo.prototype -(__proto__)-> Object.prototype
// Object -(prototype)-> Object.prototype
// Object <-(constroctor)- Object.prototype

// 原型链
console.log(Object.prototype.__proto__); // null
// 查找属性的时候查到 Object.prototype 就可以停止查找了
// Foo -(__proto__)-> Foo.prototype -(__proto__)-> Object.prototype -(__proto__)-> null