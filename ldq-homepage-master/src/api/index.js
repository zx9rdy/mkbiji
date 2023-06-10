import ldqHttp from "./ldqHttp";

export const userRegister = async (param) => await ldqHttp.post('/user/register', param)

export const userLogin = async (param) => await ldqHttp.post('/user/login', param)

export const getMenuList = async () => await ldqHttp.get('/menu/menuList')

export const getNoteFolder = async () => await ldqHttp.get('/note/folder')

export const createNoteFolder = async (param) => await ldqHttp.post('/note/createfolder', param)

export const deleteNoteFolder = async (param) => await ldqHttp.post('/note/deletefolder', param)

export const updateNoteFolder = async (param) => await ldqHttp.post('/note/updatefolder', param)

export const getNoteList = async (param) => await ldqHttp.post('/note/noteList', param)

export const getNoteText = async (params) => await ldqHttp.get('/note/text', { params })

export const createNote = async (param) => await ldqHttp.post('/note/createNote', param)

export const deleteNote = async (param) => await ldqHttp.post('/note/deleteNote', param)

export const updateNote = async (param) => await ldqHttp.post('/note/updateNote', param)

export const getBlog = async (params) => await ldqHttp.get('/blog/getBlog', { params })