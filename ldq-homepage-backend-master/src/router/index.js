const fs = require('fs')
const Router = require('koa-router')

const router = new Router()
router.get('/', (ctx, next) => {
    ctx.body = '访问成功。这里是ldq-api站点。'
});

loadRouter(__dirname)

// 载入dirname文件夹下及其所有子孙文件夹下的所有路由
function loadRouter(dirname) {
    fs.readdirSync(dirname).forEach(file => {
        if (!/^.+(\.js)$/.test(file)) {
            loadRouter(dirname + '/' + file)
        } else if (file !== 'index.js') {
            let r = require(dirname + '/' + file)
            router.use(r.routes())
        }
    })
}

module.exports = router