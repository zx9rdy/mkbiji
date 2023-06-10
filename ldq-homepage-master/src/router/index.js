//该文件用于创建整个应用的路由器
//引入Vue
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
//应用VueRouter插件
Vue.use(VueRouter)
//引入组件
/* Home */
const Home = () => import('@/views/home')
const Blog = () => import('@/views/home/text/blog')
const Note = () => import('@/views/home/text/note')
const NoteList = () => import('@/views/home/text/note/List')
const NoteDetail = () => import('@/views/home/text/note/Detail')
const NoteEdit = () => import('@/views/home/text/note/Edit')
const Music = () => import('@/views/home/music')
const Account = () => import('@/views/home/sys/account')
const Menu = () => import('@/views/home/sys/menu')
const NoLogin = () => import('@/views/home/error/NoLogin')
const Login = () => import('@/views/sys/login_regist')

/* project */
const Project = () => import('@/views/project')
const ProjectList = () => import('@/views/project/ProjectList.vue')
const Carousel = () => import('@/views/project/carousel')
const Echarts = () => import('@/views/project/echarts')

/* other */
const Other = () => import('@/views/other')
const GreenCode = () => import('@/views/other/green_code')

import store from '@/store'

// 重写push | replace(解决声明式导航重复传参时的控制台警告问题)
let originPush = VueRouter.prototype.push //备份原来的push
let originReplace = VueRouter.prototype.replace //备份原来的replace
VueRouter.prototype.push = function (to, resolve, reject) {
    //是目标路由，resolve是成功回调，reject是失败回调
    if (resolve && reject) {
        originPush.call(this, to, resolve, reject)
    } else {
        originPush.call(
            this,
            to,
            () => {},
            () => {}
        )
    }
}
VueRouter.prototype.replace = function (to, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, to, resolve, reject)
    } else {
        originReplace.call(
            this,
            to,
            () => {},
            () => {}
        )
    }
}

//创建并暴露一个路由器
const router = new VueRouter({
    // mode: 'history',//默认是hash
    routes: [
        {
            path: '/',
            redirect: '/project/list',
        },
        {
            path: '/home/',
            name: 'Home',
            component: Home,
            redirect: '/home/note/list',
            children: [
                {
                    path: 'note',
                    name: 'Note',
                    component: Note,
                    redirect: '/home/note/list',
                    meta: {
                        auth: true,
                    },
                    children: [
                        {
                            path: 'list',
                            name: 'NoteList',
                            component: NoteList,
                            meta: {
                                auth: true,
                            },
                        },
                        {
                            path: 'detail',
                            name: 'NoteDetail',
                            component: NoteDetail,
                            meta: {
                                auth: true,
                            },
                        },
                        {
                            path: 'edit',
                            name: 'NoteEdit',
                            component: NoteEdit,
                            meta: {
                                auth: true,
                            },
                        },
                    ],
                },
                {
                    path: 'blog',
                    name: 'Blog',
                    component: Blog,
                },
                {
                    path: 'Music',
                    name: 'Music',
                    component: Music,
                },
                {
                    path: 'account',
                    name: 'Account',
                    component: Account,
                    meta: {
                        auth: true,
                    },
                },
                {
                    path: 'menu',
                    name: 'Menu',
                    component: Menu,
                    meta: {
                        auth: true,
                    },
                },
                {
                    path: 'noLogin',
                    name: 'NoLogin',
                    component: NoLogin,
                },
            ],
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/project/',
            name: 'Project',
            component: Project,
            redirect: '/project/list',
            children: [
                {
                    path: 'list',
                    name: 'ProjectList',
                    component: ProjectList,
                },
                {
                    path: 'carousel',
                    name: 'Carousel',
                    component: Carousel,
                },
                {
                    path: 'echarts',
                    name: 'Echarts',
                    component: Echarts,
                },
            ],
        },
        {
            path: '/other/',
            name: 'Other',
            component: Other,
            children: [
                {
                    path: 'greencode',
                    name: 'GreenCode',
                    component: GreenCode,
                },
            ],
        },
    ],
})

//全局前置路由守卫--初始化和每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        //判定是否需要登录
        if (localStorage.getItem('ldq_token')) {
            next()
        } else {
            store.commit('leftmenu/setAvtiveIndexMut', to.path) //为了首次打开主页、刷新网页等情况重定向路由时菜单依然有高亮
            // next('/home/noLogin') //用next会有奇怪的错误，应该是跟promise有关
            router.push('/home/noLogin')
        }
    } else {
        next()
    }
})

export default router
