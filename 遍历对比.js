// 1.最原始的遍历方法是for
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
// 这种写法比较麻烦，因此数组提供内置的forEach方法。

// 2.forEach
arr.forEach(function (value) {
    console.log(value);
})
// 无法中途跳出forEach循环，break命令或return命令都不能奏效。

// 3.for...in可以循环遍历数组的键名
for (let i in arr) {
    console.log(arr[i]);
}
/**缺点
 * 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
 * for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
 * for...in循环会以任意顺序遍历键名。
 * for...in循环主要是为遍历对象而设计的，不适用于遍历数组。 */ 

//  4.for...of循环
for (let value of myArray) {
    console.log(value);
}
/**有着同for...in一样的简洁语法，但是没有for...in那些缺点。
 * 不同于forEach方法，它可以与break、continue和return配合使用。
 * 提供了遍历所有数据结构的统一操作接口。 */