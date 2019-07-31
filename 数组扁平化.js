// 1.reduce方法
function flat (arr) {
    arr.reduce(function(pre, cur){
        return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
    }, []);
}

// 2.扩展运算符
var arr = [1, [2, 3], [4, [5, 6]]];
[].concat(...arr);

// 3.递归
function flat(arr) {
    var res = [];
    arr.map(item => {
        console.log(item);
        if (Array.isArray(item)) {
            res = res.concat(flat(item));
            console.log(res);
        } else {
            res.push(item);
        }
    });
    return res;
}
console.log(flat(arr));

// 调用数组的toString方法，将数组变为字符串然后再用split分割还原为数组
function flat(arr) {
    return arr.toString().split(',').map(item => {
        return Number(item);
    })
}