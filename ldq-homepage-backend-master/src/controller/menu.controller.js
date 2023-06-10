const { getMenuListService } = require('../service/menu.service')
const { getMenuListError, emptyMenu } = require('../constant/err.type')

class MenuController {
    //获取菜单[state.user]
    async getMenuList(ctx, next) {
        let role = 0
        if (!ctx.state.user) {
            role = process.env.USER_ROLE
        } else {
            role = ctx.state.user.role
        }
        try {
            const result = await getMenuListService(role)
            const menu = []
            if (Array.isArray(result) && result.length != 0) {
                // 将result转换成前端使用的菜单格式的menu
                result.forEach(r => {
                    if (!r.parent_id) {
                        menu.push(r)
                    } else {
                        menu.forEach(m => {
                            if (m.id == r.parent_id) {
                                if (!m.children) {
                                    m.children = []
                                }
                                m.children.push(r)
                            }
                        })
                    }
                })
                ctx.body = {
                    code: 0,
                    message: '获取菜单成功',
                    result: menu,
                }
            } else {
                console.error(emptyMenu.message, ctx.state.user)
                ctx.app.emit('error', emptyMenu, ctx)
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getMenuListError, ctx)
        }
    }
}

module.exports = new MenuController()