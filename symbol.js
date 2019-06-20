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

// 作为属性名的symbol

// 消除魔术字符串
// 魔术字符串：在代码中多次出现，与代码南工程强耦合额某一个具体字符串或者数值。
function getArea(shape, option) {
    let area = 0;
    switch (shape) {
        case 'Triangle': //魔术字符串
            area = .5 * option.width * option.height;
            break;
        // ...
    }
    return area;
}
getArea("Triangle", {width:10, height:20});
// 改正后(常用的消除魔术字符串的方法，就是把它写成一个变量。)
const shape = {
    triangle: 'Triangle',// shape.triangle等于那个值并不重要，重要的是不会与其他的冲突。
}
function getnewArea (shape, option) {
    let area = 0;
    switch (shape) {
        case shape.triangle: 
            area = .5 * option.width * option.height;
            break;
        // ...
    }
    return area;
}
getnewArea(shape.triangle, {width:10, height:20});

// 属性名的遍历，symbol作为属性名不会出现在for...in,for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
// 但是他也不私有属性有一个Object.getOwnPropertySymbols方法可以获取指定对象的所有symbol属性名。
