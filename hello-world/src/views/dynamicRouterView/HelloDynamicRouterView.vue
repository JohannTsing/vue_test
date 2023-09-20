<template>
    <div>
        <h1>动态路由（添加、删除）页面</h1>
        <h2>$route.fullPath : {{$route.fullPath}}</h2>
        <li>
            <!-- <router-link :to="$route.fullPath+'/nestedDynamic'">nestedDynamic</router-link> -->
            <router-link to="/dynamicRouterView/nestedDynamic">nestedDynamic</router-link>
        </li>

        <h2>访问 Store 中的数据</h2>
        <!-- <span>{{this.$store.state.count}}</span> -->

    </div>
    <router-view class="us__content"></router-view>
</template>