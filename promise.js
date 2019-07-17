new Promise((resolve, reject) => {
    resolve('one');
}).then(res => console.log(res+' res'))
.catch(err => console.log('err:'+err));
// one res

new Promise((resolve, reject) => {
    reject('two')
}).then(res => console.log(res+' res'))
.catch(err => console.log('err:'+err))
//err two

new Promise((resolve, reject) => {
    resolve('three')
}).then(
    new Promise((resolve, reject) => {
        return resolve('three then resolve')
    })
).then(res => console.log(res+ ' res'))
.catch(err => console.log('err:'+err))
//three res

new Promise((resolve, reject) => {
    new Promise((resolve, reject) => {
        resolve('four inner')
    })
    resolve('four outer')
}).then(res => console.log(res+" res"))
.catch(err => console.log('err:'+ err))
// four outer res

new Promise((resolve, reject) => {
    var pro = new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('settimeout')
        }, 1000)
    })
    resolve(pro)
}).then(res => console.log(res+' res'))
.catch(err => console.log('err:' + err))

new Promise((resolve, reject) => {
    resolve('five');
    reject('five reject');
    console.log('123');
}).then(
    res => {
        console.log(res);
        return new Promise((resolve, reject) => {
            resolve('five then')
        })
    }
).then(res => console.log(res)
).catch(err => console.log(err));

new Promise((resolve, reject) => {
    console.log(1);
    resolve('A');
}).then(res=> {
    return new Promise((resolve, reject)=> {
    console.log(2);
    resolve('B');
    })
}).then(res => {
    return new Promise((resolve, reject)=> {
    console.log(3);
    resolve('C');
    })
}).catch(err => console.log('err'+err));
//2
// a 3
// err4

new Promise((resolve, reject) => {
    resolve();
}).then(res => {
    console.log(1);
}).catch(err => {
    console.log(err);
}).finally(() => {
    console.log('最后一定会执行的语句ES2018');
});

// 同步函数同步执行，异步函数异步执行
const func = () => {console.log('同步函数func')}
(async () => func())();//如果func函数式同步函数，那么得到同步结果，如果是异步函数，那么就可以用then指定下一步，就像下面的写法。
console.log('同步函数');

(async () => func())()//async() => func()  async函数会吃掉func的错误，如果想捕获错误那么需要使用promise.catch方法
.then();

(async () => f())()
.then()
.catch()