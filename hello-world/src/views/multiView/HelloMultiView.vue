<template>
    <div>
        <h1>这是单路由多视图（命名视图）页面</h1>
    </div>
    <div>
        <li>
            <router-link to="/multiView/home">/multiView/home</router-link>
        </li>
        <li>
            <router-link to="/multiView/homeRevers">/multiView/homeRevers</router-link>
        </li>
        <li>
            <router-link to="/multiView/tranSomthing/tranSomthingParam_is_johann">/multiView/tranSomthing</router-link>
        </li>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!-- 如果 router-view 没有设置名字，那么默认为 default -->
    <router-view class="us__content"></router-view>
    <router-view class="us__content us__content--helper" name="LeftSidebar"></router-view>
    <!-- <router-view class="view main-content"></router-view> -->
    <router-view class="us__content us__content--helper" name="RightSidebar"></router-view>
</template>
