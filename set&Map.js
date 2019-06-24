// set成员都是唯一的
const s = new Set([1,2,3,4,4]);
[...s]; // [1,2,3,4]

// 向set加入值的时候，不会发生类型转换所以5，'5'是两个不同的值。
// Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”
// 它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。

// Set构造实例的属性和方法
// Set.prototype.constructor:构造函数就是set函数
// Set.prototype.size:返回set的实例成员总数

// Set实例方法：操作方法 && 遍历方法
// 操作方法
// s.add(value):添加某个值，返回set结构本身
// s.delete(value):删除某个值返回布尔值表示删除是否成功
// s.has(value):返回一个布尔值，表示该值是否为set成员
// s.clear():清除所有成员没有返回值
// Array.from()可以将set转为数组
// 遍历方法(set遍历顺序就是插入顺序)
// keys()：返回键名的遍历器
// values()：返回键值的遍历器
// entries()：返回键值对的遍历器
// forEach()：使用回调函数遍历每个成员

let arr = [3, 5, 2, 2, 5, 5];
let unique = [new Set(arr)];
let uniquea = [...new Set(arr)];
console.log(unique); // [ Set { 3, 5, 2 } ]
console.log(uniquea); // [ 3, 5, 2 ]

// 实现并集，交集，差集
let a = new Set([1,2,3]);
let b = new Set([2,3,4]);
console.log(new Set([...a, ...b])); // Set { 1, 2, 3, 4 }
console.log(new Set([...a].filter( data => b.has(data)))); // Set { 2, 3 }
console.log(new Set([...a].filter(x => !b.has(x)))); // Set { 1 }

// WeakSet


