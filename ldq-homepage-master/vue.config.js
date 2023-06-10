const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    // devServer: {
    //     // 注意如果请求中带有服务器的域名了的话就不会再代理了，所以发axios请求时直接不带域名发才会触发代理服务器
    //     proxy: {
    //         "/": {
    //             target: "http://localhost:8000", // 代理目标的基础路径
    //         },
    //     },
    // },
});
