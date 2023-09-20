let myName = "Tom";
let myAge = 20;
let myfn = function(){
    return "My name is" + myName + "! I'm '" + myAge + "years old."
}
let myClass =  class myClass {
    static a = "yeah!";
}

let aliasName = "aliasName_Tomas";

let obj = {foo:'你好'};

let a = 'a';
let b = 'b';
let c = 'c';

let defaults = 'defaults';

//解构的方式导出
export { myName, myAge, myfn, myClass, aliasName as xiaoming, obj, a, b, c};
//在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
//通过 export 方式导出，在导入时要加{ }，export default 则不需要。
export default defaults;
//default 已经是对应的导出变量，不能跟着变量声明语句
//export default var ds = 'dd_defaults';