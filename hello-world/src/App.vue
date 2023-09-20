<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" counter=1949 /> -->
  <h1>Hello App!</h1>
  <div class="app_nav">
    <HelloTopNav />
    <hello-left-nav />
  </div>
  <router-view class="us__content"></router-view>
</template>

<script>
// 引入一个子组件
//import HelloWorld from "./components/HelloWorld.vue";
import HelloTopNav from "./views/nav/HelloTopNav.vue";
import HelloLeftNav from "./views/nav/HelloLeftNav.vue";
export default {
  // 导出一个根组件，在 main.js 中使用
  name: "App",
  // 注册子组件
  components: {
    //HelloWorld,
    HelloTopNav,
    HelloLeftNav,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.router-link-active {
  color: orange;
}

.router-link-exact-active {
  color: crimson;
}

h1 {
  grid-area: header;
}

.us {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "header header"
    "nav content"
    "nav helper";
}

.us__nav {
  grid-area: nav;
  border: 1px dotted;
  margin-right: 0.75rem;
  padding: 0.3rem;
}

.us__content {
  grid-area: content;
}

.us__content--helper {
  grid-area: helper;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

li:not(:last-of-type) {
  margin-right: 1rem;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

li:not(:last-of-type) {
  margin-right: 1rem;
}
</style>
