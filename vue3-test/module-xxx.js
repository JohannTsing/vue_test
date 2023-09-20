//解构的方式导入
import { myName, myAge, myfn, myClass, xiaoming, obj} from "./module-test.js";
import { myName as myName1} from "./module-test1.js";

console.log(myfn());// My name is Tom! I'm 20 years old.
console.log(myAge);// 20
console.log(myName);// Tom
console.log(myClass.a );// yeah!

console.log(xiaoming);
console.log(myName1);

// 不允许在加载模块的脚本里面，改写接口的引用指向，即可以改写 import 变量类型为对象的属性值，
// 不能改写 import 变量类型为基本类型的值。
//myAge = 12;
//console.log(myAge);
obj.foo = 'Hello';
console.log(obj);

// 多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。
// import 同一模块，声明不同接口引用，会声明对应变量，但只执行一次 import 。
import { a } from "./module-test.js";
//import { a } from "./test.js";
// 相当于 import { a } "./test.js";
 
import { b } from "./module-test.js";;
import { c } from "./module-test.js";;
// 相当于 import { b, c } from "./test.js";

//静态执行特性：import 是静态执行，所以不能使用表达式和变量。
//import { "my" + "Name" } from "methods";
// error
//let module = "./test.js";
//import { foo } from module;
// error

//导入声明只能在模块的顶层使用。
// if (true) {
//   import { foo } from "method1";
// } else {
//   import { foo } from "method2";
// }
// error

//export default 向外暴露的成员，可以使用任意变量来接收。
import d from "./module-test.js";
console.log('d:'+d);