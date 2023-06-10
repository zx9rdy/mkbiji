const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Role = require('./role.model')

// 创建User模型（会自动创建id字段并设其为自增主键）
const User = seq.define('User', {
    name: {
        type: DataTypes.STRING(20), //字段类型
        allowNull: false, //是否允许为NULL(默认为 true)
        unique: true, //是否唯一(默认为 false)
        comment: '用户名', //说明
    },
    mail: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        comment: '邮箱地址',
    },
    password: {
        type: DataTypes.CHAR(60),
        allowNull: false,
        comment: '密码',
    },
    avatar_path: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: '', //默认值(默认为 NULL)
        comment: '头像路径',
    },
    introduction: {
        type: DataTypes.STRING(140),
        allowNull: false,
        defaultValue: '',
        comment: '简介',
    },
    // role: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 3,
    //     comment: '用户角色',
    //     //外键约束
    //     references: {
    //         // 这是对另一个模型的参考
    //         model: Role,
    //         // 这是引用模型的列名
    //         key: 'id',
    //     }
    // },
}, {
    tableName: 'user', //表名
    timestamps: true, //启用时间戳（默认为true）
    createdAt: 'create_time', //若为false值则只不启用createdAt
    updatedAt: 'update_time', //若为false值则只不启用updatedAt
    deletedAt: 'delete_time', //默认值就是false，不想要delete的话不写就行了
    paranoid: true, //必须开启deletedAt才可以设为true。开启后删除操作只会逻辑删除（在deletedAt上添加删除时间
})

// hasMany和belongsTo经常成对出现。第二个参数对象写在hasMany和belongsTo上需一致，否则会出现两个外键。
// 外键在User上，对Role模型没有影响
Role.hasMany(User, {
    foreignKey: {
        name: 'role', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        defaultValue: 3,
        comment: '用户角色',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})
User.belongsTo(Role, {
    foreignKey: {
        name: 'role', //外键字段名。如果foreignKey的值不是对象而是字符串，则默认该字符串就是字段名
        type: DataTypes.INTEGER, //这里不写就默认和引用的外键一样的类型，写的话比如你可以改为UUID类型
        allowNull: false, //默认为ture
        defaultValue: 3,
        comment: '用户角色',
    },
    targetKey: 'id', //外键关联Role的字段，默认为Role主键
    onDelete: 'RESTRICT', //onDelete设为严格模式。onUpdate默认为CASCADE一般没有改的必要
})

module.exports = User