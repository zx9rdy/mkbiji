<template>
    <el-col class="note-aside-copy" :span="3">
        <el-col class="note-aside" :span="3">
            <ul>
                <li @click="dialogFormVisible = true">
                    <i class="el-icon-folder-add"></i>
                    <span>新建文件夹</span>
                </li>
                <li :class="currentSelecedMenuId == 0 ? 'active' : ''" @mouseenter="enterHandle(0)" @mouseleave="leaveHandle" @click="getNote(0)">
                    <i class="el-icon-menu"></i>
                    <a>所有笔记</a>
                    <span>{{ allTotal }}</span>
                </li>
            </ul>
            <draggable v-model="noteMenu" tag="ul" animation="300" handle=".drag-allow" filter=".drag-forbid" ghost-class="visible" :move="dragMove" @sort="dragSort">
                <li v-for="m in noteMenu" :key="m.id" :class="currentSelecedMenuId == m.id ? 'active' : ''" @mouseenter="enterHandle(m.id)" @mouseleave="leaveHandle" @click="getNote(m.id)">
                    <i class="el-icon-folder" :class="m.default == '0' ? 'drag-forbid' : 'drag-allow'"></i>
                    <a>{{ m.name }}</a>
                    <span v-show="!(currentHoverMenuId == m.id)">{{ m.count }}</span>
                    <el-dropdown v-show="currentHoverMenuId == m.id" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{command: 'edit', id: m.id, name: m.name, status: m.status}">编辑</el-dropdown-item>
                            <el-dropdown-item :command="{command: 'delete', id: m.id}" v-show="m.default != 0">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </draggable>
            <el-dialog title="文件夹信息" :visible.sync="dialogFormVisible" append-to-body center>
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="文件夹名" prop="name">
                        <el-input v-model="form.name" maxlength="20" clearable show-word-limit autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公开文件夹">
                        <!-- 不公开后该文件夹下所有笔记都不公开，无论该文件夹内的笔记是否公开 -->
                        <el-checkbox v-model="form.checked"></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </div>
            </el-dialog>
        </el-col>
    </el-col>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import draggable from 'vuedraggable'
import {
    getNoteFolder,
    createNoteFolder,
    deleteNoteFolder,
    updateNoteFolder,
} from '@/api'

