// 调用iterator接口的场合
// 1)解构赋值
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;// x='a'; y='b';
let [first, ...rest] = set;// first='a'; rest=['b','c'];

// 2)扩展运算符
var str = 'hello';
[...str];//  ['h','e','l','l','o']

// 3)yield*
// 是一个可遍历的结构，他会调用该结构的遍历器接口

// 4)其他
// 由于数组的遍历会调用这些遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口
// for...of
// Array.from
// Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
// Promise.all() Promise.race();

// 字符串的iterator接口
var somesth = 'hi';
typeof somesth[Symbol.iterator]; //function
var iter = somesth[Symbol.iterator]; //调用遍历器方法返回遍历器对象
iter.next();
iter.next();

// 可以覆盖原生的遍历器方法
var str = new String('hi');
[...str];// ["h", "i"]
str[Symbol.iterator] = function() {
    return {
        next: function() {
            if (this._first) {
              this._first = false;
              return { value: "bye", done: false };
            } else {
              return { done: true };
            }
          },
          _first: true
    }
};
[...str]; // ["bye"]
str;//hi
// 由于上面的代码中iterator被修改了，因此调用扩展运算符后，值也被修改了

// iterator和generator
// Symbol.iterator的最简单实现
let myIterable = {
    [Symbol.iterator]:function *() {
        yield 1;
        yield 2;
        yield 3;
    }
};
console.log([...myIterable]);// [ 1, 2, 3 ]

let obj = {
    *[Symbol.iterator] (){
        yield 'hello';
        yield 'world';
    }
}
console.log([...obj]);// [ 'hello', 'world' ]

// 遍历器对象[Symbol.iterator]的return和throw方法,throw方法主要为了配合generator函数使用，一般比阿尼器对象用不到这个方法
// 如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
// return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法。
// 如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。
function readLinesSync(file) {
    return{
        next () {
            return {done: false}
        },
        return () {
            file.close();
            return {done: true}
        }
    }
}
// 情况一:输出文件的第一行以后，就会执行return方法，关闭这个文件；
for (let line of readLinesSync(fileName)) {
    console.log(line);
    break;
}
// 情况二:会在执行return方法关闭文件之后，再抛出错误。
for (let line of readLinesSync(fileName)) {
    console.log(line);
    throw new Error();
}

// Set和Map结构
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit
let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
}
// ['a', 1]
// ['b', 2]
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) { //等同于map
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
for (let [key, value] of map) {
  console.log(key + ' : ' + value);
}
// a : 1
// b : 2

// 对与普通的对象,for...of结构不能直接使用会报错，必须部署了 Iterator 接口后才能使用。
// 但是，这样情况下，for...in循环依然可以用来遍历键名。
// 一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。
for (var key of Object.keys(someObject)) {
    console.log(key + ': ' + someObject[key]);
}
// 另一个方法是使用 Generator 函数将对象重新包装一下。
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}
for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}
// a -> 1
// b -> 2
// c -> 3
