function FindNumbersWithSum(array, sum)
{
    // write code here
    var result = [];
    for(var i = 0; i < array.length/2; i++) {
        var temp = sum - array[i];
        var res = [];
        if (array.indexOf(temp) != -1) {
            res.push(array[i]);
            res.push(temp);
            result.push(res);
        }
    }
    console.log(result);
    var arr = [];
    for(var j = 0; j < result.length; j++) {
        arr.push(result[j][0]*result[j][1]);
    }
    console.log(arr);
    var idx = Math.min(...arr);
    console.log(idx);
    return result[idx];
}
console.log(FindNumbersWithSum([1,2,2,3,4,5,6], 5));