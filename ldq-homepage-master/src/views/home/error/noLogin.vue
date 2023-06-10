<template>
    <div>
        <el-empty description="请登录后查看">
            <el-button type="primary" @click="toLogin">去登录</el-button>
        </el-empty>
    </div>
</template>

<script>
export default {
    name: 'NoLogin',

    data() {
        return {};
    },

    mounted() {},

    methods: {
        toLogin() {
            this.$router.push('/login');
        },
    },
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('ldq_token')) {
            next('/home');
        } else {
            next();
        }
    },
};
</script>

<style lang="less" scoped>
</style>