// symbol通过symbol函数生成
let s = Symbol();
console.log(typeof s); // symbol

// symbol函数恶意接受一个字符串作为参数，表示对symbol实例的描述，主要是利于区分
let ss = Symbol("ss"); // Symbol(ss)

// 如果symbol参数是一个对象，那么会调用对象的toString方法，将其转换为字符串，然后生成一个symbol值
const obj = {
    toString() {
      return 'abc';
    }
};
const sym = Symbol(obj);
sym // Symbol(abc)

// Symbol.prototype.description
const sym = Symbol('foo');
sym.description // "foo"

