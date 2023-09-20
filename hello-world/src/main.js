import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index.js";//如果是引入的文件是对应包下的 index.js 文件，则 ./router/index.js 可以省略为 ./router
import store from "./store/index";


createApp(App).use(router).use(store).mount("#app");
