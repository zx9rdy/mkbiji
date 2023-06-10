const jwt = require('jsonwebtoken')
const { createUser, updateById } = require('../service/user.service')
const { userRegisterError, userUpdateError } = require('../constant/err.type')
const { JWT_SECRET } = process.env

class UserController {
    //用户注册
    async register(ctx, next) {
        // 1.获取客户端请求的数据
        const { name, mail } = ctx.request.body

        try {
            // 2.数据库操作
            const { password, ...res } = await createUser(name, ctx.request.body.password, mail)
            // 3.返回结果
            ctx.body = {
                code: 0,
                message: '注册成功',
                result: res,
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    //用户登录[state.userInfo]
    async login(ctx, next) {
        // 获取用户信息（在token的playload中，记录除了password以外的全部用户信息）
        const { password, ...args } = ctx.state.userInfo
        ctx.body = {
            code: 0,
            message: '登录成功',
            result: {
                token: jwt.sign(args, JWT_SECRET, { //token令牌
                    expiresIn: '7d', //token有效期7天
                }),
                user: args
            }
        }
    }

    //用户更改密码
    async changePassword(ctx, next) {
        const { id } = ctx.state.user
        const { ...args } = ctx.request.body
        try {
            if (await updateById({ id, ...args })) {
                ctx.body = {
                    code: '0',
                    message: '修改用户信息成功',
                    result: '',
                }
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', userUpdateError, ctx)
        }
    }
}

module.exports = new UserController()