const Router = require('koa-router')
const { register, login, changePassword } = require('../../controller/user.controller')
const { rigisterParamValid, userExist, cryptPassword, loginParamValid, loginVertify } = require('../../middleware/user.middleware')
const { auth } = require('../../middleware/auth.middleware')

const router = new Router({
    prefix: '/user', //给所有api前加上/user
})

// 注册接口
router.post('/register', rigisterParamValid, userExist, cryptPassword, register)
// 登录接口
router.post('/login', loginParamValid, loginVertify, login)

//修改密码
router.post('/update', auth, cryptPassword, changePassword)

module.exports = router