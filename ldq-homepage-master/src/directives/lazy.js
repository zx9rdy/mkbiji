//图片懒加载
export default {
    bind(el) {
        const imgSrc = el.src
        el.src = ''
        const obs = new IntersectionObserver(([{ isIntersecting }]) => {
            ///元素出现在可视区域或离开可视区域时会触发这个回调函数
            //元素进入可视区域则isIntersecting会变为真，不在可视区域则为假
            if (isIntersecting) {
                console.log('加载！')
                el.src = imgSrc
                obs.unobserve(el)
            }
        })
        obs.observe(el)
    },
}
