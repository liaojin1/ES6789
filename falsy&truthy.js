falsy: 
undefined
null
NaN
0
''
false
truthy:
Function构造函数
new Number
new Boolean

const a = {}
const b = { key: 'b' }
const c = { key: 'c' }
a[b] = 123
a[c] = 456
console.log(a); // 456

const numbers = [1, 2, 3]
numbers[10] = 11
console.log(numbers); //[1, 2, 3, 7 x empty, 11]

(() => {
    let x, y
    try {
      throw new Error()
    } catch (x) {
      (x = 1), (y = 2)
      console.log(x)
    }
    console.log(x)
    console.log(y)
  })() // 1 undefined 2

  const num = parseInt('7*6', 10); // 7
// 只返回了字符串中第一个字母. 设定了 进制 后 (也就是第二个参数，指定需要解析的数字是什么进制: 
// 十进制、十六机制、八进制、二进制等等……),parseInt 检查字符串中的字符是否合法.
// 一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。
// *就是不合法的数字字符。所以只解析到"7"，并将其解析为十进制的7. num的值即为7.

(() => {
    let x = (y = 10);
})();
console.log(typeof x); // undefined
console.log(typeof y); // number
//   我们设定y等于10时,我们实际上增加了一个属性y给全局对象(浏览器里的window, Nodejs里的global)。在浏览器中， window.y等于10.
// 然后我们声明了变量x等于y,也是10.但变量是使用 let声明的，它只作用于 块级作用域, 仅在声明它的块中有效；就是案例中的立即调用表达式(IIFE)。
// 使用typeof操作符时, 操作值 x没有被定义：因为我们在x声明块的外部，无法调用它。
// 这就意味着x未定义。未分配或是未声明的变量类型为"undefined". console.log(typeof x)返回"undefined".
// 而我们创建了全局变量y，并且设定y等于10.这个值在我们的代码各处都访问的到。 
// y已经被定义了，而且有一个"number"类型的值。 console.log(typeof y)返回"number".

// counter.js
let counter = 10;
export default counter;
// index.js
import myCounter from "./counter";
myCounter += 1;
console.log(myCounter);
// 引入模块是只读的：你不能修改引入的模块。只有导出他们的模块才能修改其值。
// 当我们给myCounter增加一个值的时候会抛出一个异常： myCounter是只读的，不能被修改。

const name = "Lydia";
age = 21;
console.log(delete name); // false
console.log(delete age); // true
// delete操作符返回一个布尔值： true指删除成功，否则返回false. 但是通过 var, const 或 let 关键字声明的变量无法用 delete 操作符来删除。
// name变量由const关键字声明，所以删除不成功:返回 false. 而我们设定age等于21时,我们实际上添加了一个名为age的属性给全局对象。
// 对象中的属性是可以删除的，全局对象也是如此，所以delete age返回true.

const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;
console.log(y); // 1
/**我们可以通过解构赋值来解析来自对象的数组或属性的值，比如说：
[a, b] = [1, 2];
a的值现在是1，b的值现在是2.而在题目中，我们是这么做的:
[y] = [1, 2, 3, 4, 5];
也就是说，y等于数组的第一个值就是数字1.我们输出y， 返回1. */


// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));
// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
// running sum.js, running index.js, 3
// import命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。
// 这是CommonJS中require（）和import之间的区别。使用require()，您可以在运行代码时根据需要加载依赖项。
//  如果我们使用require而不是import，running index.js，running sum.js，3会被依次打印

// String.raw函数是用来获取一个模板字符串的原始字符串
console.log(String.raw`Hello\nworld`);// Hello\nworld

// 纯函数一种若输入参数相同，则永远会得到相同输出的函数。
function sum(a, b) {
    return a + b;
}// 纯函数
