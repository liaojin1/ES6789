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
    resolve(3);
    console.log(2);
    reject(1);
}).then(res=> {
    console.log('a', res);
    return new Promise((resolve, reject)=> {
        reject(4);
    })
}).then(res => {
    console.log('b', res);
}).then(res => {
    console.log('c', res);
}).catch(err => console.log('err'+err));
//2
// a 3
// err4