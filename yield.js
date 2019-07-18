// 使生成器函数执行暂停
// yield关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的return关键字。
// yield实际上返回一个IteratorResult对象，它有两个属性，value和done。
// value：值，done：false生成器函数尚未完全完成。
// yield表达式遇到，代码将被暂停。直到next()被调用，函数继续执行，直到遇到以下几个值
// 1.yield
// 2.throw
// 3.到达生成器函数的结尾
// 4.return语句

// 如果将参数传递给next函数，则该值将成为生成器yield操作的返回值

var f = function *(){
    var x = 1;
    var y = yield(x+1);
    var z = yield(x+y);
    return z;
  }
  var a = f.next();   // 2
  var b = f.next(2);  // 3
  var c = f.next(4);  // 4

  function* test (x) {
      var y = 2 * (yield(x + 1));
      var z = yield(y / 3);
      return x + y + z;
  }
  var a = test(5);
  console.log(a.next());
  console.log(a.next());
  console.log(a.next());
  var b = test(6);
  console.log(b.next());
  console.log(b.next(5));
  console.log(b.next(6));
/** 分析
next() 传参是对yield整体的传参，否则yield类似于return
A组
{ value: 6, done: false }
{ value: NaN, done: false }
{ value: NaN, done: true }
x恒为5，所以第一次调用传空没问题，可得到对应的第一个yield返回值:yield (x + 1)
第二次调用，无参数传入，所以y为NaN(2* undefined)，自然得不到z
第三次调用同上分析

B组
{ value: 7, done: false }
{ value: 3.3333333333333335, done: false }
{ value: 22, done: true }
x恒为5，所以第一次调用传空没问题，可得到对应的第一个yield返回值:yield (x + 1)
第二次调用，传入12，所以y为24(yield (x + 1)=入参)，得到第二个yield: yield (y / 3)=8
第三次调用同上分析,得到最后的z值并return=42*/ 