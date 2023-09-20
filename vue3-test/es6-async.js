// ES6 async 函数
// async 是 ES7 才有的与异步操作有关的关键字，和 Promise ， Generator 有很大关联的。

/** 
 * 语法：
 * async function name([param[, param[, ... param]]]) { statements }
 * 
 *  name: 函数名称。
 *  param: 要传递给函数的参数的名称。
 *  statements: 函数体语句。
 */

// async 函数返回值
// async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
// async function helloAsync(){
//     return "helloAsync";
//   }
  
// console.log(helloAsync())  // Promise {<resolved>: "helloAsync"}
 
// helloAsync().then(v=>{
//    console.log(v);         // helloAsync
// })

// async 函数中可能会有 await 表达式，async 函数执行时，如果遇到 await 就会先暂停执行 ，等到触发的异步操作完成后，恢复 async 函数的执行并返回解析值。
// await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误。
// let testAwait = function(){
//     return new Promise((resolve) => {
//         setTimeout(function(){
//            console.log("testAwait");
//            resolve();
//         }, 1000);
//     });
//  }
  
//  async function helloAsync(){
//     // 没有await，就是异步执行的
//     await testAwait();
//     //testAwait();
//     console.log("helloAsync");
//   }
//  helloAsync();
//  // testAwait
//  // helloAsync



 // await 操作符
 // await 操作符用于等待一个 Promise 对象或者任何要等待的值, 它只能在异步函数 async function 内部使用。
 // 语法：[return_value] = await expression;

// await 操作符返回值
//  返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。
//  如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果。

// async function testAwait (x) {
//     return x;
// }

function testAwait (x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

function testxxx(x){
    return x;
}

async function helloAsync() {
    // 正常情况下，await 命令后面是一个 Promise 对象，它也可以跟其他值，如字符串，布尔值，数值以及普通函数。
    // await针对所跟不同表达式的处理方式：
    //   Promise 对象：await 会暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行并返回解析值。
    //   非 Promise 对象：直接返回对应的值。
    var x = await testAwait ("hello world");
    var y = await testxxx("china");
    var z = await "中国";
    console.log(x); 
    console.log(y);
    console.log(z);
}
helloAsync ();
console.log('我在后面，但是我先执行！');
// hello world



/***   test case 1 **/
// async function a(){   
//     console.log("1")  
//     console.log("2")
// }
// a()
// console.log("3")
// // 1 2 3

async function a(){  
    await 1  
    console.log("1")  
    console.log("2")
}
a()
console.log("3")
// 3 1 2
/***   test case 1 **/