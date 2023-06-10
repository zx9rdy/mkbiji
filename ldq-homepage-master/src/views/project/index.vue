<template>
    <div class="project-container">
        <el-row class="project-header">
            <LdqHeader :isPerson="false" />
        </el-row>
        <el-row class="project-content">
            <main>
                <router-view></router-view>
            </main>
        </el-row>
    </div>
</template>

<script>
import LdqHeader from '@/components/LdqHeader.vue'

export default {
    name: 'ProjectIndex',
    components: {
        LdqHeader,
    },
}
</script>

<style lang="less" scoped>
.project-header {
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 999; // 防止box-shadow被挡住
    background-color: #fff; // 防止main的内容滚到header上仍然在header的背景上显示
    .project-content {
        // height: calc(100% - 60px);
        position: relative;
    }
}
</style>