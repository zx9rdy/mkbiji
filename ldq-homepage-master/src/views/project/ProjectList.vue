<template>
    <div class="project-list">
        <div class="card-container" v-for="(p,index) in project" :key="index" @click="toProject(p.route)">
            <el-card shadow="hover" class="card-box">
                <div slot="header">
                    <el-tooltip :content="p.title" placement="top" effect="light" popper-class="global-popper" v-ak-tooltip-auto-show>
                        <div class="title">{{p.title}}</div>
                    </el-tooltip>
                </div>
                <el-tooltip :content="p.detail" placement="top" effect="light" popper-class="global-popper" v-ak-tooltip-auto-show-4row>
                    <div class="detail">{{p.detail}}</div>
                </el-tooltip>
            </el-card>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import project from './project'

export default {
    name: 'ProjectList',
    data() {
        return {
            project,
        }
    },
    methods: {
        toProject(route) {
            this.$router.push(route)
        },
    },
    //局部指令。指令配置对象中的函数的this是window
    directives: {
        'ak-tooltip-auto-show-4row': {
            inserted: function (el, binding, vnode) {
                el.addEventListener('mouseenter', function () {
                    let defalutSilent = !!Vue.config.silent
                    Vue.config.silent = true //不加这句的话控制台一直要报说你修改了props参数的错，很难看
                    vnode.componentInstance.disabled = true
                    const range = document.createRange()
                    range.setStart(el, 0)
                    range.setEnd(el, el.childNodes.length)
                    const rangeHeight = Math.round(
                        range.getBoundingClientRect().height
                    )
                    if (rangeHeight > 90) {
                        //此处的90为我查看range.getBoundingClientRect().height得到的四行文字时的高度
                        vnode.componentInstance.disabled = false
                    }
                    Vue.config.silent = defalutSilent
                })
            },
        },
    },
}
</script>

<style lang="less" scoped>
.project-list {
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(auto-fill, ~'min(20%, 400px)');
    @media screen and (max-width: 1200px) {
        grid-template-columns: repeat(auto-fill, 25%);
    }
    @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, 33%);
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, 50%);
    }
    @media screen and (max-width: 400px) {
        grid-template-columns: repeat(auto-fill, 100%);
    }
    .card-container {
        padding: 10px;
        .card-box {
            cursor: pointer;
            .title {
                height: 24px;
                font-size: 17px;
                font-weight: 500;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:hover {
                    color: #1890ff;
                    transition: 0.2s;
                }
            }
            .detail {
                height: 96px;
                line-height: 1.5;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4; //超过4行则溢出显示省略号
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>