const {
    getNoteFolderService, getNoteService, getNoteTextService, deleteNoteService, createNoteService, updateNoteService,
    createNoteFolderService, deleteFolderService, updateFolderService
} = require('../service/note.service')
const {
    getNoteFolderError, getNoteListError, getNoteTextError, deleteNoteError, noteIsNotExist, createNoteError, updateNoteError,
    createNoteFolderError, deleteNoteFolderError, updateNoteFolderError, noteFolderIsNotExist, canNotDefaultNoteFolder
} = require('../constant/err.type')

class NoteController {
    //获取笔记文件夹[state.user]
    async getNoteFolder(ctx, next) {
        try {
            const { id } = ctx.state.user
            const result = await getNoteFolderService(id)
            ctx.body = {
                code: 0,
                message: '获取笔记文件夹成功',
                result,
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getNoteFolderError, ctx)
        }
    }

    //获取笔记列表[state.user]
    async getNoteList(ctx, next) {
        try {
            const { folder_id, pageSize, currentPage, keyword } = ctx.request.body
            const { id } = ctx.state.user
            const whereOpAnd = [{ user_id: id }]
            let offset = 0
            let keywordTem = ''

            if (folder_id) {
                whereOpAnd.push({ folder_id })
            }
            if (pageSize && currentPage) {
                offset = pageSize * (currentPage - 1)
            }
            if (keyword) {
                keywordTem = keyword
            }
            const result = await getNoteService(
                whereOpAnd,
                offset,
                pageSize,
                keywordTem,
            )

            ctx.body = {
                code: 0,
                message: '获取笔记成功',
                result,
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getNoteListError, ctx)
        }
    }

    //获取笔记内容[state.user]
    async getNoteText(ctx, next) {
        try {
            const { id: note_id } = ctx.query
            const { id: user_id } = ctx.state.user
            const result = await getNoteTextService(user_id, note_id)
            if (result) {
                const content = {
                    title: result.title,
                    status: result.status,
                    update_time: result.update_time,
                    content: result.TextContent.content,
                }
                ctx.body = {
                    code: 0,
                    message: '获取笔记成功',
                    result: content,
                }
            } else {
                ctx.app.emit('error', noteIsNotExist, ctx)
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getNoteTextError, ctx)
        }
    }

    //删除笔记[state.user]
    async deleteNote(ctx, next) {
        try {
            const { id: note_id } = ctx.request.body
            const { id: user_id } = ctx.state.user
            const result = await deleteNoteService(user_id, note_id)
            if (result == 1) {
                ctx.body = {
                    code: 0,
                    message: '删除笔记成功',
                    result: result,
                }
            } else {
                ctx.app.emit('error', noteIsNotExist, ctx)
            }

        } catch (error) {
            console.error(error)
            ctx.app.emit('error', deleteNoteError, ctx)
        }
    }

    //创建笔记[state.user]
    async createNote(ctx, next) {
        try {
            let { title, content, folder_id, status } = ctx.request.body
            if (!status) {
                status = 1;
            }
            const { id: user_id } = ctx.state.user
            const result = await createNoteService(user_id, title, content, folder_id, status)
            ctx.body = {
                code: 0,
                message: '创建笔记成功',
                result: result,
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', createNoteError, ctx)
        }
    }

    //更新笔记[state.user]
    async updateNote(ctx, next) {
        try {
            let { id: note_id, title, content, status } = ctx.request.body
            const { id: user_id } = ctx.state.user
            if (!status) {
                status = 1;
            }
            const result = await updateNoteService(user_id, note_id, title, content, status)
            if (result) {
                ctx.body = {
                    code: 0,
                    message: '更新笔记成功',
                    result: result,
                }
            } else {
                ctx.app.emit('error', noteIsNotExist, ctx)
            }

        } catch (error) {
            console.error(error)
            ctx.app.emit('error', updateNoteError, ctx)
        }
    }

    //创建笔记文件夹[state.user]
    async createFolder(ctx, next) {
        try {
            let { name, status } = ctx.request.body
            if (!status) {
                status = 1;
            }
            const { id: user_id } = ctx.state.user
            const result = await createNoteFolderService(user_id, name, status)
            ctx.body = {
                code: 0,
                message: '创建笔记文件夹成功',
                result: result,
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', createNoteFolderError, ctx)
        }
    }

    //删除笔记文件夹[state.user]
    async deleteFolder(ctx, next) {
        try {
            const { id: folder_id } = ctx.request.body
            const { id: user_id } = ctx.state.user
            const result = await deleteFolderService(user_id, folder_id)
            if (result > 0) {
                ctx.body = {
                    code: 0,
                    message: '删除笔记文件夹成功',
                    result: result,
                }
            } else if (result == -1) {
                ctx.app.emit('error', canNotDefaultNoteFolder, ctx)
            } else {
                ctx.app.emit('error', noteFolderIsNotExist, ctx)
            }

        } catch (error) {
            console.error(error)
            ctx.app.emit('error', deleteNoteFolderError, ctx)
        }
    }

    //更新笔记文件夹[state.user]
    async updateFolder(ctx, next) {
        try {
            let { id: folder_id, name, status } = ctx.request.body
            const { id: user_id } = ctx.state.user
            if (!status) {
                status = 1;
            }
            const result = await updateFolderService(user_id, folder_id, name, status)
            if (result != 0) {
                ctx.body = {
                    code: 0,
                    message: '更新笔记文件夹成功',
                    result: result,
                }
            } else {
                ctx.app.emit('error', noteFolderIsNotExist, ctx)
            }

        } catch (error) {
            console.error(error)
            ctx.app.emit('error', updateNoteFolderError, ctx)
        }
    }
}

module.exports = new NoteController()