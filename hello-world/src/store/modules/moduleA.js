import apiFunction from "../../api/apiFunction";
import { INCREAMENT_MUTATION } from "../mutation-types";

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  count: 0,
  name: "Johann",
  plusNum: 10,
  todos: [
    { id: 1, text: "吃饭", done: true },
    { id: 2, text: "睡觉", done: false },
    { id: 3, text: "打豆豆", done: true },
  ],
});

// getters
const getters = {
  //Getter 接受 state 作为其第一个参数
  doneTodos: (state) => {
    return state.todos.filter((todo) => todo.done);
  },

  //Getter 也可以接受其他 getter 作为第二个参数
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length;
  },

  //你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
  getTodoById: (state) => (id) => {
    return state.todos.find((todo) => todo.id === id);
  },
};

// mutations
const mutations = {
  increment(state) {
    state.count++;
  },
  //mutation允许传入额外的参数,即mutation 的载荷（payload）
  increment2(state, m) {
    state.count += parseInt(m);
  },
  //在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
  increment3(state, payload) {
    state.count += payload.amount;
  },

  //使用常量替代 Mutation 事件类型
  [INCREAMENT_MUTATION](state, payload) {
    state.count += payload.amount;
  },

  //Mutation 必须是同步函数。如果存在mutation中存在异步函数，devtools 将无法准确追踪状态的改变
  increamentAsync(state, payload) {
    setTimeout(() => {
      state.count += 10;
    }, 2000);
    state.count += payload.amount;
  },
};

// actions
const actions = {
  increment(context) {
    //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，
    //或者通过 context.state 和 context.getters 来获取 state 和 getters。
    context.commit("increment");
  },
  //实践中，我们会经常用到 ES2015 的参数解构来简化代码（特别是我们需要调用 commit 很多次的时候）
  increment2({ commit }, m) {
    commit("increment2", m);
  },
  //乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？
  //实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作
  incrementAsync({ commit }, payload) {
    setTimeout(() => {
      commit(INCREAMENT_MUTATION, payload);
    }, 1000);
  },

  // action 可以返回一个 Promise
  async actionA({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          commit(INCREAMENT_MUTATION, payload);
          resolve("成功");
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  },

  // action 可以调用其他 action
  actionB({ dispatch, commit }, payload) {
    return dispatch("actionA", payload).then(() => {
      commit("increment");
    });
  },

  // action 可以与 async / await 组合使用
  async actionC({ dispatch, commit }, payload) {
    await dispatch("actionA", payload); // 等待 actionA 完成
    commit("increment2", await apiFunction.getData(payload.amount));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  //   modules: {
  //     nested
  //   }
};
