## 项目结构
1，浏览器支持 js、html、css，但是不支持 .vue 文件
因此，一定存在一个编译的过程，将 .vue 文件编译为 浏览器识别的文件。
在 public 文件中，有一个 index.html，其中存在一个id为 app 的 div。


2，```npm run build``` 将项目打包成一个浏览器识别的 package，此时在项目中生成一个 /dist 包
vs-code无法开启服务该包
需要通过 ```npm install serve -S -g```安装 serve
安装完成后，在项目路径下输入 ```serve dist``` 即可启动该项目
