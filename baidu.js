// 一面
// 标准盒模型，怪异盒模型
// css动画
// 宏任务微任务，事件队列
var a = {};
var b = { key: 'b' };
var c = { key: 'c' };
var d = [2, 3, 4];
a[b] = 123;
a[c] = 234;
a[d] = 333;
console.log(a[b]);
console.log(a[c]);
console.log(a[d]);
// 闭包问题
var foo = (function () {
    var screct = 'screct';
    return {
        getScrect: function () {
            return screct;
        },
        setScrect: function (val) {
            this.screct = val;
        }
    }
})();
foo.screct;//undefined
foo.getScrect;//screct
foo.setScrect('newVal');//undefined
foo.getScrect;//newVal
// 实现随机数组
// mvvm原理

// 二面
// 就是如果一个页面上包含子组件父组件上千个组件嵌套，那么用什么算法或者什么方式可以使浏览器不卡顿的加载出来
// 实现单词检索匹配
// 前中后序遍历的区别
// 深度优先和广度优先
// 最短路径
// 虚拟dom的diff用的是深度优先的先序遍历
// 函数式编程（副作用，纯函数）
// promise.then的第二个参数和catch



