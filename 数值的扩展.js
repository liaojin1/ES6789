// Number.isFinite(), Number.isNaN() § ⇧
// ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。
// Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// Number.isNaN()用来检查一个值是否为NaN。
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
// Number.isNaN('true' / 0) // true
// Number.isNaN('true' / 'true') // true
/** 它们与传统的全局方法isFinite()和isNaN()的区别在于，
 * 传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，
 * Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。*/

//  Number.parseInt();Number.parseFloat()
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
// 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

// Number.isInteger(): 用来判断一个数值是否为整数。
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger('15') // false
// 如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true

// Number.EPSILON ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true
1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true

// ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
// Number.isSafeInteger()实现原理
Number.isSafeInteger = function (n) {
    return (typeof n === 'number' &&
      Math.round(n) === n &&
      Number.MIN_SAFE_INTEGER <= n &&
      n <= Number.MAX_SAFE_INTEGER);
}

// Math对象新增方法
Math.trunc() // Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.sign() // 用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
/**
 * 参数为正数，返回+1；参数为负数，返回-1；参数为 0，返回0；参数为-0，返回-0;其他值，返回NaN。 */
Math.cbrt() // 用于计算一个数的立方根。
