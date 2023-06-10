/**
 * 封装axios请求
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// 利用axios对象的方法create，去创建一个axios实例
const ldqHttp = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
})

// 请求拦截
ldqHttp.interceptors.request.use(
    (config) => {
        // 从vuex中取出token
        const token = store.state.user.token
        // 如果有token则 添加到headers中
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    (error) => {
        console.log('请求拦截error', error)
        return Promise.reject(error)
    }
)

// 响应拦截
ldqHttp.interceptors.response.use(
    (response) => {
        if (response.data.code) {
            Message.error(response.data.message)
            return
        }
        return response.data
    },
    (error) => {
        //网络超时异常处理
        if (error.message === 'Network Error') {
            Message.error('网路连接异常,请稍后重试')
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            Message.error('请求超时,请稍后重试')
        } else if (error.code === 'ERR_BAD_RESPONSE') {
            Message.error('服务器错误，请联系管理员')
        } else {
            console.log('响应拦截error', error)
        }
        return Promise.reject(error)
    }
)

export default ldqHttp
