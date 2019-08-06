function arrSlice (arr) {
    return arr
      .sort(() => Math.random() > .5) // 打乱
      .map((e, i) => i % 2 ? null : [arr[i], arr[i + 1]]) // 两两取出
      .filter(Boolean)
  }

var arr = [1,2,3,4,5,6,7,8,9,10];
function sortArr(arr) {
    for (var i = arr.length-1; i >=0; i--) {
        var idx = Math.floor(Math.random()*(i+1));
        var temp = arr[idx]; 
        arr[idx] = arr[i]; 
        arr[i] = temp;
    }
    let newarr = arr;
    var arr2=[];
    for(var i=0;i<newarr.length;i+=2){
        arr2.push(newarr.slice(i,i+2));
    }
    return arr2;
} 

console.log(sortArr(arr));