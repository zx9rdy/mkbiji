const Router = require('koa-router')
const { getMenuList } = require('../../controller/menu.controller')
const { kindAuth } = require('../../middleware/auth.middleware')

const router = new Router({
    prefix: '/menu',
})

// 获取菜单接口
router.get('/menuList', kindAuth, getMenuList)

module.exports = router