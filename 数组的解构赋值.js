// 1.交换变量的值
let x = 1;
let y = 3;
[x, y] = [y, x];
console.log(x); // 3

// 2.从函数中返回多个值
function foo() { // 返回一个数组
    return [1, 2, 3];
}
let [a, b, c] = foo();

function foo2() { // 返回一个对象
    return {
        foo1: 1,
        foo2: 2
    }
}
let {foo1, foo2} = foo2();

// 3.函数参数的定义
function foo([x, y, z]) {} //参数与变量名对应
foo([1, 2, 3]);

function foo({x, y, z}) {} //参数与变量名不用按序对应
foo({x:2, z:4, y:5});

// 4.提取JSON数据
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};
let {id, status, data:arr} = jsonData;
console.log(id, status, arr); // 42 'OK' [ 867, 5309 ]

// 5.函数参数的默认值
// 6.遍历map结构
// 7.输入模块的指定方法
