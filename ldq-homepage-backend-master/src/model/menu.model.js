const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Menu = seq.define('Menu', {
    name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
        comment: '菜单名',
    },
    route: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: '路由',
    },
    icon: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '图标',
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '父菜单ID',
    },
}, {
    tableName: 'menu',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
})

module.exports = Menu