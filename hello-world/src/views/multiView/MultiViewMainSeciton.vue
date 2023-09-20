<template >
    <div>
        <h1>命名视图</h1>
        <h2>This is main section page!</h2>
        <h3>main section，路由组件传参，自定义参数 ： {{myParams}}</h3>
    </div>
</template>
<script>
export default {
    name: "MultiViewMainSeciton",
    // 请确保添加一个与路由参数完全相同的 prop 名
    props:['myParams']
}
</script>