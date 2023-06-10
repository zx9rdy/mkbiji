import Vue from 'vue'
//引入路由器
import router from '@/router'
//引入Vuex的store
import store from '@/store'
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入我自己写的全局样式
import './assets/css/global.css'
import dayjs from 'dayjs'
//在引入element-ui之后再引入App 以防build时自己写的样式不能覆盖element-ui的样式
import App from './App.vue'
//引入全局自定义指令
import '@/directives'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('dataFormat', function (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
})

new Vue({
    render: (h) => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    },
}).$mount('#app')
