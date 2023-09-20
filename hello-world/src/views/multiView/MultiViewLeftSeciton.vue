<template >
    <div>
        <h2>This is left section page!</h2>
        <h3>left section，路由组件传参，自定义参数 ：{{myParams}}</h3>
    </div>
</template>
<script>
export default {
    // 请确保添加一个与路由参数完全相同的 prop 名
    props:['myParams']
}
</script>