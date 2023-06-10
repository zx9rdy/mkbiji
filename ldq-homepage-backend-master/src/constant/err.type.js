module.exports = {
    paramFormatError: {
        code: 10001,
        message: '参数格式错误',
        result: '',
    },
    ///用户注册系
    userNameExist: {
        code: 10002,
        message: '用户名已存在',
        result: '',
    },
    userMailExist: {
        code: 10003,
        message: '该邮箱已被注册',
        result: '',
    },
    userRegisterError: {
        code: 10004,
        message: '用户注册失败',
        result: '',
    },
    ///用户登录系
    userIsNotExist: {
        code: 10005,
        message: '用户不存在',
        result: '',
    },
    userPasswordError: {
        code: 10006,
        message: '密码错误',
        result: '',
    },
    userLoginError: {
        code: 10007,
        message: '用户登录失败',
        result: '',
    },
    ///用户信息更改系
    userUpdateError: {
        code: 10008,
        message: '用户信息修改错误',
        result: '',
    },
    ///用户角色权限系
    hasNotAdminPermission: {
        code: 10009,
        message: '当前用户没有管理员权限',
        result: '',
    },
    ///菜单系
    getMenuListError: {
        code: 10100,
        message: '获取菜单错误',
        result: '',
    },
    emptyMenu: {
        code: 10101,
        message: '菜单为空',
        result: '',
    },
    ///笔记系
    getNoteFolderError: {
        code: 10200,
        message: '获取笔记文件夹错误',
        result: '',
    },
    getNoteListError: {
        code: 10201,
        message: '获取笔记列表错误',
        result: '',
    },
    getNoteTextError: {
        code: 10202,
        message: '获取笔记内容错误',
        result: '',
    },
    deleteNoteError: {
        code: 10203,
        message: '删除笔记错误',
        result: '',
    },
    noteIsNotExist: {
        code: 10204,
        message: '该笔记不存在或已被删除',
        result: '',
    },
    createNoteError: {
        code: 10205,
        message: '创建笔记错误',
        result: '',
    },
    updateNoteError: {
        code: 10206,
        message: '更新笔记错误',
        result: '',
    },
    createNoteFolderError: {
        code: 10207,
        message: '创建笔记文件夹错误',
        result: '',
    },
    deleteNoteFolderError: {
        code: 10208,
        message: '删除笔记文件夹错误',
        result: '',
    },
    updateNoteFolderError: {
        code: 10209,
        message: '更新笔记文件夹错误',
        result: '',
    },
    noteFolderIsNotExist: {
        code: 10210,
        message: '该笔记文件夹不存在或已被删除',
        result: '',
    },
    canNotDefaultNoteFolder: {
        code: 10211,
        message: '不可以删除默认文件夹',
        result: '',
    },
    ///token验证
    authTokenError: {
        code: 10300,
        message: '请先登录',
        result: '',
    },
    ///博客系
    blogIsNotExist: {
        code: 10400,
        message: '该博客不存在或已被删除',
        result: '',
    },
    getBlogError: {
        code: 10401,
        message: '获取博客错误',
        result: '',
    },
}