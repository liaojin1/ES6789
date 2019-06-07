// 扩展运算符 ...它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
// 该运算符将一个数组，变为参数序列。
console.log(...[1,2,3]); // 1, 2, 3
// 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。

// JavaScript 不提供求数组最大元素的函数
// 所以只能套用Math.max函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用Math.max了。
Math.max.apply(null, [1,2,3]); // es5
Math.max(...[1,2,3]); // es6

// 应用
// 克隆数组
let a1 = [1,2];
let a2 = [...a1]; // es6 copy
let a3 = a1.concat(); // es5 copy

// 合并数组(浅拷贝，是对原来的引用)
arr1.concat(arr2, arr3);
[...arr1, ...arr2, ...arr3];

// 与解构赋值结合，用于生成数组，如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [first, ...rest] = [1, 2, 3, 4, 5];
first; // 1
rest;  // [2, 3, 4, 5]

// 可以将字符串转为真正的数组
[...'hello'] // [ "h", "e", "l", "l", "o" ]

// 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
// Map 和 Set 结构，Generator 函数


//Array.from()方法用于将两类对象转为真正的数组：
//类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
[].slice.call(arrayLike); // es5
Array.from(arrayLike); // es6
// 扩展运算符背后调用的是遍历器接口（Symbol.iterator）, 如果一个对象没有部署这个接口，就无法转换。
// Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。
// 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。

// Array.of()用于将一组值转化为数组，主要目的是弥补了Array()方法的不足，参数个数不同导致Array()的行为不同
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

// Array.of()原理
function ArrOf () {
    return [].slice.call(arguments);
}

// 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员）
// 然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

// find(); findIndex();
// find找到符合条件的返回值; undefined
// findIndex找到符合条件的返回索引; -1
[1, 4, -5, 10].find((n) => n < 0)// -5
[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
}) // 2

// fill();给数组中填充指定值
['a', 'b', 'c'].fill(7);// [7, 7, 7]
new Array(3).fill(7);// [7, 7, 7]

// entries(),keys(),values()
// 用于遍历数组，可以用for...of遍历，区别是分别遍历键值对，键名，键值
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
  // 0
  // 1 
for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
  // 'a'
  // 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
  // 0 "a"
  // 1 "b"

//  includes()判断数组是否包含给定值
// flat();flatMap();
[1, 2, [3, 4]].flat()// [1, 2, 3, 4]
[1, 2, [3, [4, 5]]].flat(2)// [1, 2, 3, 4, 5]