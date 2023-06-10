<template>
    <div class="gcode-root">
        <div id="area" style="width: 1000px;height:800px;"></div>
    </div>
</template>

<script>
// import data from 'anhui_340000_full.json'
import axios from 'axios'
import * as echarts from 'echarts'

export default {
    name: 'GreenCodeIndex',
    data() {
        return {}
    },
    mounted() {
        const myChart = echarts.init(document.getElementById('area'))
        axios.get('anhui_340000_full.json').then((response) => {
            echarts.registerMap('anhui', response.data)
            // 注册矢量地图数据
            var option = {
                visualMap: {
                    // 视觉映射组件
                    show: true,
                    inverse: true, // 反转
                    top: '70%',
                    bottom: '2%',
                    left: '2%',
                    textStyle: {
                        fontsize: 12,
                    },
                    min: 0,
                    max: 2000,
                    //   splitList: [
                    //     // 自定义范围
                    //     { start: 0, end: 100 },
                    //     { start: 100, end: 300 },
                    //     { start: 300, end: 500 },
                    //     { start: 500, end: 1000 },
                    //     { start: 1000 },
                    //   ],
                    inRange: {
                        color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026',
                        ],
                    },
                },
                tooltip: {
                    // 悬浮框
                    trigger: 'item', // 触发条件
                    backgroundColor: 'RGBA(136, 123, 135, 0.8)',
                    //   formatter: '{b}<br/>自定义{c}', // 自定义显示数据
                    formatter: '{b}', // 自定义显示数据
                    textStyle: {
                        color: '#ffffff',
                    },
                    showDelay: 0,
                    transitionDuration: 0.2,
                },
                series: [
                    {
                        type: 'map',
                        map: 'anhui',
                        zoom: 1.2,
                        top: '10%',
                        x: 'center',
                        label: {
                            show: true, // 显示
                        },
                        itemStyle: {
                            normal: {
                                // 静态的时候显示的默认样式
                                areaColor: '#F3D7D9', // 地图颜色
                                borderColor: '#886364', // 边框颜色
                            },
                            emphasis: {
                                // 鼠标移入动态的时候显示的默认样式
                                borderWidth: 2, // 边框宽度
                                areaColor: '#ffffff', // 地图颜色
                            },
                        },
                        // 数据
                        data: [
                            { name: '宣城市', value: '100' },
                            { name: '芜湖市', value: '200' },
                            { name: '蚌埠市', value: '300' },
                            { name: '池州市', value: '400' },
                            { name: '滁州市', value: '500' },
                            { name: '安庆市', value: '600' },
                            { name: '马鞍山市', value: '700' },
                            { name: '淮南市', value: '800' },
                            { name: '亳州市', value: '900' },
                            { name: '六安市', value: '1000' },
                            { name: '淮北市', value: '1100' },
                            { name: '黄山市', value: '1200' },
                            { name: '宿州市', value: '1300' },
                            { name: '阜阳市', value: '1400' },
                            { name: '铜陵市', value: '1500' },
                            { name: '合肥市', value: '1600' },
                        ],
                    },
                ],
            }
            myChart.setOption(option)
        })
    },
    methods: {},
    beforeDestroy() { },
}
</script>

<style lang="less" scoped>
</style>