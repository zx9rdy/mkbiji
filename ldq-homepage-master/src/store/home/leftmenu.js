//菜单仓库
export default {
    namespaced: true,
    actions: {
        // setCollapseAct(context, val) {
        //     // context.state.isCollapse = !val
        //     context.commit('setCollapseMut', val)
        // },
    },
    mutations: {
        //折叠或展开菜单栏
        setCollapseMut(state, isCollapse) {
            state.isCollapse = !isCollapse //这句不能去掉，否则组件不能监视到isCollapse的变化了
            localStorage.setItem('ldq_isCollapse', !isCollapse)
        },
        //取路由地址的前两段赋给avtiveIndex，这样比如我的笔记下还有子路由时菜单栏依然可以高亮（因为我菜单的index的值设的是路由）
        setAvtiveIndexMut(state, route) {
            let reg = /^\/.+\/.+(?=\/)|^\/.+\/.+/g;
            let routeIndex = route.match(reg);
            if (routeIndex) {
                state.avtiveIndex = routeIndex[0];
            }
        },
    },
    state: {
        isCollapse: localStorage.getItem('ldq_isCollapse') == 'true' ? true : false,//是否折叠
        avtiveIndex: '/home/note', //当前激活菜单的index
    },
    getters: {}
}