<template>
    <div>
        <div id="echart1" style="width: 800px;height:600px;" class="p-10 mx-auto"></div>
        <div class="echart2-box p-10 mx-auto">
            <div id="echart2" style="width: 100%; height: 100%"></div>
        </div>
        <div id="echart3" style="width: 600px; height: 400px" class="p-10 mx-auto"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
    name: 'EchartsIndex',
    data() {
        return {}
    },
    mounted() {
        this.initEchart1()
        this.initEchart2()
        this.initEchart3()
    },
    methods: {
        initEchart1() {
            const echart1 = echarts.init(document.getElementById('echart1'))

            //json数据来自阿里的数据化可视平台：http://datav.aliyun.com/portal/school/atlas/area_selector
            // axios.get('https://geo.datav.aliyun.com/areas_v3/bound/340000_full.json').then((response) => { //阿里云不允许在非本地环境调用这个接口，所以得自己下载
            axios.get('anhui_340000_full.json').then((response) => {
                // 注册矢量地图数据（这里用的是json数据，也可以用svg）
                echarts.registerMap('安徽省', response.data)

                //配置项
                const option = {
                    title: {
                        text: '安徽省',
                        left: 'center',
                    },
                    // 视觉映射组件。此例中就是左下角那个东西
                    visualMap: {
                        type: 'continuous', //类型为连续型
                        show: true, //是否显示 visualMap 组件,如果设为false，不会显示，但是数据映射的功能还存在。默认为true
                        inverse: true, // 是否反转 visualMap 组件。默认为false
                        min: 0, //指定 visualMapContinuous 组件的允许的最小值。'min' 必须用户指定。[visualMap.min, visualMax.max] 形成了视觉映射的『定义域』。
                        max: 1600, //指定 visualMapContinuous 组件的允许的最大值。'max' 必须用户指定。[visualMap.min, visualMax.max] 形成了视觉映射的『定义域』。
                        inRange: { //定义 在选中范围中 的视觉元素
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                        },
                        // type: 'piecewise', //类型为分段型
                        // pieces: [ // type='continuous'时才可以使用，对应continuous类型的inRange
                        //     // 自定义范围
                        //     { min: 0, max: 100 },
                        //     { min: 100, max: 300 },
                        //     { min: 300, max: 500 },
                        //     { min: 500, max: 1000 },
                        //     { min: 1000 },
                        // ],
                    },
                    tooltip: {
                        trigger: 'item', //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
                        backgroundColor: 'RGBA(136, 123, 135, 0.8)',
                        formatter: '{b}<br/>自定义数据：{c}', // 自定义显示数据
                        textStyle: {
                            color: '#ffffff',
                        },
                    },
                    series: [
                        {
                            type: 'map',
                            map: '安徽省', //使用 registerMap 注册的地图名称。必填项，必须和注册时的名字一致
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
                            zoom: 1.2, //当前视角的缩放比例
                            label: { //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                                show: true, //显示地名
                            },
                            //鼠标移入动态的时候显示的默认样式
                            emphasis: {
                                itemStyle: {
                                    borderWidth: 1, // 边框宽度。默认为0
                                    areaColor: '#ffffff', // 地图颜色
                                }
                            },
                            // 静态的时候显示的默认样式
                            itemStyle: {
                                areaColor: '#F3D7D9', // 地图颜色
                                borderColor: '#886364', // 边框颜色
                            },
                        },
                    ],
                }
                echart1.setOption(option)
            })
        },
        initEchart2() {
            // 初始化echarts实例
            const echart2 = echarts.init(document.getElementById('echart2'))

            //配置项
            const baseOption = {
                //标题组件，包含主标题和副标题。
                title: {
                    text: 'XX市GDP数据', //主标题文本，支持使用 \n 换行
                    link: 'liudongqing.com', //主标题文本超链接
                    subtext: '我是副标题', //副标题文本，支持使用 \n 换行
                    left: 'center', //title 组件离容器左侧的距离。除了数值和百分比，还可以设置为'left', 'center', 'right'
                },
                //提示框组件。就是鼠标移到图上后出现的提示信息
                tooltip: {
                    //触发类型。'axis'代表坐标轴触发,主要在柱状图、折线图等会使用类目轴的图表中使用。默认自动选择类目轴的那条坐标轴。
                    //如此例中现在因为此处设置了'axis'触发，xAxis.axisPointer.show 就已经自动被设为true了（y轴的还是flase的）
                    trigger: 'axis',
                    axisPointer: {
                        //坐标轴指示器配置项
                        //指示器类型。'cross'代表十字准星指示器，其实是种简写，表示启用两个正交的轴的 axisPointer。
                        //那么此时 xAxis.axisPointer.show 和 yAxis.axisPointer.show 就都自动被设为true了 （type都都是默认的 line）
                        type: 'cross',
                        crossStyle: {
                            //axisPointer.type 为 'cross' 时有效
                            color: '#999', //线的颜色
                        },
                    },
                },
                //工具栏
                toolbox: {
                    feature: {
                        //工具配置项。指定工具栏的工具
                        saveAsImage: {
                            //保存为图片
                            title: '下载图片', //在鼠标 hover 的时候显示的工具 icon 的标题。saveAsImage的默认标题为 '保存为图片'
                            // icon: 'image://https://liudongqing.com/img/logo.a88d6ea1.png', //'image://url'设置为图片，其中 URL 为图片的链接
                            // 也可以通过 'path://' 将图标设置为任意的矢量路径。
                            icon: 'path://M502.010485 765.939573c3.773953 3.719718 8.686846 5.573949 13.596669 5.573949 0.075725 0 0.151449-0.010233 0.227174-0.011256 0.329505 0.016373 0.654916 0.050142 0.988514 0.050142 0.706081 0 1.400906-0.042979 2.087545-0.116657 4.352121-0.366344 8.607028-2.190899 11.961426-5.496178l335.053985-330.166675c7.619538-7.509021 7.709589-19.773346 0.200568-27.393907s-19.774369-7.711636-27.39493-0.201591L536.193005 706.304358 536.193005 50.019207c0-10.698666-8.67252-19.371186-19.371186-19.371186s-19.371186 8.67252-19.371186 19.371186l0 657.032164-306.881342-302.44838c-7.618515-7.509021-19.883863-7.419993-27.393907 0.199545-7.509021 7.619538-7.419993 19.884886 0.199545 27.393907L502.010485 765.939573z M867.170139 711.020776c-10.698666 0-19.371186 8.67252-19.371186 19.371186l0 165.419494c0 13.054317-10.620895 23.675212-23.676236 23.675212L205.182103 919.486668c-13.054317 0-23.676236-10.620895-23.676236-23.675212L181.505867 730.391962c0-10.698666-8.67252-19.371186-19.371186-19.371186s-19.371186 8.67252-19.371186 19.371186l0 165.419494c0 34.416857 28.000728 62.416562 62.417585 62.416562l618.941638 0c34.417881 0 62.417585-27.999704 62.417585-62.416562L886.540302 730.391962C886.541325 719.693296 877.868805 711.020776 867.170139 711.020776z',
                            excludeComponents: ['toolbox'], //保存为图片时忽略的组件列表，默认忽略工具栏。
                        },
                    },
                    top: 20, //工具栏组件离容器上侧的距离。除了数值和百分比，top的值还可以是'top', 'middle', 'bottom'
                    right: 0, //工具栏组件离容器右侧的距离。单位为px，但如果写的是'20%'这种百分值则是相对于容器高宽的百分比
                    itemSize: 25, //工具栏 icon 的大小。默认值为15
                },
                //图例组件。就是类目的那个标记
                legend: {
                    bottom: 0, //图例组件离容器下侧的距离
                },
                //直角坐标系内的绘图网格。单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴
                grid: {},
                //直角坐标系 grid 中的 x 轴
                xAxis: [
                    {
                        name: '年份', //坐标轴名称
                        type: 'category', //坐标轴类型。xAxis的默认类型是'category'。'category' 为类目轴，适用于离散的类目数据
                        //类目数据，在类目轴（type: 'category'）中有效。
                        //如果没有设置 xAxis.type，但是设置了 xAxis.data，则认为 xAxis.type 是 'category'
                        //如果设置了 xAxis.type 是 'category'，但没有设置 xAxis.data，则 xAxis.data 的内容会自动从 series.data 中获取
                        data: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
                        axisPointer: {
                            //坐标轴指示器配置项
                            type: 'shadow', //指示器类型。'shadow'代表阴影指示器。坐标轴中的 axisPointer 配置优先级高于 tooltip 中的
                        },
                    },
                ],
                //直角坐标系 grid 中的 y 轴
                yAxis: [
                    {
                        name: '亿元', //坐标轴名称
                        type: 'value', //坐标轴类型。yAxis的默认类型是'value'。'value' 为数值轴，适用于连续数据
                        //注意因为 yAxis.type 是 'value'，所以yAxis并没有data，因为给了也无效，只有category类型时data才有效
                    },
                ],
                //系列
                series: [
                    {
                        name: 'GDP', //系列名称
                        type: 'bar', //柱状图
                        //系列中的数据内容数组。特别地，当只有一个轴为类目轴（axis.type 为 'category'）的时候，数据可以简化用一个一维数组表示
                        data: [136.51, 201.29, 240.19, 287.25, 325.27, 365.19, 429.18, 465.66, 121.34, 102.9, 120.63],
                        // 如果 xAxis.data 没有设置值，此例也可以用如下的二维数组来设置值，效果是一样的
                        // data: [
                        //     [2011, 136.51],
                        //     [2012, 201.29],
                        //     [2013, 240.19],
                        //     [2014, 287.25],
                        //     [2015, 325.27],
                        //     [2016, 365.19],
                        //     [2017, 429.18],
                        //     [2018, 465.66],
                        //     [2019, 121.34],
                        //     [2020, 102.9],
                        //     [2021, 120.63],
                        // ],
                        itemStyle: {
                            //图形样式
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                //柱条的颜色
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' },
                            ]),
                        },
                        //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                        label: {
                            show: true, //是否显示标签。默认为false
                            position: 'top', //标签的位置。默认值为 'inside'
                        },
                    },
                ],
            }

            //响应式配置项。媒体查询到匹配宽度时，会应用对应的option。如果有重复的配置项，则baseOption中的配置会被覆盖，不重复的则合并
            var media = [
                {
                    query: {
                        maxWidth: 500, // 当容器宽度小于 500 时（注意是容器宽度，不是视窗口的宽度！）
                    },
                    option: {
                        title: {
                            text: '容器宽度小于500时的标题',
                        },
                    },
                },
                //不写query表示都不匹配时的默认配置项。可以省略不写，但建议直接设为baseOption，这样反复缩小放大窗口时不会出bug
                {
                    option: baseOption,
                }
            ]

            // 使用指定的配置项和数据显示图表
            echart2.setOption({ baseOption, media })

            // 自适应
            window.addEventListener('resize', () => {
                echart2.resize()
            })
        },
        initEchart3() {
            // 初始化echarts实例
            const echart3 = echarts.init(document.getElementById('echart3'))

            //配置项
            const option = {
                title: {
                    text: 'XX市城乡居民收入',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999',
                        },
                    },
                },
                legend: {
                    bottom: 0,
                },
                // 有一个x轴
                xAxis: [
                    {
                        type: 'category',
                        data: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                ],
                // 有两个y轴（注意value类型的坐标轴上的刻度是自动生成的，一般也建议自动生成不用自己配置）
                yAxis: [
                    {
                        type: 'value',
                        name: '元',
                    },
                    {
                        type: 'value',
                        name: '增幅',
                    },
                ],
                //在一个grid区域中展示多个系列的数据
                series: [
                    {
                        name: '城镇收入',
                        type: 'bar',
                        data: [30337, 32937, 35901, 39015, 42940, 47037, 49616, 53610],
                    },

                    {
                        name: '农村收入',
                        type: 'bar',
                        data: [19443, 21258, 23022, 25099, 27207, 29547, 31766, 35086],
                    },

                    {
                        name: '城镇收入同比上年增幅',
                        type: 'line',
                        data: ['0', '8.570', '8.999', '8.674', '10.060', '9.541', '5.483', '8.050'],
                        yAxisIndex: 1, //使用的 y 轴的 index（从0开始），默认为0，在单个图表实例中存在多个 y轴的时候有用
                    },

                    {
                        name: '农村支出同比上年增幅',
                        type: 'line',
                        data: ['0', '9.335', '8.298', '9.022', '8.399', '8.601', '7.510', '10.451'],
                        yAxisIndex: 1, //使用的 y 轴的 index（从0开始）
                    },
                ],
            }

            // 使用指定的配置项和数据显示图表
            echart3.setOption(option)
        },
    },
}
</script>

<style lang="less" scoped>
.echart2-box {
    width: 600px;
    height: 400px;
    //媒体查询：当窗口宽度小于 768px 时
    @media screen and (max-width: 768px) {
        width: 450px;
        height: 300px;
    }
}
</style>
