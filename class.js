// ES5
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
}

// ES6
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

// 类使用严格模式
// 不存在提升，因为要保证子类在父类的后面
// 静态方法:加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Foo{
    static classMethod() {
        return 'hello';
    }
}
Foo.classMethod() // 'hello'
// 注意，如果静态方法包含this关键字，这个this指的是类不是实例
class Foo {
    static bar() {
      this.baz();// 这里的this指的是Foo类
    }
    static baz() {
      console.log('hello');
    }
    baz() {
      console.log('world');
    }
}
Foo.bar() // hello
// 父类的静态方法可以被子类继承
class Foo {
    static classMethod() {
      return 'hello';
    }
}
class Bar extends Foo {
}
Bar.classMethod() // 'hello'
// 实例属性的新写法
class IncreasingCounter {
    constructor() {
      this._count = 0;
    }
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }
class IncreasingCounter {
    _count = 0;
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
// 老写法
class Foo {
// ...
}
Foo.prop = 1;
// 新写法
class Foo {
    static prop = 1;
}

// 私有方法：bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。
// 但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
  // ...
};

// 需要注意的是，子类继承父类时，new.target会返回子类。
class Rectangle {
    constructor(length, width) {
      console.log(new.target === Rectangle);
      // ...
    }
  }
  class Square extends Rectangle {
    constructor(length) {
      super(length, width);
    }
  }
  var obj = new Square(3); // 输出 false  
// new.target属性辅助可以写出不能独立使用、必须继承后才能使用的类。
class Shape {
    constructor() {
      if (new.target === Shape) {
        throw new Error('本类不能实例化');
      }
    }
  }
  class Rectangle extends Shape {
    constructor(length, width) {
      super();
      // ...
    }
  }
  var x = new Shape();  // 报错
  var y = new Rectangle(3, 4);  // 正确
//   Shape类不能被实例化，只能用于继承。