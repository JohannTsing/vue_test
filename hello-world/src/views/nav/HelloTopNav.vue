<template>
  <div class="us__nav">
    <h5>顶栏Nav</h5>
    <li>
      <router-link to="/" replace>home【重定向】</router-link>
    </li>
    <li>
      <router-link to="/aboutRedirect" replace>about【重定向】</router-link> 
    </li>
    <li>
      <router-link to="/aboutAlias" replace>about【别名】</router-link>
    </li>
    <li>
      <router-link :to="{name : 'aboutpage',query:{id:12}}" replace>about【路由独享的守卫】</router-link>
    </li>
  </div>
</template>
