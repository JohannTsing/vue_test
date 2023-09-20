<template>
    <div>
        <h1>这是基本动态路由页面</h1>
    </div>
    <div>
        <li>
            <router-link to="/basicRouterView/users/propsUserid/johann_propsUserid">/users/propsUserid/johann_propsUserid【组件传参】</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/propsUserid/jessie_propsUserid">/users/propsUserid/jessie_propsUserid【组件传参,路由独享的守卫】</router-link>
        </li>
        <br>

        <li>
            <router-link :to="{ path:'/basicRouterView/usersGet', query:{userid:99} }">/users?userid=99【query】</router-link>
        </li>
        <!-- <li>
            <router-link :to="{path:'/basicRouterView/users',query:{username:'userNameOhers'}}">/users?username=userNameOhers</router-link>
        </li> -->
        <strong>嵌套路由中，注意重定向的使用</strong>
        <li>
            <router-link to="/basicRouterView/usersParam/usersName/jessie">/usersParam/usersName/jessie【重定向为query】</router-link>
        </li>
        <br>
        <li>
            <router-link to="/basicRouterView/users/name/eduardo/posts/1">/users/name/eduardo/posts/1</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/name/johann/posts/20">/users/name/johann/posts/20</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/name/jessie">/users/name/jessie</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/id/johann_id">/users/id/johann_id</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'idUserInfoRouter', params: { userid: 'jessie_id' } }">/users/id/jessie_id【命名路由】
            </router-link>
        </li>
        <li>
            <router-link :to="{
                name: 'idPostUserInfoRouter',
                params: { userid: 'jessie_id', postId: 12 },
            }">/users/id/jessie_id/posts/12【命名路由】</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/12" replace>/users/:userid(\\d+)</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/multiSameParam">/users/multiSameParam</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/multiSameParam/Johann/Jessie">/users/multiSameParam/Johann/Jessie
            </router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/multiSameParam/12/13">/users/multiSameParam/12/13</router-link>
        </li>
        <li>
            <router-link to="/basicRouterView/users/posts/12">/users/posts/12</router-link>
        </li>
        <!-- <li>
        <router-link to="/users/Posts/12">/users/Posts/12严格区分大小写</router-link>
      </li> -->
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view class="us__content"></router-view>
</template>

<script>
export default {
    name:'HelloBasicRouterView',
}
</script>
