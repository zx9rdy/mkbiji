<template>
    <div>
        <div id="vditor" style="box-sizing: border-box;" />
        <slot :vditor="vditor"></slot>
    </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export default {
    name: 'MarkDown',

    props: ['height'],

    data() {
        return {
            vditor: '',
        };
    },

    mounted() {
        this.vditor = new Vditor('vditor', {
            //编辑器总高度
            height: this.height,
            //输入区域为空时的提示
            placeholder: '使用Markdown编写',
            //tab 键操作字符串，支持 \t 及任意字符串
            tab: '\t',
            //工具栏
            toolbar: [
                // 'emoji',
                'headings',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'list',
                'ordered-list',
                'check',
                'outdent',
                'indent',
                '|',
                'quote',
                'line',
                'code',
                'inline-code',
                'insert-before',
                'insert-after',
                '|',
                // 'upload',
                // 'record',
                'table',
                '|',
                'undo',
                'redo',
                '|',
                'fullscreen',
                'edit-mode',
                {
                    name: 'more',
                    toolbar: [
                        'both',
                        'code-theme',
                        'content-theme',
                        'export',
                        'outline',
                        'preview',
                        // 'devtools',
                        // 'info',
                        'help',
                    ],
                },
            ],
            toolbarConfig: {
                //是否固定工具栏
                pin: true,
            },
            counter: {
                //是否启用计数器
                enable: true,
            },
            cache: {
                //是否使用 localStorage 进行缓存
                enable: false,
            },
            preview: {
                //预览 debounce 毫秒间隔
                delay: 200,
                hljs: {
                    //是否启用代码高亮
                    enable: true,
                    //是否启用行号
                    lineNumber: true,
                },
            },
            fullscreen: {
                //全屏层级(css的z-index值)
                index: 1000,
            },
            outline: {
                //初始化是否展现大纲
                enable: true,
            },
            //编辑器异步渲染完成后的回调方法
            after: () => {
                this.vditor.focus();
                this.$emit('setValue', this.vditor);
            },
        });
    },
};
</script>

<style lang="less" scoped>
</style>