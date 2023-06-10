/**
 * ak-tooltip-auto-show
 * element ui的el-tooltip组件专用命令，当文本没有被折叠时，不显示tooltip
 */
import Vue from 'vue'
import { getStyle } from 'element-ui/src/utils/dom'

export default {
    inserted: function (el, binding, vnode) {
        el.addEventListener('mouseenter', function () {
            let defalutSilent = !!Vue.config.silent
            Vue.config.silent = true //不加这句的话控制台一直要报说你修改了props参数的错，很难看
            vnode.componentInstance.disabled = true
            const range = document.createRange()
            range.setStart(el, 0)
            range.setEnd(el, el.childNodes.length)
            const rangeWidth = Math.round(range.getBoundingClientRect().width)
            const padding = (parseInt(getStyle(el, 'paddingLeft'), 10) || 0) + (parseInt(getStyle(el, 'paddingRight'), 10) || 0)
            if (rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) {
                vnode.componentInstance.disabled = false
            }
            Vue.config.silent = defalutSilent
        })
    },
}
