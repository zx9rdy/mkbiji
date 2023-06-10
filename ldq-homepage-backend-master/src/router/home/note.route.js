const Router = require('koa-router')
const { auth } = require('../../middleware/auth.middleware')
const {
    listParamValid, textParamValid, deleteNoteParamValid, createNoteParamValid, updateNoteParamValid,
    createFolderParamValid, updateFolderParamValid
} = require('../../middleware/note.middleware')
const {
    getNoteFolder, getNoteList, getNoteText, deleteNote, createNote, updateNote,
    createFolder, deleteFolder, updateFolder
} = require('../../controller/note.controller')

const router = new Router({
    prefix: '/note',
})

// 获取笔记文件夹接口
router.get('/folder', auth, getNoteFolder)
// 创建笔记文件夹接口
router.post('/createFolder', auth, createFolderParamValid, createFolder)
// 删除笔记文件夹接口
router.post('/deleteFolder', auth, deleteNoteParamValid, deleteFolder)
// 更新笔记文件夹接口
router.post('/updateFolder', auth, updateFolderParamValid, updateFolder)

// 获取笔记列表接口
router.post('/noteList', auth, listParamValid, getNoteList)
// 获取笔记内容接口
router.get('/text', auth, textParamValid, getNoteText)
// 删除笔记接口
router.post('/deleteNote', auth, deleteNoteParamValid, deleteNote)
// 创建笔记接口
router.post('/createNote', auth, createNoteParamValid, createNote)
// 更新笔记接口
router.post('/updateNote', auth, updateNoteParamValid, updateNote)

module.exports = router