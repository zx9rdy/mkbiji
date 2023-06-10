<template>
    <div class="carousel-app">
        <!-- element ui 轮播图 -->
        <!--
            element ui 轮播图使用指南：
            1.至少设定好三种宽高属性才好正常使用，
                一是el-carousel组件的width，这个用css设置即可，否则width是默认的auto，
                二是el-carousel组件的height，这个必须用el-carousel组件的height属性来赋值，用css设置无效，也别在css上设置，
                三是el-carousel-item内的要轮播的元素的大小控制，要控制在el-carousel的宽高范围内
         -->
        <h3 class="text-center m-4">element ui 基础轮播图</h3>
        <el-carousel class="carousel-1">
            <el-carousel-item v-for="index in 4" :key="index">
                <img src="@/assets/img/miku-login.jpg" alt="">
            </el-carousel-item>
        </el-carousel>

        <!-- 
            trigger="click" 点击触发指示器。默认为hover
            indicator-position="outside" 指示器显示在轮播图外部，设为none则无轮播图，默认为没有值 在内部
            arrow="always" 切换箭头会一直显示，设为never则无切换箭头，默认为hover
            type="card" 开启卡片模式轮播图

            label="index" 该幻灯片所对应指示器的文本
        -->
        <h3 class="text-center m-4">element ui 层叠式轮播图</h3>
        <el-carousel trigger="click" indicator-position="outside" arrow="always" type="card" class="carousel-2">
            <el-carousel-item :label="index" v-for="index in 4" :key="index">
                <img src="@/assets/img/miku-login.jpg" alt="">
            </el-carousel-item>
        </el-carousel>
        <!-- element ui 轮播图 -->

        <!-- swiperjs 轮播图 start -->
        <!--
            swiperjs 使用指南：
            1.swiper-container、swiper-wrapper、swiper-slide、swiper-pagination、swiper-button-prev、swiper-button-next的dom结构注意不能破坏，
                这几个类是swiperjs的默认选择器，swiperjs的css给了默认样式的，除非有很强的定制需求，一般也不建议去掉或者改动
            2.和element ui类似，也是至少要设好轮播图根元素（如#swiper1）的width和height，以及要轮播的元素的大小，即可正常使用
         -->
        <h3 class="text-center m-4">swiperjs 基础轮播图</h3>
        <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="index in 4" :key="index">
                    <!-- 每个滑块的内容 -->
                    <img src="@/assets/img/miku-login.jpg" alt="">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>

        <h3 class="text-center m-4">swiperjs 3d轮播图</h3>
        <div class="swiper-container" id="swiper2" ref="swiper2">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="index in 5" :key="index">
                    <!-- 每个滑块的内容 -->
                    <img src="@/assets/img/miku-login.jpg" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>

        <h3 class="text-center m-4">swiperjs 层叠式轮播图</h3>
        <div class="swiper-container" id="swiper3">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="index in 5" :key="index">
                    <!-- 每个滑块的内容 -->
                    <img src="@/assets/img/miku-login.jpg" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>

        <h3 class="text-center m-4">swiperjs 自定义轮播图样式</h3>
        <div class="swiper-container" id="swiper4">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="index in 4" :key="index">
                    <!-- 每个滑块的内容 -->
                    <a>
                        <img src="@/assets/img/miku-login.jpg" alt="">
                        <div class="title">miku sama &gt;_&lt; miku sama &gt;_&lt; miku sama &gt;_&lt;</div>
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>

        <h3 class="text-center m-4">swiperjs tab切换</h3>
        <div class="tab">
            <div class="tab-item" :class="tabCurrentIndex == index ? 'active' : ''" v-for="index in 4" :key="index" @mouseenter="tab(index)">
                <span class="tab-title">Tab{{index}}</span>
            </div>
        </div>
        <div class="swiper-container" id="swiper5">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="index in 4" :key="index">
                    <!-- 每个滑块的内容 -->
                    <img src="@/assets/img/miku-login.jpg" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>

        <h3 class="text-center m-4">swiperjs 双向控制</h3>
        <div class="control" style="display: flex; justify-content: space-around; width: 900px; margin: 0 auto;">
            <div class="swiper-container" id="swiper6">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="index in 4" :key="index">
                        <!-- 每个滑块的内容 -->
                        <img src="@/assets/img/miku-login.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="swiper-container" id="swiper7">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="index in 4" :key="index">
                        <!-- 每个滑块的内容 -->
                        <img src="@/assets/img/miku-login.jpg" alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!-- swiperjs 轮播图 end -->
        <div class="m-40"></div>
    </div>
</template>

<script>
import Swiper from 'swiper' // 注意引入的是Swiper
import 'swiper/css/swiper.min.css' // 注意这里的引入

