
const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class MenuService {
    // 【查】查询菜单
    async getMenuListService(role) {
        const result = await seq.query(`
            select
                m.id,
                m.name,
                m.route,
                m.icon,
                m.parent_id
            from menu as m
            join role_menu as rm on m.id = rm.menu_id
            join role as r on r.id = rm.role_id
            where rm.role_id = ${role};
        `, { type: QueryTypes.SELECT })
        return result
    }
}

module.exports = new MenuService()