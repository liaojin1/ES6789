// ES5的继承，实质上是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6的继承，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
// 这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

Object.getPrototypeOf(); // 从子类上获取父类
Object.getPrototypeOf(ColorPoint) === Point // true,可以判断一个类是否继承了另一个类
