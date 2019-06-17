// 1.区别
// 浅拷贝： 将原对象或原数组的引用直接赋给新对象，新数组，新对象／数组只是原对象的一个引用
// 深拷贝： 创建一个新的对象和数组，将原对象的各项属性的“值”（数组的所有元素）拷贝过来，是“值”而不是“引用”

// 2.为什么要用深拷贝？
// 我们希望在改变新的数组（对象）的时候，不改变原数组（对象）

// 3.深拷贝要求程度
// 我们在使用深拷贝的时候，一定要弄清楚我们对深拷贝的要求程度：
// 是仅“深”拷贝第一层级的对象属性或数组元素，还是递归拷贝所有层级的对象属性和数组元素？

// 4.怎么检验一个深拷贝是否成功？
// 改变任意一个新对象/数组中的属性/元素,都不改变原对象/数组

// 深拷贝数组（只拷贝第一层级）
// (1)直接遍历
var arr = [1, 2, 3, 4];
function copy(arr) {
    var copyArr = [];
    for (let i = 0; i < arr.length; i++) {
        copyArr.push(arr[i]);
    }
    return copyArr;
}
// (2)slice()方法返回一个从已有的数组中截取一部分元素片段组成的新数组（不改变原来的数组！）
// 用法：array．slice(start,end)　start表示是起始元素的下标，　end表示的是终止元素的下标
// 当slice()不带任何参数的时候，默认返回一个长度和原数组相同的新数组
var arr = [1, 2, 3, 4];
var copyArr = arr.slice();
// (3)concat()方法用于连接两个或多个数组。( 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。)
// 用法：array.concat(array1,array2,......,arrayN)
var arr = [1, 2, 3, 4];
var copyArr = arr.concat();

// 对于一级数组元素是基本类型变量（如number,String,boolean）的简单数组, 上面这三种拷贝方式都能成功.
// 但对第一级数组元素是对象或者数组等引用类型变量的数组，上面的三种方式都将失效,因此需要深拷贝对象方法

// 深拷贝对象(只拷贝第一层级)
// (1)直接遍历
// (2)Object.assign()
var obj = {
    name: 'liaojin',
    age: 20
}
var copyObj = Object.assign({}, obj);
// (3)扩展运算符

// 多层嵌套上边三种方法则会失效
var obj = {
    name: {
        firstName: 'jin',
        lastName: 'liao'
    },
    age: 20
}
var copyObj = Object.assign({}, obj)
copyObj.name.lastName = '湖水的小浅湾';
console.log(obj.name.lastName); // 湖水的小浅湾
console.log(copyObj.name.lastName); // 湖水的小浅湾

// 拷贝所有层级
// (1)JSON.parse(JSON.stringify(xxxx))
var obj = {
    name: {
        firstName: 'jin',
        lastName: 'liao'
    },
    age: 20
}
var copyObj = JSON.parse(JSON.stringify(obj));
// (2)递归
function copyObj(obj) {
    var newObj = obj.constructor == Array ? []:{};
    if (typeof obj !== 'object') {
        return ;
    }
    for (var i in obj) {
        newObj[i] = typeof obj[i] === 'Object' ? copyObj(obj[i]) : obj[i];
    }
    return newObj;
}

// 存在的大量深拷贝的情况下的解决方案（immutable提供的解决方案）
// 深拷贝实际上是很消耗性能的。
// （我们可能只是希望改变新数组里的其中一个元素的时候不影响原数组，但却被迫要把整个原数组都拷贝一遍，这不是一种浪费吗？）
// 所以，当你的项目里有大量深拷贝需求的时候，性能就可能形成了一个制约的瓶颈了。
// immutable的作用：
// 通过immutable引入的一套API，实现：
// 1.在改变新的数组（对象）的时候，不改变原数组（对象）
// 2.在大量深拷贝操作中显著地减少性能消耗
const { Map } = require('immutable');
const map1 = Map({a: 1, b: 2, c: 3});
const map2 = map1.set('b', 50);
map1.get('b') // 2
map2.get('b') // 50

