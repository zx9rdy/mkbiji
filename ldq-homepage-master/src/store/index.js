///该文件用于创建Vuex中最为核心的store
//引入Vue
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

import leftmenu from './home/leftmenu.js'
import user from './home/user.js'
import note from './home/note.js'

//应用Vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
    modules: {
        leftmenu,
        user,
        note,
    }
})