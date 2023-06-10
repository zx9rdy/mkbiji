<template>
    <div class="home-container">
        <el-row class="home-header">
            <LdqHeader />
        </el-row>
        <el-row class="home-content">
            <el-col class="home-aside" :span="isCollapse ? 1 : 3">
                <LeftMenu :menu="menu" />
            </el-col>
            <el-col class="home-aside-copy" :span="isCollapse ? 1 : 3">
            </el-col>
            <el-col class="home-main" :span="isCollapse ? 23 : 21">
                <main>
                    <router-view></router-view>
                </main>
                <footer>
                    <p title="微信xbddd0423">
                        <span @mouseenter="getImg" @mouseleave="delImg">
                            <img src="@/assets/img/wechat-fill.svg" alt="wechat">
                            联系站长
                        </span>
                    </p>
                    <p>
                        Copyright&copy; liudongqing.com |
                        <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备2021007067号</a>
                    </p>
                    <img class="ldq_wechat" src="@/assets/img/ldq_wechat.jpg">
                </footer>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import LdqHeader from '@/components/LdqHeader.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import { getMenuList } from '@/api'

export default {
    name: 'HomeIndex',
    components: {
        LeftMenu,
        LdqHeader,
    },
    data() {
        return {
            menu: [],
        }
    },
    computed: {
        ...mapState('leftmenu', ['isCollapse']),
    },
    mounted() {
        getMenuList().then((data) => {
            if (data) {
                this.menu = data.result
            }
        })
    },
    methods: {
        // 显示微信二维码
        getImg() {
            document.querySelector('.ldq_wechat').style.display = 'block'
        },
        // 不显示微信二维码
        delImg() {
            document.querySelector('.ldq_wechat').style.display = 'none'
        },
    },
}
</script>

<style lang="less" scoped>
.home-container {
    min-height: 100%;
    .home-header {
        height: 60px;
        position: sticky;
        top: 0;
        z-index: 999; // 防止box-shadow被挡住
        background-color: #fff; // 防止main的内容滚到header上仍然在header的背景上显示
    }
    .home-content {
        height: calc(100% - 60px);
        position: relative;
        display: flex;
        .home-aside {
            position: fixed;
            top: 60px;
            left: 0;
            height: 100%;
            overflow: hidden;
            z-index: 99;
            box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.1);
        }
        .home-main {
            position: relative;
            display: flex;
            flex-direction: column;
            main {
                display: block;
                flex: 1;
                flex-basis: auto;
                overflow: auto;
                box-sizing: border-box;
                padding: 20px;
            }
            footer {
                position: relative;
                margin: 13px;
                padding: 6px 6px 7px 6px;
                border-top: 1px solid #ddd;
                color: #8c8c8c;
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                height: 40px;
                p:nth-child(1) {
                    margin-bottom: 4px;
                    span {
                        cursor: pointer;
                        img {
                            height: 16px;
                        }
                    }
                }
                a {
                    color: #1890ff;
                }
                .ldq_wechat {
                    display: none;
                    position: fixed;
                    left: calc(50% - 85px);
                    bottom: 80px;
                    width: 250px;
                    z-index: 100;
                }
            }
        }
    }
}
</style>