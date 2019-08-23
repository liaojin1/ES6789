// 1.es6
function test(arr) {
    return Array.from(new Set(arr));
}

[...new Set(arr)];
// 2.es5 for循环去重
function test(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i+1; j < arr.length; j++) {
            if (arr[i] == arr[j]){
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}
// 3.indexof
function test(arr) {
    var newArr = [];
    for(let i = 0; i < arr.length; i++) {
        if(newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
// 4.sort
function test (arr) {
    arr = arr.sort();
    var newArr = [arr[0]];
    for(let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}