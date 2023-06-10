//用户仓库
export default {
    namespaced: true,
    actions: {},
    mutations: {
        //移除token
        removeToken(state) {
            state.token = null
            localStorage.removeItem('ldq_token')
            location.reload()
        },
        //储存token
        setToken(state, token) {
            state.token = token //这句不能去掉，否则组件不能监视到token的变化了
            localStorage.setItem('ldq_token', 'Bearer ' + token)
        },
    },
    state: {
        token: localStorage.getItem('ldq_token'),
    },
    getters: {}
}