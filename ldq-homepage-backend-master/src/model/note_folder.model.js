const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model')

const NoteFolder = seq.define('NoteFolder', {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
        comment: '文件夹名',
    },
    status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: '1',
        comment: '状态。0:私有,1:公开',
    },
    default: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: '1',
        comment: '默认文件夹。0:默认,1:非默认',
    },
}, {
    tableName: 'note_folder',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    paranoid: true,
})

User.hasMany(NoteFolder, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '作者',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})
NoteFolder.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '作者',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})

module.exports = NoteFolder