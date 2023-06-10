const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const TextContent = seq.define('TextContent', {
    content: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        comment: '内容',
    },
}, {
    tableName: 'text_content',
    timestamps: false,
})

module.exports = TextContent