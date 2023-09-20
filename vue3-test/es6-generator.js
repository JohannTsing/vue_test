//ES6 Generator 函数
// ES6 新引入了 Generator 函数，可以通过 yield 关键字，把函数的执行流挂起，为改变执行流程提供了可能，从而为异步编程提供解决方案。

/** 
 * Generator 函数组成
Generator 有两个区分于普通函数的部分：
    1,是在 function 后面，函数名之前有个 * ；
    2,函数内部有 yield 表达式。
 */
function* sendParameter(){
    console.log("start");
    var x = yield '2';

    console.log("one:" + x);
    var y = yield '3';

    console.log("two:" + y);
    console.log("total:" + (x + y));
    return x+y;
}
/**
 * 执行机制：
 *   调用 Generator 函数和调用普通函数一样，在函数名后面加上()即可，但是 Generator 函数不会像普通函数一样立即执行，而是返回一个指向内部状态对象的指针，
 *   所以要调用遍历器对象Iterator 的 next 方法，指针就会从函数头部或者上一次停下来的地方开始执行。
 * 
 *   每次 调用next()，从函数头部或者上一次停下来的地方开始执行，执行到 yield 就停下来。并将 yield 后边表达式的值（'2'，'3'），作为返回对象的 value 属性值  
 */

// 1,next() 方法
// let nextReturn;
// //next不传参
// //一般情况下，next 方法不传入参数的时候，yield 表达式的返回值是 undefined
// var sendp1 = sendParameter();
// nextReturn = sendp1.next();
// console.log(nextReturn);
// // start
// // {value: "2", done: false}
// nextReturn = sendp1.next();
// console.log(nextReturn);
// // one:undefined
// // {value: "3", done: false}
// nextReturn = sendp1.next();
// console.log(nextReturn);
// // two:undefined
// // total:NaN
// // {value: undefined, done: true}
// console.log('=================');

// //next传参
// //当 next 传入参数的时候，该参数会作为上一步 yield的返回值。
// var sendp2 = sendParameter();
// nextReturn = sendp2.next(10);// next方法传入的参数 10，作为函数头部的返回值。
// console.log(nextReturn);
// // start
// // {value: "2", done: false}
// nextReturn = sendp2.next(20); //next方法传入的参数 20，第一个 yield的返回值。
// console.log(nextReturn);
// // one:20
// // {value: "3", done: false}
// nextReturn = sendp2.next(30);//next方法传入的参数 30，第二个 yield的返回值。
// console.log(nextReturn);
// // two:30
// // total:50
// // {value: 50, done: true}
// console.log('=================');

// //next传参
// //当 next 传入参数的时候，该参数会作为上一步 yield的返回值。
// var sendp3 = sendParameter();
// nextReturn = sendp3.next();// next方法传入的参数 10，作为函数头部的返回值。
// console.log(nextReturn);
// // start
// // {value: "2", done: false}
// nextReturn = sendp3.next(nextReturn.value*1); //next方法传入的参数 20，第一个 yield的返回值。
// console.log(nextReturn);
// // one:20
// // {value: "3", done: false}
// nextReturn = sendp3.next(parseInt(nextReturn.value));//next方法传入的参数 30，第二个 yield的返回值。
// console.log(nextReturn);
// // two:30
// // total:50
// // {value: 50, done: true}


// 2,return() 方法
//   return 方法，结束遍历 Generator 函数。
//   return 方法提供参数时，返回该参数；不提供参数时，返回 undefined 。
function* foo(){
    yield 1;
    yield 2;
    yield 3;
}
// let let_foo = foo();
// console.log(let_foo.next());
// //console.log(let_foo.next());
// //console.log(let_foo.next());
// //console.log(let_foo.return('foo'));
// console.log(let_foo.return());
// console.log(let_foo.next());


// 3,throw() 方法
//   throw 方法可以在 Generator 函数体外面抛出异常，在函数体内部捕获。
var g = function* () {
    try {
        yield '1';
    } catch (e) {
        console.log('catch inner', e);
    }
};
   
// var i = g();
// i.next();
   
// try {
//     i.throw('a');
//     i.throw('b');
// } catch (e) {
//     console.log('catch outside', e);
// }
// catch inner a
// catch outside b
// 遍历器对象抛出了两个错误，第一个被 Generator 函数内部捕获，
// 第二个因为函数体内部的catch 函数已经执行过了，不会再捕获这个错误，所以这个错误就抛出 Generator 函数体，被函数体外的 catch 捕获。


// 4,yield* 表达式
//   yield* 表达式表示 yield 返回一个遍历器对象，用于在 Generator 函数内部，调用另一个 Generator 函数。
function* callee() {
    console.log('callee: ' + (yield));
}
function* caller() {
    while (true) {
        yield* callee();
    }
}
// 等同于
// function* caller() {
//     while (true) {
//         for (var value of callee) {
//           yield value;
//         }
//     }
// }

const callerObj = caller();
console.log(callerObj.next());
// {value: undefined, done: false}
console.log(callerObj.next("a"));
// callee: a
// {value: undefined, done: false}
console.log(callerObj.next("b"));
// callee: b
// {value: undefined, done: false}



// 实现 Iterator
// 为不具备 Iterator 接口的对象提供遍历方法。
function* objectEntries(obj) {
    const propKeys = Reflect.ownKeys(obj);
    for (const propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
const jane = { first: 'Jane', last: 'Doe' };

// for (const [key,value] of objectEntries(jane)) {
//     console.log(`${key}: ${value}`);
// }

let iterat = objectEntries(jane);
let next = iterat.next();
console.log(next);
jiegou(next.value);
console.log(iterat.next());
jiegou(next.value);

function jiegou(obj){
    let [key,value] = obj;
    console.log('k-v: '+key+'-'+value);
}