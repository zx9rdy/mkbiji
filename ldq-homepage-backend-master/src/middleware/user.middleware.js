const bcrypt = require('bcryptjs')
const joi = require('joi')
const { getUserByAnd, getUserInfoByOr } = require('../service/user.service')
const { paramFormatError, userNameExist, userMailExist, userRegisterError, userIsNotExist, userLoginError, userPasswordError } = require('../constant/err.type')

// register 参数验证
const rigisterParamValid = async (ctx, next) => {
    const { name, password, mail } = ctx.request.body
    const schema = joi.object({
        name: joi.string().max(20).required(),
        // mail: joi.string().max(128).email().required(),
        mail: joi.string().max(128).pattern(/^\w+@(\w+\.)+\w+$/).required(),
        password: joi.string().pattern(/^[a-zA-Z0-9~!@#$%^&*()_+-=.]{6,20}$/).required(),
    })
    try {
        // 如果验证成功，validateAsync()的返回值就是验证的参数对象
        await schema.validateAsync({
            name,
            password,
            mail,
        }, {
            abortEarly: false, //找到第一个错误后不停止找错，返回所有找到的错误。默认为true
            allowUnknown: true, //如果验证对象里有schema里没有的对象，则会忽略。默认为false
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err) //console.error(err.message)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// register 验证用户是否存在（合理性）
const userExist = async (ctx, next) => {
    const { name, mail } = ctx.request.body
    try {
        const resultByName = await getUserByAnd({ name })
        if (resultByName) {
            console.error(userNameExist.message, ctx.request.body)
            ctx.app.emit('error', userNameExist, ctx)
            return
        }

        const resultByMail = await getUserByAnd({ mail })
        if (resultByMail) {
            console.error(userMailExist.message, ctx.request.body)
            ctx.app.emit('error', userMailExist, ctx)
            return
        }
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }

    await next()
}

// register 密码加密
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    var salt = bcrypt.genSaltSync(10); //生成盐
    var hash = bcrypt.hashSync(password, salt); //加盐生成加密hash值
    ctx.request.body.password = hash

    await next()
}

// login 参数验证
const loginParamValid = async (ctx, next) => {
    const { name, password, mail } = ctx.request.body
    const schema = joi.object({
        name: joi.string().required(),
        mail: joi.string().required(),
        password: joi.string().required(),
    })
    try {
        // 如果验证成功，validateAsync()的返回值就是验证的参数对象
        await schema.validateAsync({
            name,
            password,
            mail,
        }, {
            abortEarly: false, //找到第一个错误后不停止找错，返回所有找到的错误。默认为true
            allowUnknown: true, //如果验证对象里有schema里没有的对象，则会忽略。默认为false
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err) //console.error(err.message)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// login 用户登录验证[ctx.state.userInfo]
const loginVertify = async (ctx, next) => {
    const { name, mail, password } = ctx.request.body
    try {
        const result = await getUserInfoByOr({ name, mail })
        // 1.用户是否存在
        if (!result) {
            console.error(userIsNotExist.message, ctx.request.body)
            ctx.app.emit('error', userIsNotExist, ctx)
            return
        }
        // 2.密码是否匹配
        if (!bcrypt.compareSync(password, result.password)) {
            console.error(userPasswordError.message, ctx.request.body)
            ctx.app.emit('error', userPasswordError, ctx)
            return
        }
        // 中间件传值,将登录用户的信息传递给下个中间件
        ctx.state.userInfo = result
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }

    await next()
}

module.exports = {
    rigisterParamValid,
    userExist,
    cryptPassword,
    loginParamValid,
    loginVertify,
}