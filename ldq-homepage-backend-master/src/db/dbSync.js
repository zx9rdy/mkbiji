const User = require('../model/user.model')
const Menu = require('../model/menu.model')
const Role = require('../model/role.model')
const RoleMenu = require('../model/role_menu.model')
const NoteFolder = require('../model/note_folder.model')
const TextContent = require('../model/text_content.model')
const Note = require('../model/note.model')

dbInit()

async function dbInit() {
    // 模型同步。如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
    await Role.sync()
    await Menu.sync()
    await RoleMenu.sync()
    await User.sync()
    await NoteFolder.sync()
    await TextContent.sync()
    await Note.sync()

    // 初始化数据
    await Role.bulkCreate([
        { id: 1, name: '超级管理员' },
        { id: 2, name: '管理员' },
        { id: 3, name: '普通用户' },
    ])
    await Menu.bulkCreate([
        { id: 1, name: '博客笔记', route: 'text', icon: 'el-icon-edit', parent_id: '0' },
        { id: 2, name: '我的笔记', route: '/home/note', icon: '', parent_id: '1' },
        { id: 3, name: '博客', route: '/home/blog', icon: '', parent_id: '1' },
        { id: 4, name: '音乐', route: '/home/music', icon: 'el-icon-mic', parent_id: '0' },
        { id: 5, name: '系统管理', route: 'sys', icon: 'el-icon-user', parent_id: '0' },
        { id: 6, name: '用户管理', route: '/home/account', icon: '', parent_id: '5' },
        { id: 7, name: '菜单管理', route: '/home/menu', icon: '', parent_id: '5' },
    ])
    await RoleMenu.bulkCreate([
        { role_id: 1, menu_id: 1 },
        { role_id: 1, menu_id: 2 },
        { role_id: 1, menu_id: 3 },
        { role_id: 1, menu_id: 4 },
        { role_id: 1, menu_id: 5 },
        { role_id: 1, menu_id: 6 },
        { role_id: 1, menu_id: 7 },
        { role_id: 2, menu_id: 1 },
        { role_id: 2, menu_id: 2 },
        { role_id: 2, menu_id: 3 },
        { role_id: 2, menu_id: 4 },
        { role_id: 2, menu_id: 5 },
        { role_id: 2, menu_id: 6 },
        { role_id: 2, menu_id: 7 },
        { role_id: 3, menu_id: 1 },
        { role_id: 3, menu_id: 2 },
        { role_id: 3, menu_id: 3 },
        { role_id: 3, menu_id: 4 },
    ])
}
