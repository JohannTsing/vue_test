import { createStore } from "vuex";
import { INCREAMENT_MUTATION } from "./mutation-types";

// 创建一个新的 store 实例
const store = createStore({
  // 相当于一个 data，只不过它是全局的，所有的组件都可以访问
  state() {
    return {
      count: 0,
      name: 'Johann',
      todos: [
        { id: 1, text: "吃饭", done: true },
        { id: 2, text: "睡觉", done: false },
        { id: 3, text: "打豆豆", done: true },
      ],
      actionNum: 0,
      actionName:'Jessie',
    };
  },

  //有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数。
  //如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。
  //Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）
  getters: {
    //Getter 接受 state 作为其第一个参数
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done);
    },

    //Getter 也可以接受其他 getter 作为第二个参数
    doneTodosCount(state, getters) {
      return getters.doneTodos.length;
    },

    //你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
    getTodoById: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id);
    },
  },

  // state中的共享属性，不是不可以在某个组件中进行修改，但是这样的话，不利于之后的逻辑追踪。
  // 将state共享属性的变更方法，单独剥离出来，之后组件需要对state进行修改时，通过 this.$store.commit('increment') 方法触发状态变更
  // 这样有利于明确追踪，共享属性（state状态）的变化
  mutations: {
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
  },


  /** 
   * Action 类似于 mutation，不同在于：
   *   * Action 提交的是 mutation，而不是直接变更状态。
   *   * Action 可以包含任意异步操作。   
   */
  actions: {
    increment (context) {
      //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，
      //或者通过 context.state 和 context.getters 来获取 state 和 getters。
      context.commit('increment')
    },
    //实践中，我们会经常用到 ES2015 的参数解构来简化代码（特别是我们需要调用 commit 很多次的时候）
    increment2 ({ commit },m) {
      commit('increment2',m)
    },
    //乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？
    //实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作
    incrementAsync ({ commit },payload) {
      setTimeout(() => {
        commit(INCREAMENT_MUTATION,payload)
      }, 1000)
    },

    // action 可以返回一个 Promise
    async actionA({commit},payload) {
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          try {
            commit(INCREAMENT_MUTATION,payload);
            resolve('成功');
          } catch (error) {
            reject(error);
          }
        }, 2000);
      })
    },

    // action 可以调用其他 action
    actionB({dispatch,commit},payload){
      return dispatch('actionA',payload).then(()=>{
        commit('increment');
      })
    },

    // action 可以与 async / await 组合使用
    async actionC({dispatch,commit},payload){
      await dispatch('actionA',payload); // 等待 actionA 完成
      commit('increment2', await getData(8));
    }

  }


});

function getData (x) {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('getData (x) : '+x);
          resolve(x);
      }, 2000);
  });
}

export default store;
