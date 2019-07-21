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

// yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。
function* foo() {
    yield 'a';
    yield 'b';
}
  
function* bar() {
    yield 'x';
    // 手动遍历 foo()
    for (let i of foo()) {
      console.log(i);
    }
    yield 'y';
}
  
for (let v of bar()){
    console.log(v);
}
// x
// a
// b
// y

//简写
function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}

// 嵌套数组的所有成员取出
function* iterTree(tree) {
    if (Array.isArray(tree)) {
      for(let i=0; i < tree.length; i++) {
        yield* iterTree(tree[i]);
      }
    } else {
      yield tree;
    }
  }
  const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
  
  for(let x of iterTree(tree)) {
    console.log(x);
  }
  // a
  // b
  // c
  // d
  // e
  [...iterTree(tree)];// ["a", "b", "c", "d", "e"]嵌套数组的平铺




function Tree(left, root, right) {
    this.left = left;
    this.root = root;
    this.right = right;
}
//   实现二叉树的中序遍历
function* inorder(t) {
    if(t) {
        yield* inorder(t.left);
        yield t.root;
        yield* inorder(t.right);
    }
}
//   实现二叉树的先序遍历
function* firstInorder(t) {
    if(t) {
        yield t.root;
        yield* firstInorder(t.left);
        yield* firstInorder(t.right);
    }
}
function make(arr) {
    // 判断是是否为叶子节点
    if(arr.length == 1) return new Tree(null, arr[0], null);
    return new Tree(make(arr[0]), arr[1], make(arr[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}
var resultFirst = [];
for (let i of firstInorder(tree)) {
    resultFirst.push(i);
}
console.log(resultFirst);
console.log(result);
