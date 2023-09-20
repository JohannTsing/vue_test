// 1, let 命令
// let 声明的变量只在 let 命令所在的代码块内有效，var 是在全局范围内有效

// 1.1),let 是在代码块内有效，var 是在全局范围内有效
{
    let a = 0;
    var b = 10;
    console.log('a:'+a);
}
console.log('b:'+b);
//cleaconsole.log(a); //ReferenceError: a is not defined

// 1.2),let 只能声明一次 var 可以声明多次
{
    let c = 10;
    //let c = 12;//SyntaxError: Identifier 'c' has already been declared
    var d = 20;
    var d = 22;
}

// 1.3),for 循环计数器很适合用 let
{
    for (var i = 0; i < 10; i++) {
        //setTimeout() 是属于 window 的方法，该方法用于在指定的毫秒数后调用函数或计算表达式。
        setTimeout(() => {
            console.log(i)
        },1000);
    }//输出结果 ： 10 10 10 10 10 10 10 10 10 10
    // 变量 i 是用 var 声明的，在全局范围内有效，所以全局中只有一个变量 i, 每次循环时，setTimeout 定时器里面的 i 指的是全局变量 i ，
    // 而循环里的十个 setTimeout 是在循环结束后才执行，所以此时的 i 都是 10。

    for (let j = 0; j < 10; j++) {
        setTimeout(() => {
            console.log(j)
        },1000);
    }//输出结果： 0 1 2 3 4 5 6 7 8 9
    // 变量 j 是用 let 声明的，当前的 j 只在本轮循环中有效，每次循环的 j 其实都是一个新的变量，
    // 所以 setTimeout 定时器里面的 j 其实是不同的变量，即最后输出 12345。
    //（若每次循环的变量 j 都是重新声明的，如何知道前一个循环的值？这是因为 JavaScript 引擎内部会记住前一个循环的值）。
}

// 1.4),let 变量不存在变量提升
/** 
 * JavaScript 声明提升
 * 
 * a. JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
 * JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
 * 
 *      x = 5; // 变量 x 设置为 5
 *      elem = document.getElementById("demo"); // 查找元素
 *      elem.innerHTML = x;                     // 在元素中显示 x
 *      var x; // 声明 x
 * 声明提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。
 * 
 * b. JavaScript 初始化不会提升
 * JavaScript 只有声明的变量会提升，初始化的不会。
 */
{
    let e;
    e = 12;//Cannot access 'e' before initialization
    //let e;

    f = 13;
    var f;

    console.log('e:'+e);
    console.log('f:'+f);
}

// 2,const 命令
// const 声明一个只读变量，声明之后不允许改变。意味着，一旦声明必须初始化，否则会报错。
{
    const PI = "3.1415926";
    console.log('PI:'+PI)  // 3.1415926
    //const MY_AGE;  // SyntaxError: Missing initializer in const declaration    
}
/** 
 * 注意： 
 * const 如何做到变量在声明初始化之后不允许改变的？其实 const 其实保证的不是变量的值不变，
 * 而是保证变量指向的内存地址所保存的数据不允许改动。
 * 
 * 对于简单类型（数值 number、字符串 string 、布尔值 boolean）,值就保存在变量指向的那个内存地址，
 * 因此 const 声明的简单类型变量等同于常量。
 * 
 * 而复杂类型（对象 object，数组 array，函数 function），变量指向的内存地址其实是保存了一个指向实际数据的指针，
 * 所以 const 只能保证指针是固定的，至于指针指向的数据结构变不变就无法控制了。
 */



//3，解构赋值
//解构赋值是对赋值运算符的扩展。
//他是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。
// 给人的感觉就像是智能匹配一样

//在解构中，有下面两部分参与：
//  * 解构的源，解构赋值表达式的右边部分。
//  * 解构的目标，解构赋值表达式的左边部分。

// 3.1),数组模型的解构（Array）
//基本
{
    let [a, b, c] = [1, 2, 3];
    // a = 1
    // b = 2
    // c = 3
}
//可嵌套
{
    let [a, [[b], c]] = [1, [[2], 3]];
    // a = 1
    // b = 2
    // c = 3
}
//可忽略
{
    let [a, , b] = [1, 2, 3];
    // a = 1
    // b = 3 
}
//不完全解构
{
    let [a = 1, b] = []; // a = 1, b = undefined
}
//剩余运算符
{
    let [a, ...b] = [1, 2, 3];
    //a = 1
    //b = [2, 3]
}
//字符串等
//在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。可遍历对象即实现 Iterator 接口的数据。
{
    let [a, b, c, d, e] = 'hello';
    // a = 'h'
    // b = 'e'
    // c = 'l'
    // d = 'l'
    // e = 'o'
}
//解构默认值
{
    let [a = 2] = [undefined]; // a = 2
    //当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。
    //let [a = 3, b = a] = [];     // a = 3, b = 3
    //let [a = 3, b = a] = [1];    // a = 1, b = 1
    //let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
}

// 3.2),对象模型的解构（Object）
//基本
{
    let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
    // foo = 'aaa'
    // bar = 'bbb'
 
    //let { baz : foo } = { baz : 'ddd' };
    // foo = 'ddd'
}
//可嵌套可忽略
{
    let obj = {p: ['hello', {y: 'world'}] };
    let {p: [x, { y }] } = obj;
    // x = 'hello'
    // y = 'world'
    
    //let obj = {p: ['hello', {y: 'world'}] };
    //let {p: [x, {  }] } = obj;
    // x = 'hello'
}
//不完全解构
{
    let obj = {p: [{y: 'world'}] };
    let {p: [{ y }, x ] } = obj;
    // x = undefined
    // y = 'world' 
}
//剩余运算符
{
    let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
    // a = 10
    // b = 20
    // rest = {c: 30, d: 40}
}
//解构默认值
{
    let {a = 10, b = 5} = {a: 3};
    // a = 3; b = 5;
    let {a: aa = 10, b: bb = 5} = {a: 3};
    // aa = 3; bb = 5;
}




