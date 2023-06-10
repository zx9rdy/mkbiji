<template>
    <div>
        <el-row class="note-container">
            <NoteLeftMenu />
            <el-col :span="21">
                <div class="note-content">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import NoteLeftMenu from './NoteLeftMenu';

export default {
    name: 'NoteIndex',
    components: {
        NoteLeftMenu,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.note-container {
    position: relative;
    .note-content {
        margin-left: 20px;
        background-color: #fff;
    }
}
</style>