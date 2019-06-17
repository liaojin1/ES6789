// 比较两个值是否相等==，===都有缺点
// 前者会自动转换数据类型，后者的NaN不等于自身以及+0=-0
// Object.is()比较两个值是否完全相等
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

// Object.assign()用于对象合并，将原对象的所有可枚举属性复制到目标对象
// Object.assign()拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
Object.assign(target,obj1,obj2);

// 注意： Obejct.assign()是浅拷贝，不是深拷贝，如果原对象某个属性值是对象，那么目标对象得到的拷贝是这个对象的引用
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b // 2
// 同名属性替换，一旦遇到同名属性，Object.assign是替换而不是添加
// 数组的处理(Object.assign把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。)
Object.assign([1, 2, 3], [4, 5]);// [4, 5, 3]
// 取值函数的处理
// Object.assign只进行值得复制，如果要复制的值是一个取值函数，那么将求值后在复制
const source = {
    get foo() { return 1 }
};
const target = {};
Object.assign(target, source)
// { foo: 1 }

// 常见用途
// (1)给对象添加属性
class point {
    constroctor(x, y) {
        Object.assign(this, {x, y});//将属性x, y添加到point类的对象实例
    }
}
// (2)为对象添加方法
Object.assign(Someclass.prototype, {
    someMethod (arg1, arg2) {},
    otherMethod () {}
});
Someclass.prototype.someMethod = function (arg1, arg2) {}
Someclass.prototype.otherMethod = function () {}
// (3)克隆对象:保持继承链克隆方法
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
}
// (4)合并多个对象
const merge = (...sources) => Object.assign({}, ...sources);
// (5)为属性指定默认值（DEFAULT:默认值，option:用户提供参数）
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};
function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
    console.log(options);
    // ...
}
const DEFAULTS = {
    url: {
      host: 'example.com',
      port: 7070
    },
};
processContent({ url: {port: 8000} })
//  存在浅拷贝问题，这段代码本意是将port更新8000，host不变，但是结果将url覆盖，所以host不存在了
// {
//   url: {port: 8000}
// }

// Object.getOwnPropertyDescriptors()返回指定对象所有自身属性（非继承属性）的描述对象。ES7
// 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

// __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

// Object.keys()，Object.values()，Object.entries()
// (1)Object.keys()返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)// ["foo", "baz"]
// ES7引入了Object.values（值）和Object.entries（键值对）工for...of循环使用

// Object.fromEntries() 用于将一个键值对数组转为对象。是Object.entries的逆操作

