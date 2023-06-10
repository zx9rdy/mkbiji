<template>
    <div>
        <el-table :data="tableData" @cell-click="toDetail" style="width: 100%">
            <el-table-column type="index" min-width="4%">
            </el-table-column>
            <el-table-column label="标题" prop="title" min-width="46%" :class-name="`table-column-name`" show-overflow-tooltip>
                <!-- <template slot-scope="scope">
                    // 点击标题文字才可以进入笔记详情，而非点击标题的table-cell就可以
                    <a @click="toDetail(scope.row.id)">{{ scope.row.title }}</a>
                </template> -->
            </el-table-column>
            <el-table-column label="最后修改时间" prop="update_time" min-width="15%" :formatter="dateFormatter" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="right" min-width="35%">
                <template slot="header" slot-scope="scope">
                    <el-input clearable v-model="keyword" size="mini" placeholder="输入关键字搜索标题" />
                    <el-button v-show="folderId != 0" size="mini" type="success" round @click="toEdit(scope.$index, scope)">新建</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定删除吗？" @confirm="deleteConfirm(scope.row)" style="margin-left: 10px;">
                        <el-button size="mini" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapState, mapMutations } from 'vuex';
import { getNoteList, deleteNote } from '@/api';

export default {
    name: 'NoteList',
    data() {
        return {
            tableData: [], //表格数据
            keyword: '', //搜索关键字
            total: 0, //当前文件夹的总笔记数
            timer: null, //防抖计时器
        };
    },
    computed: {
        ...mapState('note', [
            'folderId',
            'currentPage',
            'pageSize',
            'keywordTem',
            'isCurKeyword',
        ]),
    },
    watch: {
        /// 监听getNote的参数，实时即刻展示表格数据（笔记）
        folderId() {
            this.getNoteList();
        },
        pageSize() {
            this.getNoteList();
        },
        currentPage() {
            this.getNoteList();
        },
        keyword() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (this.isCurKeyword) {
                    // 输入搜索关键字时将currentPage重置为1
                    if (this.currentPage == 1) {
                        this.getNoteList();
                    } else {
                        this.setCurrentPageMut(1);
                    }
                } else {
                    this.setIsCurKeywordMut(true);
                }
            }, 200);
        },
    },
    mounted() {
        // 如果keywordTem为空【this.keyword = this.keywordTem】这句话不会触发监听，所以需要追加将isCurKeyword设为true
        if (this.keywordTem) {
            this.keyword = this.keywordTem;
        } else {
            this.setIsCurKeywordMut(true);
        }
        this.getNoteList();
    },
    methods: {
        ...mapMutations('note', [
            'setFolderIdMut',
            'setCurrentPageMut',
            'setPageSizeMut',
            'setKeywordTemMut',
            'setIsCurKeywordMut',
        ]),
        ///el-table
        // 跳转到笔记详情
        toDetail(row, column) {
            if (column.property == 'title') {
                this.$router.push({
                    name: 'NoteDetail',
                    query: {
                        id: row.id,
                    },
                });
            }
        },
        // 编辑笔记
        handleEdit(row) {
            this.$router.push({
                name: 'NoteEdit',
                query: {
                    id: row.id,
                },
            });
        },
        // 删除笔记
        deleteConfirm(row) {
            deleteNote({ id: row.id }).then((data) => {
                if (data) {
                    this.$message.success('删除笔记成功');
                    this.$bus.$emit('getNoteFolderList');
                    this.getNoteList();
                }
            });
        },
        // 跳转到新建笔记
        toEdit() {
            this.$router.push({
                name: 'NoteEdit',
            });
        },
        // 格式化日期
        dateFormatter(row, column, cellValue) {
            return dayjs(cellValue).format('YYYY-MM-DD HH:mm');
        },
        // 获取笔记列表
        getNoteList() {
            const param = {
                pageSize: this.pageSize,
                currentPage: this.currentPage,
                keyword: this.keyword,
            };
            if (this.folderId) {
                param.folder_id = this.folderId;
            }
            getNoteList(param).then((data) => {
                if (data) {
                    this.total = data.result.total;
                    this.tableData = data.result.list;
                }
            });
        },

        ///el-pagination
        handleSizeChange(pageSize) {
            this.setPageSizeMut(pageSize);
        },
        handleCurrentChange(currentPage) {
            this.setCurrentPageMut(currentPage);
        },
    },
    beforeDestroy() {
        // 离开组件前才将keyword保存到vuex中，以及将isCurKeyword设为false
        this.setKeywordTemMut(this.keyword);
        this.setIsCurKeywordMut(false);
    },
};
</script>

<style lang="less" scoped>
.el-input {
    margin-right: 10px;
    flex: 1;
}
:deep(.table-column-name) {
    cursor: pointer;
    &:hover {
        color: #409eff;
    }
}
// 重写element-ui的样式
:deep(.el-table th.el-table__cell .cell) {
    display: flex;
}
</style>>