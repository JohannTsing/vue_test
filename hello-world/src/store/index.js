import { createStore } from "vuex";
import moduleA from "./modules/moduleA";

export default createStore({
    modules: {
        moduleA
    },
})