const joi = require('joi')
const { paramFormatError } = require('../constant/err.type')

// noteList 参数验证
const listParamValid = async (ctx, next) => {
    const { folder_id, pageSize, currentPage, keyword } = ctx.request.body
    const schema = joi.object({
        folder_id: joi.number().integer(),
        pageSize: joi.number().integer(),
        currentPage: joi.number().integer(),
        keyword: joi.string().max(100).allow(''),
    })
    try {
        await schema.validateAsync({
            folder_id,
            pageSize,
            currentPage,
            keyword
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// text getBlog 参数验证
const textParamValid = async (ctx, next) => {
    const { id } = ctx.query
    const schema = joi.object({
        id: joi.number().integer().required(),
    })
    try {
        await schema.validateAsync({
            id,
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// deleteNote deleteFolder 参数验证
const deleteNoteParamValid = async (ctx, next) => {
    const { id } = ctx.request.body
    const schema = joi.object({
        id: joi.number().integer().required(),
    })
    try {
        await schema.validateAsync({
            id,
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// createNote 参数验证
const createNoteParamValid = async (ctx, next) => {
    const { title, folder_id, status } = ctx.request.body
    const schema = joi.object({
        title: joi.string().max(100).required(),
        folder_id: joi.number().integer().required(),
        status: joi.string().max(1).valid('0', '1'), //值只允许为 '0' 或 '1'
    })
    try {
        await schema.validateAsync({
            title,
            folder_id,
            status,
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// updateNote 参数验证
const updateNoteParamValid = async (ctx, next) => {
    const { id, title, status } = ctx.request.body
    const schema = joi.object({
        id: joi.number().integer().required(),
        title: joi.string().max(100).required(),
        status: joi.string().max(1).valid('0', '1'), //值只允许为 '0' 或 '1'
    })
    try {
        await schema.validateAsync({
            id,
            title,
            status,
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// createFolder 参数验证
const createFolderParamValid = async (ctx, next) => {
    const { name, status } = ctx.request.body
    const schema = joi.object({
        name: joi.string().max(20).required(),
        status: joi.string().max(1).valid('0', '1'), //值只允许为 '0' 或 '1'
    })
    try {
        await schema.validateAsync({
            name,
            status,
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

// updateFolder 参数验证
const updateFolderParamValid = async (ctx, next) => {
    const { id, name, status } = ctx.request.body
    const schema = joi.object({
        id: joi.number().integer().required(),
        name: joi.string().max(20).required(),
        status: joi.string().max(1).valid('0', '1'), //值只允许为 '0' 或 '1'
    })
    try {
        await schema.validateAsync({
            id,
            name,
            status,
        })
    }
    catch (err) {
        console.error(paramFormatError.message, err)
        paramFormatError.result = err.message
        ctx.app.emit('error', paramFormatError, ctx)
        return
    }

    await next()
}

module.exports = {
    listParamValid,
    textParamValid,
    deleteNoteParamValid,
    createNoteParamValid,
    updateNoteParamValid,
    createFolderParamValid,
    updateFolderParamValid,
}