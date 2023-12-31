//ES6 模块

//在 ES6 前， 实现模块化使用的是 RequireJS 或者 seaJS（分别是基于 AMD 规范的模块化库，  和基于 CMD 规范的模块化库）。
//ES6 引入了模块化，其设计思想是在编译时就能确定模块的依赖关系，以及输入和输出的变量。
//ES6 的模块化分为导出（export） @与导入（import）两个模块。

//特点
//ES6 的模块自动开启严格模式，不管你有没有在模块头部加上 use strict;。【模块使用严格模式】
//模块中可以导入和导出各种类型的变量，如函数，对象，字符串，数字，布尔值，类等。【模块支持导出，导入各种类型】
//每个模块都有自己的上下文，每一个模块内声明的变量都是局部变量，不会污染全局作用域。【模块作用域独立分离】
//每一个模块只加载一次（是单例的）， 若再去加载同目录下同文件，直接从内存中读取。【模块单例话】


// 1,基本用法
//模块导入导出各种类型的变量，如字符串，数值，函数，类。

//导出的函数声明与类声明必须要有名称（export default 命令另外考虑）。 
//不仅能导出声明还能导出引用（例如函数）。
//export 命令可以出现在模块的任何位置，但必需处于模块顶层。
//import 命令会提升到整个模块的头部，首先执行。导入声明只能在模块的顶层使用。

//建议使用大括号指定所要输出的一组变量写在文档尾部，明确导出的接口。
//函数与类都需要有对应的名称，导出文档尾部也避免了无对应名称。



// 2,as 的用法
// 2.1)
//export { myName as exportName }

//import { exportName } from "./test.js";
//console.log(exportName);// Tom
//使用 as 重新定义导出的接口名称，隐藏模块内部的变量

// 2.2)
//不同模块导出接口名称命名重复， 使用 as 重新定义变量名。
//import { myName as name1 } from "./test1.js";
//import { myName as name2 } from "./test2.js";



// 3,import 命令的特点
// 3.1),只读属性：
// 不允许在加载模块的脚本里面，改写接口的引用指向，即可以改写 import 变量类型为对象的属性值，不能改写 import 变量类型为基本类型的值。

// 3.2),单例模式：
// 多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。
// import 同一模块，声明不同接口引用，会声明对应变量，但只执行一次 import 。

// 3.3),静态执行特性：import 是静态执行，所以不能使用表达式和变量。



// 4,export default 命令
//在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
//export default 中的 default 是对应的导出接口变量。
//通过 export 方式导出，在导入时要加{ }，export default 则不需要。
//export default 向外暴露的成员，可以使用任意变量来接收。


