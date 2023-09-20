// 完成路由相关的工作
import { createRouter,createWebHistory } from "vue-router";
//import { createRouter,createWebHashHistory } from "vue-router";
import HelloHome from "../views/HelloHome.vue";
import HelloAbout from "../views/HelloAbout.vue";
import HelloLogin from '../views/HelloLogin.vue';

import HelloBasicRouterView from "../views/basicRouterView/HelloBasicRouterView.vue";
import HelloNestView from "../views/nestView/HelloNestView.vue";
import HelloMultiView from "../views/multiView/HelloMultiView.vue";

import UserInfo from "../views/basicRouterView/UserInfo.vue";
import PropsUserInfo from "../views/basicRouterView/PropsUserInfo.vue";

import NestedUserInfo from "../views/nestView/NestedUserInfo.vue";
import NestedUserInfoHome from "../views/nestView/NestedUserInfoHome.vue";
import NestedUserInfoProfile from "../views/nestView/NestedUserInfoProfile.vue";
import NestedUserInfoDescription from "../views/nestView/NestedUserInfoDescription.vue";

import MultiViewMainSeciton from "../views/multiView/MultiViewMainSeciton.vue";
import MultiViewLeftSeciton from "../views/multiView/MultiViewLeftSeciton.vue";
import MultiViewRightSeciton from "../views/multiView/MultiViewRightSeciton.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/home", name: 'homepage',component: HelloHome },
  { path: "/about", name: 'aboutpage', component: HelloAbout,alias: '/aboutAlias', 
    // 路由独享的守卫,也可以传递一个函数数组
    beforeEnter: [removeQueryParams],
  },

  //重定向
  // 1，通过 redirect: '/url' 重定向
  { path: '/',redirect:'/home'},
  // 2，通过 redirect: { name: '命名的路由' } 重定向
  { path: '/aboutRedirect',redirect:{name:'aboutpage'}},
  
  { path: '/login', name: 'loginpage', component:HelloLogin },

  //路由组件传参
  {
    path: "/basicRouterView",
    name: 'basicRouterView',
    component: HelloBasicRouterView,
    children: [
      {
        path: 'users/propsUserid/:propsUserid',
        component: PropsUserInfo,
        //当 props 设置为 true 时，route.params 将被设置为组件的 props。
        //props:true
        //对象模式,当 props 是一个对象时，它将原样设置为组件 props。当 props 是静态的时候很有用
        props: {propsUserid:true,propsUsername:'propsUsernameIsJohann'},

        /**
         * 路由独享的守卫
         * beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。
         * 例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects。
         * 它们只有在 从一个不同的 路由导航时，才会被触发。
         */
        beforeEnter: (to, from) => {
          console.log(to);
          console.log(from);
          // reject the navigation
          // if(to.name != 'homepage' && to.name != 'aboutpage' && to.name !== 'loginpage'){
          //   return { name: 'loginpage' }
          // }
          alert('beforeEnter 路由独享的守卫');
        },

        meta: {requiresAuth: true}

      },

      {
        //注意，以 / 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。
        //该子路由的路径是 /basicRouterView/usersGet【嵌套的 URL】。如果 path: '/usersGet' ,则子路由路径为 /usersGet
        path: 'usersGet',
        component: UserInfo
      },
      // 3，通过方法，动态返回重定向目标
      //:username -> 匹配其他任何内容
      //{ path: "usersParam/:username", component: UserInfo },
      {
        path: 'usersParam/usersName/:username',
        redirect: to => {
          // 方法接收目标路由作为参数
          // return 重定向的字符串路径/路径对象
          //嵌套路由中使用重定向，重定向的url直接 以 '/'开头，避免使用嵌套的url。可以对比以下两种区别
          return {path: '/basicRouterView/usersGet', query: { username: to.params.username }}  
          //return {path: 'usersGet', query: { username: to.params.username }}  
        }
      },


      {
        path: 'users/id',
        component: UserInfo
      },


      { path: "users/name/:username/posts/:postId", component: UserInfo },
      { path: "users/name/:username", component: UserInfo },

      //命名路由
      {
        path: "users/id/:userid",
        name: "idUserInfoRouter",
        component: UserInfo,
      },
      {
        path: "users/id/:userid/posts/:postId",
        name: "idPostUserInfoRouter",
        component: UserInfo,
      },

      //在参数中自定义正则
      //:userid -> 仅匹配数字 在 JavaScript 中实际传递字符串中的反斜杠字符。
      { path: "users/:userid(\\d+)", component: UserInfo },

      //可重复的参数
      //这将为你提供一个参数数组，而不是一个字符串
      //如果你需要匹配具有多个部分的路由，如 /first/second/third，你应该用 *（0 个或多个）和 +（1 个或多个）将参数标记为可重复
      { path: "users/multiSameParam/:username*", component: UserInfo },
      { path: "users/multiSameParam/:userid(\\d+)+", component: UserInfo },

      //Sensitive 与 strict 路由配置
      //默认情况下，所有路由是不区分大小写的，并且能匹配带有或不带有尾部斜线的路由。
      //例如，路由 /users 将匹配 /users、/users/、甚至 /Users/。
      //这种行为可以通过 strict 和 sensitive 选项来修改，它们可以既可以应用在整个全局路由上，又可以应用于当前路由上

      // strict 严格模式，路径末尾不允许有 /
      // 将匹配 /posts, /Posts, 以及 /posts/42 而非 /posts/ 或 /Posts/42/
      {
        path: "users/posts/:postId(\\d+)?",
        component: UserInfo,
        strict: true,
      },

      //你也可以通过使用 ? 修饰符(0 个或 1 个)将一个参数标记为可选：
      //请注意，* 在技术上也标志着一个参数是可选的，但 ? 参数不能重复。
    ],
  },

  {
    path: "/nestView",
    component: HelloNestView,
    children: [
      {
        path: "nestedUsers/name/:username/posts/:postId",
        component: NestedUserInfo,
        // 将组件传参方式，与 $route 剥离
        props: true,
        children: [
          {
            // 当 /user/:id/profile 匹配成功
            // UserProfile 将被渲染到 User 的 <router-view> 内部
            path: "",
            component: NestedUserInfoHome,
          },
          {
            // 当 /user/:id/profile 匹配成功
            // UserProfile 将被渲染到 User 的 <router-view> 内部
            path: "profile",
            component: NestedUserInfoProfile,
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 将被渲染到 User 的 <router-view> 内部
            path: "desc",
            name: "userDescRouter",
            component: NestedUserInfoDescription,
          },
        ],
      },
    ],
  },

  {
    path: "/multiView",
    component: HelloMultiView,
    children: [
      //命名视图
      {
        path: "home",
        //一个路由可以定义多个命名组件
        //它将被渲染成具有相应名称的 <router-view>s。
        components: {
          default: MultiViewMainSeciton,
          LeftSidebar: MultiViewLeftSeciton,
          RightSidebar: MultiViewRightSeciton,
        },
      },
      {
        path: "homeRevers",
        //一个路由可以定义多个命名组件
        //它将被渲染成具有相应名称的 <router-view>s。
        components: {
          default: MultiViewMainSeciton,
          LeftSidebar: MultiViewRightSeciton,
          RightSidebar: MultiViewLeftSeciton,
        },
      },
      {
        path: "tranSomthing/:myParams",
        //一个路由可以定义多个命名组件
        //它将被渲染成具有相应名称的 <router-view>s。
        components: {
          default: MultiViewMainSeciton,
          LeftSidebar: MultiViewLeftSeciton,
          RightSidebar: MultiViewRightSeciton,
        },
        //对于有命名视图的路由，你必须为每个命名视图定义 props 配置
        props:{default: true, LeftSidebar: true},
      },
    ],
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  //history: createWebHashHistory(),
  // HTML5 模式
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
  sensitive: true, //全局生效，区分大小写
});

