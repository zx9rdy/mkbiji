require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const KoaBody = require('koa-body')
// require('./db/dbSync') //数据库模型同步，不需要的话请注释掉此行
const router = require('./router')

const app = new Koa()

//处理跨域请求
app.use(cors())

//ctx.request上添加body，用于处理请求参数
app.use(KoaBody())

//app.use()返回的就是app本身，所以可以链式调用。routes()是加载路由，allowedMethods()是对于不支持的http请求方式（如lock）进行501报错
app.use(router.routes()).use(router.allowedMethods())

//统一的错误处理（我这里等于没处理，直接令ctx.body = err，有复杂需求可以写个中间件处理）
app.on('error', (err, ctx) => { ctx.body = err })

app.listen(process.env.APP_PORT, () => {
    console.log(`服务已启动 http://localhost:${process.env.APP_PORT}`);
})