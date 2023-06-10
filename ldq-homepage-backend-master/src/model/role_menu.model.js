const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Role = require('./role.model')
const Menu = require('./menu.model')

const RoleMenu = seq.define('RoleMenu', {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '角色ID',
        primaryKey: true,
        references: {
            model: Role,
            key: 'id',
        }
    },
    menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '菜单ID',
        primaryKey: true,
        references: {
            model: Menu,
            key: 'id',
        }
    },
}, {
    tableName: 'role_menu',
    timestamps: false,
})

RoleMenu.removeAttribute("id")

//多对多关系不能像其他关系那样通过向其中一个表添加一个外键来表示这一点，取而代之的是使用联结模型，即建立一个新表。
//belongsToMany必须要这样同时使用两次，through的值为联结表的表名。而且这次需要在定义联结模型时用references。
Role.belongsToMany(Menu, { through: 'role_menu' })
Menu.belongsToMany(Role, { through: 'role_menu' })

module.exports = RoleMenu