export default {
    name: 'NoteLeftMenu',
    components: {
        draggable,
    },
    data() {
        return {
            noteMenu: [], //二级菜单
            allTotal: 0, //所有笔记的总数
            currentHoverMenuId: 0, //当前鼠标经过的菜单id（这里只用来控制编辑文件夹的下拉菜单的显示，背景色在css里控制了）
            currentSelecedMenuId: 0, //当前被选中的菜单id
            dialogFormVisible: false, //控制编辑菜单的对话框是否弹出
            isEdit: false, //判断打开对话框是编辑还是新建文件夹
            editId: 0, // 编辑文件夹的id
            ///el-form
            form: {
                name: '', //文件夹名
                checked: true, //是否公开
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入文件夹标题',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    computed: {
        ...mapState('leftmenu', ['isCollapse']),
        ...mapState('note', ['folderId']),
    },
    watch: {
        isCollapse() {
            this.noteAsideCalc()
            return this.isCollapse
        },
    },
    mounted() {
        this.getNoteFolderList()
        this.noteAsideCalc()
        //监听窗口大小，发生变化时重新计算定位二级菜单
        window.addEventListener('resize', this.noteAsideCalc)
        this.$bus.$on('getNoteFolderList', this.getNoteFolderList)
    },
    methods: {
        ...mapMutations('note', ['setFolderIdMut', 'setCurrentPageMut']),
        getNoteFolderList() {
            getNoteFolder().then((data) => {
                if (data) {
                    this.noteMenu = data.result
                    let totalTem = 0
                    this.noteMenu.forEach((nm) => {
                        totalTem += nm.count
                    })
                    this.allTotal = totalTem
                    this.currentSelecedMenuId = this.folderId
                }
            })
        },
        //根据菜单栏是否展开计算定位二级菜单的位置和大小
        noteAsideCalc() {
            let aside = document.querySelector('.note-aside')
            let asideCopy = document.querySelector('.note-aside-copy')
            if (aside) {
                let leftmenuWidth = this.isCollapse ? 1 / 24 : 3 / 24
                aside.style.left =
                    document.body.clientWidth * leftmenuWidth + 20 + 'px'
                aside.style.width =
                    (document.body.clientWidth * (1 - leftmenuWidth) - 40) *
                        0.125 -
                    3 +
                    'px'
                asideCopy.style.width =
                    (document.body.clientWidth * (1 - leftmenuWidth) - 40) *
                        0.125 -
                    3 +
                    'px'
            }
        },
        //鼠标移入
        enterHandle(id) {
            this.currentHoverMenuId = id
        },
        //鼠标移出
        leaveHandle() {
            this.currentHoverMenuId = 0
        },
        //获取当前文件夹（菜单）内的笔记
        getNote(id) {
            this.currentSelecedMenuId = id
            this.setCurrentPageMut(1)
            this.setFolderIdMut(id)
            //我的笔记菜单内的路由跳转
            if (this.$route.path != '/home/note/list') {
                this.$router.push('/home/note/list')
            }
        },
        //下拉菜单的点击事件
        handleCommand(command) {
            if (command.command == 'edit') {
                this.isEdit = true
                this.dialogFormVisible = true
                this.form.name = command.name
                if (command.status == '0') {
                    this.form.checked = false
                } else {
                    this.form.checked = true
                }
                this.editId = command.id
            }
            if (command.command == 'delete') {
                this.$confirm(
                    '删除文件夹会删除该文件夹下的所有笔记，确定删除吗?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                )
                    .then(() => {
                        deleteNoteFolder({ id: command.id }).then((data) => {
                            if (data) {
                                this.getNoteFolderList()
                                this.$message.success(data.message)
                            }
                        })
                    })
                    .catch(() => {
                        this.$message.info('已取消删除')
                    })
            }
        },
        //只要发生拖拽行为就会立马高频调用的事件
        dragMove(e) {
            //如果是默认文件夹，不可移动至默认文件夹处
            if (e.relatedContext.element.default == 0) return false
            return true
        },
        //位置变化时的事件
        dragSort(e) {
            console.log('Sort')
            console.log(this.noteMenu[e.oldIndex].id)
            console.log(this.noteMenu[e.newIndex].id)
        },
        //提交笔记文件夹表单
        onSubmit() {
            if (this.isEdit) {
                updateNoteFolder({
                    id: this.editId,
                    name: this.form.name,
                    status: this.form.checked ? '1' : '0',
                }).then((data) => {
                    if (data) {
                        this.dialogFormVisible = false
                        this.getNoteFolderList()
                        this.$message.success(data.message)
                    }
                })
            } else {
                createNoteFolder({
                    name: this.form.name,
                    status: this.form.checked ? '1' : '0',
                }).then((data) => {
                    if (data) {
                        this.dialogFormVisible = false
                        this.getNoteFolderList()
                        this.$message.success(data.message)
                    }
                })
            }
            this.isEdit = false
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.noteAsideCalc)
        this.$bus.$off(['getNoteFolderList'])
    },
}
</script>

<style lang="less" scoped>
.note-aside-copy {
    height: calc(100vh - 180px);
    .note-aside {
        position: fixed;
        top: 80px;
        height: calc(100vh - 100px);
        box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.1);
        background-color: #fff;
        z-index: 100;
        overflow-x: hidden;
        overflow-y: auto;
        ul {
            white-space: nowrap;
            word-break: break-word;
            li {
                padding: 0 10px;
                height: 44px;
                line-height: 44px;
                display: flex;
                align-items: center;
                cursor: pointer;
                &:hover {
                    background-color: #e4e7ed;
                }
                i {
                    font-size: 20px;
                    margin-right: 10px;
                }
                a {
                    flex: 1;
                    display: inline-block;
                    margin-right: 10px;
                    font-size: 14px;
                    vertical-align: middle;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                span {
                    font-size: 12px;
                    color: #99a2aa;
                    text-align: center;
                    font-family: Arial;
                }
                .el-dropdown {
                    i {
                        //覆盖element ui的默认样式
                        margin-right: 0;
                    }
                }
                .drag-allow {
                    cursor: move !important;
                }
                .drag-forbid {
                    cursor: pointer !important;
                }
            }
        }
    }
}

//被选中的文件夹样式
.active {
    //防止被:hover的颜色覆盖
    background-color: #00a1d6 !important;
    color: #fff;
    span {
        color: #fff !important;
    }
}
</style>