<template>
  <div>
    <h1>这是用户页面</h1>
    <h2>User 【username : {{ $route.params.username }}】 , 【userid :
    {{ $route.params.userid }}】 with 【postId : {{ $route.params.postId }}】
    </h2>
    <h2>【query.userid : {{$route.query.userid}}】 【query.username : {{$route.query.username}}】</h2>
    <hr />
    route {{ $route }}
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  // 要对同一个组件中参数的变化做出响应的话，你可以简单地 watch $route 对象上的任意属性
  created() {
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
};
</script>