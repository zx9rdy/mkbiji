const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model')
const NoteFolder = require('./note_folder.model')
const TextContent = require('./text_content.model')

const Note = seq.define('Note', {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '未命名',
        comment: '标题',
    },
    status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: '1',
        comment: '状态。0:私有,1:公开',
    },
}, {
    tableName: 'note',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    paranoid: true,
})

/// User一对多Note
User.hasMany(Note, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '作者ID',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})
Note.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '作者',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})

/// NoteFolder一对多Note
NoteFolder.hasMany(Note, {
    foreignKey: {
        name: 'folder_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '文件夹ID',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})
Note.belongsTo(NoteFolder, {
    foreignKey: {
        name: 'folder_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '文件夹ID',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})

/// TextContent一对多Note
TextContent.hasMany(Note, {
    foreignKey: {
        name: 'text_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '内容ID',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})
Note.belongsTo(TextContent, {
    foreignKey: {
        name: 'text_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '内容ID',
    },
    targetKey: 'id',
    onDelete: 'RESTRICT',
})

module.exports = Note