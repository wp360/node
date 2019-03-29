// 成功
// const p = Promise.resolve({id: 1});
// p.then(result => console.log(result));
// 失败 只要拒绝Promise，就使用原生Error对象
// const p = Promise.reject(new Error('reason for rejection...'));
// p.catch(error => console.log(error));

const p1 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        console.log('异步操作一');
        // resolve(1);
        reject(new Error('because something failed.'));
    },2000);
});

const p2 = new Promise((resolve)=>{
    setTimeout(() => {
        console.log('异步操作二');
        resolve(2);
    },2000);
});

// Pomise.all的使用
// Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。

Promise.all([p1,p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));

// Promise.race的使用
// 顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