export default {
    name: 'CarouselIndex',
    data() {
        return {
            swiper5: null,
            tabCurrentIndex: 1,
        }
    },
    mounted() {
        this.swiperInit()
    },
    methods: {
        swiperInit() {
            new Swiper('#swiper1', {
                // 参数配置：具体可以参考官网的API => https://www.swiper.com.cn/api
                autoplay: true, //可选选项，自动滑动
            })

            const swiper2 = new Swiper('#swiper2', {
                effect: 'coverflow', // swiper的切换效果，这个是以3d效果切换的
                autoplay: {
                    // 自动滑动
                    delay: 3000, //自动切换的时间间隔，单位ms
                    stopOnLastSlide: false, //当切换到最后一个slide时不会停止自动切换
                    disableOnInteraction: false, //用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
                },
                loop: true, // 循环滑动
                grabCursor: true, // 该选项给Swiper用户提供小小的贴心应用，设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
                centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左
                slidesPerView: 'auto', //  根据slide的宽度自动调整展示数量。此时需要设置slide的宽度(.swiper-slide)
                coverflow: {
                    // 3d切换的参数设置
                    rotate: 30, // 旋转的角度
                    stretch: 50, // 拉伸   图片间左右的间距和密集度
                    depth: 50, // 深度   切换图片间上下的间距和密集度
                    modifier: 3, // 修正值 该值越大前面的效果越明显
                    slideShadows: true, // 页面阴影效果
                },
                pagination: {
                    el: '.swiper-pagination', //分页器的类
                },
                navigation: {
                    // 导航按钮的类
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    // 这个是获取当前的滑块的索引
                    slideChange: function () {
                        //  that.active = this.activeIndex
                    },
                },
            })
            this.$refs.swiper2.addEventListener('mouseenter', () => {
                swiper2.autoplay.stop()
            })

            new Swiper('#swiper3', {
                effect: 'coverflow',
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                loop: true,
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 500,
                    modifier: 1,
                    slideShadows: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })

            new Swiper('#swiper4', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
            })

            let swiper5 = new Swiper('#swiper5', {
                simulateTouch: false, //禁止鼠标模拟
            })
            this.swiper5 = swiper5
            // 原生js的话请用jQuery来如下操作
            // $('.tab .tab-item').on('mouseenter', function () {
            //     $(this).addClass('active').siblings('.tab-item').removeClass('active')
            //     swiper5.slideTo($(this).index(), 500)
            // })

            const swiper6 = new Swiper('#swiper6', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
            })
            const swiper7 = new Swiper('#swiper7', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
            })
            swiper6.controller.control = swiper7 //swiper6控制swiper7，需要在swiper7初始化后
            swiper7.controller.control = swiper6 //swiper7控制swiper6，需要在swiper7初始化后
        },
        tab(index) {
            this.tabCurrentIndex = index
            this.swiper5.slideTo(index - 1, 500)
        },
    },
}
</script>

<style lang="less" scoped>
// element ui 轮播图
.carousel-1 {
    width: 400px;
    margin: 0 auto;
    img {
        width: 400px;
    }
}
.carousel-2 {
    width: 800px;
    margin: 0 auto;
    img {
        width: 400px;
    }
}

// swiperjs 轮播图
#swiper1 {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    .swiper-slide {
        img {
            width: 400px;
        }
    }
}
#swiper2 {
    height: 300px;
    .swiper-slide {
        width: 400px;
        overflow: hidden; //这个也得自己手动必须加上！
        img {
            width: 400px;
        }
    }
}
#swiper3 {
    width: 1000px;
    height: 300px;
    margin: 0 auto;
    .swiper-slide {
        width: 400px;
        overflow: hidden;
        img {
            width: 400px;
        }
    }
}
.tab {
    width: 400px;
    margin: 0 auto;
    display: flex;
    .tab-item {
        width: 25%;
        text-align: center;
        background-color: #6cf;
        cursor: pointer;
    }
    .active {
        background-color: #39c5bb;
    }
}
#swiper5 {
    width: 400px;
    margin: 0 auto;
    .swiper-slide {
        img {
            width: 100%;
        }
    }
}
#swiper6,
#swiper7 {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    .swiper-slide {
        img {
            width: 400px;
        }
    }
}
</style>
<style lang="less">
#swiper4 {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    .swiper-slide {
        a {
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            img {
                width: 400px;
                height: auto;
            }
            .title {
                box-sizing: border-box;
                width: 100%;
                padding: 10px 75px 10px 10px;
                position: absolute;
                bottom: 0;
                left: 0;
                color: #fff;
                font-size: 18px;
                font-weight: 500;
                background-image: linear-gradient(rgba(#fff, 0), #000);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .swiper-pagination {
        text-align: right;
        position: absolute;
        width: auto;
        height: 10px;
        right: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .swiper-pagination-bullet {
            opacity: 1;
            background: #fff;
            width: 7px;
            height: 7px;
        }
        .swiper-pagination-bullet-active {
            width: 10px;
            height: 10px;
            background-color: #c8161d;
        }
    }
}
</style>