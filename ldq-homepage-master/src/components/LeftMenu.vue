<template>
    <el-row class="left-menu">
        <el-menu unique-opened @select="routeJump" :collapse="isCollapse" :default-active="avtiveIndex" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="left-nav">
            <template v-for="m in menu">
                <el-submenu :index="m.route" v-if="m.hasOwnProperty('children')" :key="m.id">
                    <template slot="title">
                        <i :class="m.icon"></i>
                        <span slot="title">{{ m.name }}</span>
                    </template>
                    <template v-for="subm in m.children">
                        <el-menu-item :index="subm.route" :key="subm.id">{{subm.name}}</el-menu-item>
                    </template>
                </el-submenu>
                <el-menu-item :index="m.route" v-if="!m.hasOwnProperty('children')" :key="m.id">
                    <i :class="m.icon"></i>
                    <span slot="title">{{ m.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
        <div class="menu-folder" @click="setCollapseMut(isCollapse)">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
    </el-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'LeftMenu',
    props: {
        menu: {
            type: Array,
            require: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        ...mapState('leftmenu', ['isCollapse', 'avtiveIndex']),
    },
    mounted() {
        //直接刷新网页等重定向到noLogin的就不要让菜单高亮的activeIndex的值为noLogin了
        if (this.$route.path != '/home/noLogin') {
            this.setAvtiveIndexMut(this.$route.path);
        }
    },
    methods: {
        ...mapMutations('leftmenu', ['setCollapseMut', 'setAvtiveIndexMut']),
        //路由跳转
        routeJump(index) {
            let reg = /^\/.+\/.+(?=\/)|^\/.+\/.+/g;
            let routeIndex = this.$route.path.match(reg);
            //当前路由已在点击的菜单的下时不进行路由跳转
            if (routeIndex[0] != index) {
                this.$router.push(index);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.left-menu {
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    .left-nav {
        flex: 1;
        width: 100%;
    }
    .menu-folder {
        width: 100%;
        padding: 8px 0px;
        background-color: #545c64; //须和el-menu的background-color颜色保持一致
        border-top: 1px solid #fff;
        cursor: pointer;
        i {
            font-size: 1.5em;
            color: #fff;
            float: left;
        }
    }
}
</style>