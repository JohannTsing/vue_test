<template>
  <div>
    <h2>添加动态路由——嵌套路由</h2>
    <h2>访问 Getters 中的数据</h2>
    <span>doneTodosCount : {{ doneTodosCount }} -- {{ doneTodosCountAlias }}</span>
    <br />
    <br />
    <span>{{ doneTodos }}</span>
    <br />
    <span>{{ getTodoById }}</span>

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
    <button @click="increment">countPlus</button>
    <button @click="increment2(5)">countPlus2</button>
    <button @click="increment3({amount:10})">countPlus3</button>
    <button @click="INCREAMENT_MUTATION({ amount: 17 })">countPlus6</button>
    <br />
    <button @click="increamentAsync({amount: 25})">countPlusAsync</button>

    <hr />
    <h2>actions 使用</h2>
    <span>{{ count }}</span>
    <br />
    <button @click="plusAction1">countPlusAction</button>
    <button @click="plusAction2(100)">countPlusAction2</button>
    <button @click="plusActionAsync({amount: 1000})">countPlusActionAsync</button>
    <br />
    <button @click="actionAA">actionAA</button>
    <button @click="actionB({amount:10})">actionB</button>
    <button @click="actionC({amount:100})">actionC</button>
    <br />
    <a href="https://vuex.vuejs.org/zh/guide/modules.html">Vuex 模块化</a>
  </div>  
</template>
<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
//mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
import { mapState,mapGetters,mapMutations,mapActions } from "vuex";
import { INCREAMENT_MUTATION } from "@/store/mutation-types";

export default {

  computed: {
    /** ========== mapState =========== */
    // ...mapState({
    //   count: state => state.moduleA.count,
    //   name: state => state.moduleA.name,
    // }),
    ...mapState('moduleA',{
      count: state => state.count,
      name: state => state.name,
      plusNum: state => state.plusNum,
      countAlias: 'name',
      countPlusLocalState: state => state.count+1,
    }),
    //组件独有的计算属性
    myName: {
      get: () => "Jessie",
    },
    myName2: () => "Jessie2",
    /** ========== mapState =========== */

    /** ========== mapGetters =========== */
    ...mapGetters({
      doneTodos: "moduleA/doneTodos",
      doneTodosCount: "moduleA/doneTodosCount",
      doneTodosCountAlias: "moduleA/doneTodosCount",
      //getTodoById: () => this.$store.getters.moduleA.getTodoById(2)
    }),
    /** ========== mapGetters =========== */
  },
  
  methods: {
    /** ============= mutations ============= */
    ...mapMutations('moduleA',{
      INCREAMENT_MUTATION,
      increment: 'increment',
      increment2: 'increment2',
      increment3: 'increment3',
      increamentAsync: 'increamentAsync',
  }),
    // countPlus6() {
    //   this.INCREAMENT_MUTATION({ amount: 17 });
    // },
    // countPlus() {
    //   this.increment();
    // },
    // countPlus2() {
    //   this.increment2(15);
    // },
    // countPlus3() {
    //   this.increment3({amount:20});
    // },
    // countPlusAsync() {
    //   this.increamentAsync({amount: 25});
    // },
    /** ============= mutations ============= */

    /** ============= actions ============= */
    ...mapActions('moduleA',{
      plusAction: 'increment',
      plusAction2: 'increment2',
      plusActionAsync: 'incrementAsync',
    }),
    plusAction1() {
      this.$store.dispatch('moduleA/increment')
    },
    // countPlusAction(){
    //   this.plusAction();
    // },
    // countPlusAction2(){
    //   this.plusAction2(5);
    // },
    // countPlusActionAsync(){
    //   this.plusActionAsync({amount:10});
    // }
    ...mapActions('moduleA',[
      'actionA',
      'actionB',
      'actionC',
    ]),
    actionAA(){
      this.actionA({ amount: 5 }).then(function (result) {
        console.log("actionA Got value: " + result);
      });
    }
    /** ============= actions ============= */
  },

  
};
</script>

