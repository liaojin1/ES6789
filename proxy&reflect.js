// proxy用于修改某些操作的默认行为
// 代理，对于某些操作的中间媒介
let p = new Proxy(target, handler);
// target用于proxy目标对象（可以使一个数组对象，函数，另一个代理）
// handler一个对象，拦截过滤代理操作的函数


// reflect
// 3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
// 4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
// 这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。
// 也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
