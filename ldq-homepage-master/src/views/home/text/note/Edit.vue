<template>
    <div>
        <el-page-header @back="goBack" content="新建笔记">
        </el-page-header>
        <MarkDown @setValue="setMarkdown" :height="'calc(100vh - 264px)'">
            <template v-slot="{ vditor }">
                <div class="submit">
                    <el-input v-model="title" placeholder="标题" maxlength="100" clearable show-word-limit></el-input>
                    <el-checkbox v-model="checked">公开</el-checkbox>
                    <el-button @click="getMarkdown(vditor.getValue())">提交</el-button>
                </div>
            </template>
        </MarkDown>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MarkDown from '@/components/editor/MarkDown';
import { createNote, getNoteText, updateNote } from '@/api';

export default {
    name: 'EditIndex',
    components: {
        MarkDown,
    },
    data() {
        return {
            title: '', //标题
            checked: true, //是否公开
            id: 0, //笔记id
            isSubmit: false, //是否提交保存了
        };
    },
    computed: {
        ...mapState('note', ['folderId']),
    },
    mounted() {
        const { id } = this.$route.query;
        if (id) {
            this.id = id;
            this.setMarkdown();
        }
    },
    methods: {
        // 获取markdown，发送请求
        getMarkdown(Markdown) {
            if (!this.title) {
                this.$message.error('请输入标题');
                return;
            }

            if (this.id) {
                const updateParam = {
                    id: this.id,
                    title: this.title,
                    content: Markdown,
                    status: this.checked ? '1' : '0',
                };
                updateNote(updateParam).then((data) => {
                    if (data) {
                        this.isSubmit = true;
                        this.$message.success('更新成功');
                        this.$router.push('/home/note/list');
                    }
                });
            } else {
                const createParam = {
                    title: this.title,
                    content: Markdown,
                    folder_id: this.folderId,
                    status: this.checked ? '1' : '0',
                };
                createNote(createParam).then((data) => {
                    if (data) {
                        this.isSubmit = true;
                        this.$message.success('提交成功');
                        this.$bus.$emit('getNoteFolderList');
                        this.$router.push('/home/note/list');
                    }
                });
            }
        },
        //编辑器填充内容
        setMarkdown(vditor) {
            if (vditor && this.id) {
                getNoteText({ id: this.id }).then((data) => {
                    this.title = data.result.title;
                    if (data.result.status == '0') {
                        this.checked = false;
                    }
                    vditor.setValue(data.result.content);
                });
            }
        },
        //回到笔记列表
        goBack() {
            this.$router.push('/home/note/list');
        },
    },
    beforeRouteLeave(to, from, next) {
        if (!this.isSubmit) {
            this.$confirm('内容还未提交保存，确定离开吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    next();
                })
                .catch(() => {
                    next(false);
                });
        } else {
            next();
        }
    },
};
</script>

<style lang="less" scoped>
.el-page-header {
    padding: 10px;
}
.submit {
    display: flex;
    .el-input {
        flex: 1;
    }
    .el-checkbox {
        margin-left: 10px;
        padding-bottom: 5px;
        align-self: flex-end;
    }
    .el-button {
        margin-left: 20px;
    }
}
</style>>