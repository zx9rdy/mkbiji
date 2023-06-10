//笔记仓库
export default {
    namespaced: true,
    actions: {},
    mutations: {
        //set folderId
        setFolderIdMut(state, folderId) {
            state.folderId = folderId
        },
        //set currentPage
        setCurrentPageMut(state, currentPage) {
            state.currentPage = currentPage
        },
        //set pageSize
        setPageSizeMut(state, pageSize) {
            state.pageSize = pageSize
        },
        //set keywordTem
        setKeywordTemMut(state, keywordTem) {
            state.keywordTem = keywordTem
        },
        //set isCurKeyword
        setIsCurKeywordMut(state, isCurKeyword) {
            state.isCurKeyword = isCurKeyword
        },
    },
    state: {
        folderId: 0, //当前文件夹id
        currentPage: 1, //当前页码
        pageSize: 10, //每页显示条目个数
        keywordTem: '', //搜索关键字
        //说明：isCurKeyword的唯一用途在于，当路由从home/note/detail等返回到list时，如果keywordTem非空，这时赋值给list组件的keyword后，会触发监听，
        //keyword触发监听后会令currentPage为1。而若是搜索关键字的场合点击进入的detail组件，我希望返回到list组件时页面不发生变化，currentPage保持原来的值，
        //所以追加isCurKeyword来模拟 第一次进入list时在mount生命周期中不要监听keyword导致而currentPage变为1。
        isCurKeyword: true, //当前关键字是否是vuex给的
    },
    getters: {}
}