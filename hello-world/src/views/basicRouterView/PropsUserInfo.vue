<template>
  <div>
    <h1>这是Props用户页面</h1>
    <h2>Props用户 propsUserid : {{propsUserid}}</h2>
    <h2> propsUsername : {{propsUsername}}</h2>
    <hr />
    route {{ $route }}
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  // 请确保添加一个与路由参数完全相同的 prop 名
  props:['propsUserid','propsUsername'],

  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
    console.log(to);
    console.log(from);
    alert('组件内的守卫: beforeRouteEnter, 在渲染该组件的对应路由被验证前调用');
    if (to.meta.requiresAuth){
      alert('当前需要登录，你需要跳转到登录页面');
      //return { name: 'loginpage' }
    }
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
    console.log(to);
    console.log(from);
    alert('组件内的守卫: beforeRouteUpdate, 在当前路由改变，但是该组件被复用时调用');
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
    console.log(to);
    console.log(from);
    const answer = window.confirm('组件内的守卫: beforeRouteLeave \nDo you really want to leave? you have unsaved changes!');
    if (!answer) 
    return false;
  },


  // 要对同一个组件中参数的变化做出响应的话，你可以简单地 watch $route 对象上的任意属性
  mounted() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        console.log('toParams');
        console.log(toParams);
        console.log('previousParams');
        console.log(previousParams);
      }
    );
  },
  created() {
    
  },
};
</script>