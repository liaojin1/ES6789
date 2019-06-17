// 属性简洁表示法
function foo(x, y) {
    return {x, y};
}
function foo(x, y) {
    return {x: x, y: y}
}
console.log(foo(1, 2)); // { x: 1, y: 2 }

const obj = {
    method() {
        return 'Hello';
    }
}
const obj1 = {
    method: function () {
        return 'hello';
    }
}

// 用于函数的返回值
function getFun() {
    const x = 1;
    const y = 2;
    return {x, y};
}
console.log(getFun()); //{ x: 1, y: 2 }

// 属性名表达式
obj.foo = true;
obj['a' + 'bc'] = true;

// 属性的可枚举性和遍历性
const obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo');

// 属性的遍历
// 1.for...in循环遍历对象自身的和继承的可枚举属性（不含symbol属性）
// 2.Object.keys(obj)返回一个数组，对象自身的（不包括继承）所有可枚举属性的键名
// 3.Object.getOwnPrototypeNames(obj)返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
// 4.Object.getOwnPrototypeSymbols(obj)返回一个数组，包含对象自身的所有 Symbol 属性的键名。
// 5.Reflect.ownKeys(obj)返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

// super关键字
// this总是指向函数所在的当前对象，super指向当前对象的原型对象
const proto = {
    foo: 'hello'
}
const obj = {
    foo: 'world',
    find() {
        return super.foo;
    }
}
Object.setPrototypeOf(obj, proto); //setPrototypeOf控制指向对象
obj.find(); // hello

// 对象的解构赋值
let { x,y,...z } = {x:1, y:2, z:3, v:4};
console.log(z); //{ z: 3, v: 4 }
// 解构赋值是浅拷贝，如果一个键的值是符合类型的值。
// 那么解构赋值拷贝的是这个值得引用，而不是这个值的副本。

// 扩展运算符的解构赋值，不能复制继承自原型对象的属性
let obj1 = {a: 1}
let obj2 = {b: 2}
obj2.__proto__ = obj1;
let {...obj3} = obj2;
console.log(obj3); //{ b: 2 }
console.log(obj3.a); //undefined


// 对象的扩展运算符(...)
// 用于取出参数对象的所有可遍历属性，拷贝到当前的对象中
// 由于数组是特殊的对象，因此也可以用于数组
let arr = { ...['a', 'b', 'c'] };

// 完整克隆对象 不仅仅克隆对象实例，还拷贝对象原型属性
const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj
);

// 扩展运算符用于合并两个对象
Object.assign({},a,b);
let obj = {...a, ...b};

// 如果用户自定义对象放在扩展运算符后边，则扩展运算府内的属性会被覆盖掉
// 这用来修改现有对象部分的属性就很方便了。
let newVersion = {
    ...previousVersion,
    name: 'New Name' // Override the name property
};
