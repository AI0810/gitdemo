<template>
    <div>
        <el-empty description="您的页面去火星了~">
            <el-button type="primary" @click="backIndex">返回首页</el-button>
        </el-empty>
    </div>
</template>

<script>
    export default {
        methods:{
            backIndex(){
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="less" scoped>

</style>