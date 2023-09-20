<template>
  <div>
    <h1>这是嵌套路由用户页面</h1>
    <h2>
      User 【username : {{ $route.params.username }}】 , 【userid :
      {{ $route.params.userid }}】 with 【postId : {{ $route.params.postId }}】
    </h2>
    <h2>
      组件传参，获取到的参数
      username:{{username}} --- postId{{postId}}

    </h2>
    <hr />
    <!-- route {{ $route }} -->
  </div>
  <div class="user">
    <li>
      <!-- 子页面绑定父页面的属性值 -->
      <!-- <router-link :to="
        '/nestView/nestedUsers/name/' +
        $route.params.username +
        '/posts/' +
        $route.params.postId
      ">usersNest</router-link> -->
      <router-link :to="
        '/nestView/nestedUsers/name/' +
        username +
        '/posts/' +
        postId
      ">usersNest</router-link>
    </li>
    <li>
      <router-link :to="
        '/nestView/nestedUsers/name/' +
        $route.params.username +
        '/posts/' +
        $route.params.postId +
        '/profile'
      ">UserInfo profile</router-link>
    </li>
    <!-- <li>
        <router-link :to="'/nestedUsers/name/'+$route.params.username+'/posts/'+$route.params.postId+'/desc'">UserInfo desc</router-link>
      </li> -->
    <li>
      <!-- <router-link :to="{
        name: 'userDescRouter',
        params: {
          username: $route.params.username,
          postId: $route.params.postId,
        },
      }">UserInfo desc【命名路由】</router-link> -->
      <router-link :to="{
        name: 'userDescRouter',
        params: {
          username: username,
          postId: postId,
        },
      }">UserInfo desc【命名路由】</router-link>
    </li>
    <router-view class="us__content"></router-view>
  </div>
</template>
<script>
export default {
  name: "UserInfoNested",
  props: ['username','postId'],

  // 要对同一个组件中参数的变化做出响应的话，你可以简单地 watch $route 对象上的任意属性
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
        console.log(toParams);
        console.log(previousParams);
      }
    );
  },
};
</script>
