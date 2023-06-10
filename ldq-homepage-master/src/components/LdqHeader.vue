<template>
    <el-row class="header-row" type="flex">
        <el-col class="logo">
            <a><img src="@/assets/logo.png" alt="logo"></a>
            <a>我的小站</a>
        </el-col>
        <el-col class="header-content">
            <div class="header-left">
                <el-tabs class="header-tabs" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="主页" name="home"></el-tab-pane>
                    <el-tab-pane label="项目" name="project"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="header-right">
                <el-input class="searchInput" placeholder="全站内容搜索" v-model="searchInput" prefix-icon="el-icon-search" clearable></el-input>
                <el-button class="searchBtn" type="primary" icon="el-icon-search"></el-button>
                <el-dropdown @command="handleCommand" v-if="isPerson">
                    <el-avatar src="https://www.ikea.cn/cn/zh/images/products/si-da-qi-bei__0504538_PE633370_S4.JPG"></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="presoncenter">个人中心</el-dropdown-item>
                        <el-dropdown-item command="msgcenter">消息中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'LdqHeader',
    props: {
        isPerson: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            activeName: '', //选中的选项卡tab-pane的name值
            searchInput: '', //搜索内容
        }
    },

    mounted() {
        if (this.$route.path.includes('home')) {
            this.activeName = 'home'
        }
        if (this.$route.path.includes('project')) {
            this.activeName = 'project'
        }
    },

    methods: {
        ...mapMutations('user', ['removeToken']),
        handleClick() {
            if (this.activeName == 'home') {
                this.$router.push('/home')
            }
            if (this.activeName == 'project') {
                this.$router.push('/project')
            }
        },
        handleCommand(command) {
            if (command == 'logout') {
                this.removeToken()
            }
        },
    },
}
</script>

<style lang="less" scoped>
.header-row {
    color: #333;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.1);
    .logo {
        width: 200px;
        height: 100%;
        a {
            padding-left: 20px;
            display: inline-block;
            height: 60px;
            line-height: 60px;
            img {
                height: 40px;
                width: 32px;
                vertical-align: middle;
            }
        }
    }
    .header-content {
        height: 100%;
        flex: 1;
        .header-left {
            width: 50%;
            height: 100%;
            float: left;
            .header-tabs {
                margin-left: 20px;
                height: 100%;
            }
        }
        .header-right {
            width: 50%;
            height: 100%;
            float: right;
            text-align: right;
            display: flex;
            align-items: center;
            .searchInput {
                flex: 1;
            }
            .searchBtn {
                margin-right: 20px;
            }
            .el-dropdown {
                margin-right: 20px;
                line-height: 100%;
                img {
                    height: 40px;
                }
            }
        }
    }
}

// 重写element-ui的样式（针对header的tab栏的底部颜色问题）
:deep(.el-tabs__nav-wrap) {
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #fff !important; //只变动这里的颜色
        z-index: 1;
    }
}
</style>