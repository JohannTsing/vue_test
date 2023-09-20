//ES6 Promise 对象
// 是异步编程的一种解决方案。
// 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

/***** code block 1 *****/
// const fn = function(param){
//     console.log(param);
// }

// const fn1 = function(params) {
//     setTimeout(()=>{console.log(params);},1000);
// }
// const fn11 = function(params) {
//     setTimeout(fn,1000,params);
// }

// fn1('河北省');
// fn1('河北省邯郸市');
// fn1('河北省邯郸市永年区');
// fn11('河北省');
// fn11('河北省邯郸市');
// fn11('河北省邯郸市永年区');

//回调地狱
// const fn2 = function(){
//     setTimeout(
//         ()=>{
//             console.log('河北省');
//             setTimeout(
//                 ()=>{
//                     console.log('河北省邯郸市');
//                     setTimeout(
//                         ()=>{
//                             console.log('河北省邯郸市永年区');
//                         }
//                     ,1000);
//                 }
//             ,1000);
//         }
//     ,1000);
// }
// fn2();
/***** code block 1 *****/



/***** code block 2 *****/
// const p1 = new Promise(function(resolve,reject){
//     resolve('success1');
//     resolve('success2');
// }); 
// const p2 = new Promise(function(resolve,reject){  
//     resolve('success3'); 
//     reject('reject');
// });
// p1.then(function(value){  
//     console.log(value); // success1
// });
// p2.then(function(value){ 
//     console.log(value); // success3
// });
/***** code block 2 *****/


/***** code block 3 *****/
function multiply(input) {
    return new Promise((resolve, reject) => {
        console.log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 1000, input * input);
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise((resolve, reject) => {
        console.log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 1000, input + input);
    });
}

var p = new Promise((resolve, reject) => {
    console.log('start new Promise...');
    resolve(12);
});
// then 方法接收两个函数作为参数: 
// 第一个参数是 Promise 执行成功时的回调，第二个参数是 Promise 执行失败时的回调，两个函数只会有一个被调用。
p.then(multiply,null)
 .then(add,null)
 .then(multiply,null)
 .then(add,null)
 .then(
    function (result) {
    console.log('Got value: ' + result);
    },
null)
// 大多数浏览器中不能终止的 Promise 链里的 rejection，建议后面都跟上 .catch(error => console.log(error));
.catch(
    (err) => console.log('reject:', err)
);
console.log('jest do it');
/***** code block 3 *****/


/***** code block 4 *****/
// var p = new Promise((resolve, reject) => {
//     if (true) {
//         resolve('成功');
//     }else {
//         reject('失败');
//     };
// })
// p.then(
//     (val) => console.log('resolve:', val)
// ).catch(
//     (err) => console.log('reject:', err)
// );
/***** code block 4 *****/





