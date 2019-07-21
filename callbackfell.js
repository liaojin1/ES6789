// 控制流管理
step1(function(value1) {
    step2(value1, function(value2) {
        step3(value2, function(value3) {
            step4(value3, function(value4) {
                // Do something with value4
            })
        })
    })
})

// Promise改写
Promise.resolve(step1)
.then(step2)
.then(step3)
.then(step4)
.then(function(value4) {
    // Do something with value4
}, function(err) {

})
.done();

// Generator 函数改写
function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step2(value2);
        var value4 = yield step3(value3);
        var value5 = yield step4(value4);
        // Do somesthing with value5
    } catch (e) {
        // Handle any error from step1 through step4
    }
}
scheduler(longRunningTask(initialValue));
function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
        task.value = taskObj.value;
        scheduler(task);
    }
}
// 上边只适合同步操作，所有task都必须是同步的，不能有异步操作。
// 这里的代码一旦得到返回值就继续往下执行，没有判断异步操作何时完成


// 部署iterator接口
// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// 作为数据结构
