<template>
    <div>
        <h1>由Nav跳转到嵌套路由页面</h1>
        <div>
            <li>
                <router-link to="/nestView/nestedUsers/name/eduardo/posts/1">/users/name/eduardo/posts/1【嵌套路由】</router-link>
            </li>
            <li>
                <router-link to="/nestView/nestedUsers/name/johann/posts/20">/users/name/johann/posts/20【嵌套路由】</router-link>
            </li>
        </div>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view class="us__content"></router-view>
    </div>
</template>
