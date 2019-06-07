// 模板字符串
let name = 'liaojin',
    age = 21;
console.log(`名字${name},年龄${age}`); // 名字liaojin,年龄21

// 模板字符串会保留换行和空格，如果不想要使用.trim()去掉即可
$('#list').html(`<ul>
    <li>first</li>
    <li>second</li>
</ul>`.trim());

// 字符串新增方法
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello World!';
console.log(s.startsWith('H')); //true
console.log(s.endsWith('!')); // true
console.log(s.includes('llo')); // true
console.log(s.startsWith('e')); // false

// repeat()：返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
'na'.repeat(Infinity) // RangeError
'na'.repeat(-1) // RangeError
'na'.repeat(2.9) // "nana"
'na'.repeat(NaN) // ""

// 实例方法：padStart()，padEnd() ES2017 引入了字符串补全长度的功能。
// 如果某个字符串不够指定长度，会在头部或尾部补全。
// padStart()用于头部补全，padEnd()用于尾部补全。
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
'abc'.padStart(10, '0123456789') // '0123456abc'
'x'.padStart(4) // '   x'
// padStart()的常见用途是为数值补全指定位数

// ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。
// 它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。
// 它们返回的都是新字符串，不会修改原始字符串。
const s = '  abc  ';
s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"