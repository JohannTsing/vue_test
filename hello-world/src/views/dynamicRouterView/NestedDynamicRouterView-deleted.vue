<template>
  <div>
    <h2>添加动态路由——嵌套路由</h2>
    <h2>访问 Store 中的数据</h2>
    <!-- <span>{{$store.state.count}}</span> -->
    <span>{{ count }} -- {{ name }}</span>
    <br />
    <span>myName : {{ myName }}</span>
    <br />
    <span>myName2 : {{ myName2 }}</span>
    <br />
    <span>countAlias : {{ countAlias }}</span>
    <br />
    <span>countPlusLocalState : {{ countPlusLocalState }}</span>
    <br />
    <button @click="countPlus">countPlus</button>
    <button @click="countPlus2">countPlus2</button>
    <button @click="countPlus3">countPlus3</button>
    <button @click="countPlus4">countPlus4</button>
    <button @click="countPlus5">countPlus5</button>
    <button @click="countPlus6">countPlus6</button>
    <br />
    <button @click="countPlusAsync">countPlusAsync</button>
    <hr />
    <h2>actions 使用</h2>
    <span>{{ count }}</span>
    <br />
    <button @click="countPlusAction">countPlusAction</button>
    <button @click="countPlusAction2">countPlusAction2</button>
    <button @click="countPlusActionAsync">countPlusActionAsync</button>
    <br />
    <button @click="actionA">actionA</button>
    <button @click="actionB">actionB</button>
    <button @click="actionC">actionC</button>
    <hr />
    <h2>访问 Getters 中的数据</h2>
    <span
      >doneTodosCount : {{ doneTodosCount }} -- {{ doneTodosCountAlias }}</span
    >
    <br />
    <span>{{ doneTodos }}</span>
    <br />
    <span>{{ getTodoById }}</span>
  </div>
</template>
<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from "vuex";
//mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
import { mapGetters } from "vuex";
import { INCREAMENT_MUTATION } from "@/store/mutation-types";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  methods: {
    /** ============= mutations ============= */
    countPlus() {
      this.$store.commit("increment");
      //console.log(this.$store.state.count);
    },
    countPlus2() {
      this.$store.commit("increment2", 10);
    },
    countPlus3() {
      this.$store.commit("increment3", { amount: 15 });
    },
    //提交 mutation 的另一种方式是直接使用包含 type 属性的对象
    countPlus4() {
      this.$store.commit({
        type: "increment3",
        amount: 18,
      });
    },
    //使用常量替代 Mutation 事件类型
    countPlus5() {
      this.$store.commit({
        type: INCREAMENT_MUTATION,
        amount: 20,
      });
    },
    //mutation中包含异步操作
    //Mutation 必须是同步函数。如果存在mutation中存在异步函数，devtools 将无法准确追踪状态的改变
    countPlusAsync() {
      this.$store.commit({
        type: "increamentAsync",
        amount: 20,
      });
    },
    //你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
    ...mapMutations([
      "INCREAMENT_MUTATION", //将 `this.INCREAMENT_MUTATION()` 映射为 `this.$store.commit('INCREAMENT_MUTATION')`
    ]),
    //由于上一步已经将mutation映射到组件内，所以组件可以直接调用 INCREAMENT_MUTATION
    countPlus6() {
      this.INCREAMENT_MUTATION({ amount: 17 });
    },
    /** ============= mutations ============= */

    /** ============= actions ============= */
    countPlusAction() {
      this.$store.dispatch("increment");
    },
    // countPlusAction() {
    //     this.$store.dispatch("incrementAsync",{amount:5});
    // },
    // countPlusAction() {
    //     this.$store.dispatch({
    //         type: 'incrementAsync',
    //         amount: 5,
    //     });
    // },

    ...mapActions(["increment2", "incrementAsync"]),
    countPlusAction2() {
      this.increment2(5);
    },
    countPlusActionAsync() {
      this.incrementAsync({ amount: 5 });
    },

    actionA() {
      this.$store.dispatch("actionA", { amount: 5 }).then(function (result) {
        console.log("actionA Got value: " + result);
      });
    },
    actionB(){
        this.$store.dispatch("actionB",{amount:5})
    },
    actionC(){
        this.$store.dispatch("actionC",{amount:5})
    }

    /** ============= actions ============= */
  },

  //我们可以使用 mapState 辅助函数帮助我们生成计算属性
  //   computed: mapState({
  //     // count(){
  //     //     return this.$store.state.count
  //     // }

  //     // 箭头函数可使代码更简练
  //     count: (state) => state.count,
  //     // count(state){
  //     //     return state.count
  //     // },

  //     // 传字符串参数 'count' 等同于 `state => state.count`
  //     countAlias: "count",

  //     // 为了能够使用 `this` 获取局部状态，必须使用常规函数
  //     countPlusLocalState(state) {
  //       return state.count + this.count;
  //     },
  //   }),

  //当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
  //当组件需要有自己单独的计算属性时，此时可以使用 ... 操作符来合并之前的 mapState解析出来的全局属性
  /**
   * ES6语法，合并对象
   * let a = {x:1,y:2} let b = {z:3,...a}
   * b = {z: 3, x: 1, y: 2}
   */
  computed: {
    /** ========== mapState =========== */
    // 全局 state 属性
    ...mapState(["count", "name"]),

    //组件独有的计算属性
    myName: {
      get: () => "Jessie",
      // get(){
      //     return 'Jessie'
      // },
    },
    myName2: () => "Jessie2",
    // myName2(){
    //     return 'Jessie2'
    // }
    /** ========== mapState =========== */

    /** ========== mapGetters =========== */
    // 获取 getter 中的属性
    // doneTodos (){
    //     return this.$store.getters.doneTodos
    // },
    // doneTodosCount(){
    //     return this.$store.getters.doneTodosCount
    // },

    //getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
    getTodoById() {
      return this.$store.getters.getTodoById(2);
    },

    //和 mapState类似，当映射的计算属性的名称与 getters 的子节点名称相同时，我们也可以给 mapGetters 传一个字符串数组。
    //...mapGetters(['doneTodos','doneTodosCount'])

    //如果你想将一个 getter 属性另取一个名字，使用对象形式：
    ...mapGetters({
      doneTodos: "doneTodos",
      doneTodosCount: "doneTodosCount",
      doneTodosCountAlias: "doneTodosCount",
    }),
    /** ========== mapGetters =========== */
  },
};
</script>
