export default [
    {
        "id": 1,
        "name": "博客笔记",
        "route": "",
        "icon": "el-icon-edit",
        "parent_id": 0,
        "children": [
            {
                "id": 2,
                "name": "我的笔记",
                "route": "/home/note",
                "icon": "",
                "parent_id": 1
            },
            {
                "id": 3,
                "name": "博客",
                "route": "/home/blog",
                "icon": "",
                "parent_id": 1
            }
        ]
    },
    {
        "id": 4,
        "name": "音乐",
        "route": "/home/music",
        "icon": "el-icon-mic",
        "parent_id": 0
    },
    {
        "id": 5,
        "name": "系统管理",
        "route": "",
        "icon": "el-icon-user",
        "parent_id": 0,
        "children": [
            {
                "id": 6,
                "name": "用户管理",
                "route": "/home/account",
                "icon": "el-icon-edit",
                "parent_id": 5
            },
            {
                "id": 7,
                "name": "菜单管理",
                "route": "/home/menu",
                "icon": "el-icon-edit",
                "parent_id": 5
            }
        ]
    }
]