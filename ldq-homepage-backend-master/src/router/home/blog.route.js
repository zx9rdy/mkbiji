const Router = require('koa-router')
const { getBlog } = require('../../controller/blog.controller')
const { textParamValid } = require('../../middleware/note.middleware')

const router = new Router({
    prefix: '/blog',
})

// 获取菜单接口
router.get('/getBlog', textParamValid, getBlog)

module.exports = router