//动态路由
// 1,新增路由
router.addRoute(
  {path:'/dynamicRouterView',
  name: 'dynamicRouterView',
  component: () => import('@/views/dynamicRouterView/HelloDynamicRouterView.vue')
});
router.addRoute(
  {path:'/dynamicRouterView2',
  name: 'dynamicRouterView2',
  component: () => import('@/views/dynamicRouterView/HelloDynamicRouterView.vue')
});

// 2,删除路由
// 2.1,通过添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由：
// const removeRoute = router.addRoute(
//   {path:'/dynamicRouterView2',
//   name: 'dynamicRouterView',
//   component: () => import('@/views/dynamicRouterView/HelloDynamicRouterView.vue')
// });

// 2.2,通过调用 router.addRoute() 返回的回调。当路由没有名称时，这很有用
//removeRoute();

// 2.3,通过使用 router.removeRoute() 按名称删除路由
//router.removeRoute('dynamicRouterView2');

// 3,添加嵌套路由
router.addRoute('dynamicRouterView',
  {
    path: 'nestedDynamic',
    name: 'nestedDynamic',
    component: () => import('@/views/dynamicRouterView/NestedDynamicRouterView.vue')
  }
)




// 正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航
// 这里有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。

// 全局前置守卫
//每个守卫方法接收两个参数：
//  to: 即将要进入的目标 用一种标准化的方式
//  from: 当前导航正要离开的路由 用一种标准化的方式
// router.beforeEach((to, from) => {
//   // ...
//   // 返回 false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
//   console.log(to);
//   console.log(from);
//   if(to.name != 'homepage' && to.name != 'aboutpage' && to.name !== 'loginpage'){
//     return { name: 'loginpage' }
//   }
//   //return false
// });

/** 
 * 全局解析守卫
   你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，
   因为它在 每次导航时都会触发，但是确保在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用
   router.beforeResolve 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
 */
// router.beforeResolve(async to => {
//   if (to.meta.requiresCamera) {
//     try {
//       await askForCameraPermission()
//     } catch (error) {
//       if (error instanceof NotAllowedError) {
//         // ... 处理错误，然后取消导航
//         return false
//       } else {
//         // 意料之外的错误，取消导航并把错误传给全局处理器
//         throw error
//       }
//     }
//   }
// });

/** 
 * 全局后置钩子
 * 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
 * 它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

   它们也反映了 navigation failures 作为第三个参数：
 */
// router.afterEach((to, from) => {
//   sendToAnalytics(to.fullPath)
// })
// router.afterEach((to, from, failure) => {
//   if (!failure) sendToAnalytics(to.fullPath)
// })

function removeQueryParams(to) {
  alert('路由独享的守卫(beforeEnter),也可以传递一个函数数组 \n '+to.fullPath);
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

export default router;
