<template>
    <div>
        <el-page-header @back="goBack" content="笔记内容">
        </el-page-header>
        <div class="text-container">
            <div class="title">
                <div class="title-content">
                    <h2>{{ title }}</h2>
                    <div>{{ updataTime | dataFormat }}</div>
                </div>
                <el-button v-show="btnVisiable" type="text" @click="closeOutline">关闭大纲</el-button>
                <el-button v-show="!btnVisiable" type="text" @click="openOutline">展示大纲</el-button>
            </div>
            <hr>
            <div class="content-container">
                <div id="outline"></div>
                <div id="preview" class="preview"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { getNoteText } from '@/api';

export default {
    name: 'DetailIndex',
    data() {
        return {
            title: '', //标题
            text: '', //内容
            updataTime: '', //最后更新时间
            btnVisiable: true, //关闭展示大纲按钮的显示
        };
    },
    mounted() {
        if (this.$route.query.id) {
            //获取笔记内容
            getNoteText(this.$route.query).then((data) => {
                if (data) {
                    this.title = data.result.title;
                    this.text = data.result.content;
                    this.updataTime = data.result.update_time;
                    Vditor.preview(
                        document.getElementById('preview'),
                        this.text,
                        {
                            hljs: {
                                lineNumber: true,
                                enable: true,
                            },
                            anchor: 1,
                            after() {
                                if (window.innerWidth <= 768) {
                                    return;
                                }
                                const outlineElement =
                                    document.getElementById('outline');
                                Vditor.outlineRender(
                                    document.getElementById('preview'),
                                    outlineElement
                                );
                                if (outlineElement.innerText.trim() !== '') {
                                    outlineElement.style.display = 'block';
                                    initOutline();
                                }
                            },
                        }
                    );
                }
            });
        } else {
            this.$message.warning('没有id参数');
        }

        //初始化大纲
        const initOutline = () => {
            const headingElements = [];
            Array.from(document.getElementById('preview').children).forEach(
                (item) => {
                    if (
                        item.tagName.length === 2 &&
                        item.tagName !== 'HR' &&
                        item.tagName.indexOf('H') === 0
                    ) {
                        headingElements.push(item);
                    }
                }
            );

            let toc = [];
            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                toc = [];
                headingElements.forEach((item) => {
                    toc.push({
                        id: item.id,
                        offsetTop: item.offsetTop,
                    });
                });

                const currentElement = document.querySelector(
                    '.vditor-outline__item--current'
                );
                for (let i = 0, iMax = toc.length; i < iMax; i++) {
                    if (scrollTop < toc[i].offsetTop - 30) {
                        if (currentElement) {
                            currentElement.classList.remove(
                                'vditor-outline__item--current'
                            );
                        }
                        let index = i > 0 ? i - 1 : 0;
                        document
                            .querySelector(
                                'span[data-target-id="' + toc[index].id + '"]'
                            )
                            .classList.add('vditor-outline__item--current');
                        break;
                    }
                }
            });
        };
    },
    methods: {
        //返回笔记列表
        goBack() {
            this.$router.push('/home/note/list');
        },
        //关闭大纲
        closeOutline() {
            document.getElementById('outline').style.display = 'none';
            this.btnVisiable = false;
        },
        //展示大纲
        openOutline() {
            document.getElementById('outline').style.display = 'block';
            this.btnVisiable = true;
        },
    },
};
</script>

<style lang="less" scoped>
.el-page-header {
    padding: 10px;
}
.text-container {
    padding: 20px;
    .title {
        display: flow-root;
        .title-content {
            float: left;
            h3,
            div {
                padding: 5px 0;
            }
        }
        .el-button {
            float: right;
        }
    }
    .content-container {
        position: relative;
        display: flex;
        padding: 5px 0;
        .preview {
            flex: 1;
        }
    }
}
</style>