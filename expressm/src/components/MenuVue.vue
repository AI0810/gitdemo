<template>
    <div>
        <el-submenu v-if="menu.children" :index="menu.url">
            <template>
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.name}}</span>
            </template>
            <!-- 递归 仔细看下面这个组件，它是被重复调用的本组件-->
            <nav-menu v-for="(item,index) in menu.children" :key='index' :menu='item'></nav-menu>
        </el-submenu>
        <el-menu-item v-else :index="menu.url" >
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {
        name:'NavMenu',    //组件自己调自己的时候才有用（递归）
        props:{
            menu:{
                type:Object,
                required:true
            }
        }
    }
</script>

<style lang="less" scoped>
.mitem{
    width: 200px;
}
</style>