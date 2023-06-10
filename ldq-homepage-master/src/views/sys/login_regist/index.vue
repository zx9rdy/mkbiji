<template>
    <div class="login-container">
        <div class="login-content" :class="rightActive">
            <div class="form-container sign-up-container">
                <form action="" method="post">
                    <h1>注册账号</h1>
                    <input type="text" v-model="name" placeholder="用户名" autocomplete="off" maxlength="20" />
                    <input type="text" v-model="mail" placeholder="邮箱" autocomplete="off" maxlength="128" />
                    <div class="password-container">
                        <input :type="type" v-model="password" placeholder="密码" autocomplete="off" />
                        <span><i @click="passwordVisible" class="el-icon-view"></i></span>
                    </div>
                    <input @click="regist" type="button" value="注册" />
                    <h5>已有账号？<a @click="rightActive = ''">点此登录</a></h5>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form action="" method="post">
                    <h1>登录</h1>
                    <input type="text" v-model="name" placeholder="用户名／邮箱" />
                    <div class="password-container">
                        <input :type="type" v-model="password" placeholder="密码" />
                        <span><i @click="passwordVisible" class="el-icon-view"></i></span>
                    </div>
                    <input @click="login" type="button" value="登录" />
                    <a>忘记密码？</a>
                    <h5>没有账号？<a @click="rightActive = 'right-active'">点此注册</a></h5>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay-content">
                    <div class="overlay-panel overlay-left">
                        <img src="@/assets/img/miku-register.jpg" />
                    </div>
                    <div class="overlay-panel overlay-right">
                        <img src="@/assets/img/miku-login.jpg" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Schema from 'async-validator';
import { userLogin, userRegister } from '@/api';

export default {
    name: 'LoginRegistIndex',

    data() {
        return {
            rightActive: '', //css类名
            type: 'password', //密码输入框的type
            name: '', //用户名
            mail: '', //邮箱
            password: '', //密码
        };
    },

    mounted() {},

    methods: {
        ...mapMutations('user', ['setToken']),
        // 用户登录
        login() {
            const param = {
                name: this.name.trim(),
                mail: this.name.trim(),
                password: this.password.trim(),
            };
            const descriptor = {
                name: {
                    type: 'string',
                    required: true,
                    message: '请输入用户名或邮箱',
                },
                password: {
                    type: 'string',
                    required: true,
                    message: '请输入密码',
                },
            };
            const validator = new Schema(descriptor);
            validator.validate(param, (errors) => {
                if (errors) {
                    let errMsg = '';
                    errors.forEach((err) => {
                        errMsg +=
                            '<div style="margin:5px 0;">' +
                            err.message +
                            '</div>';
                    });
                    this.$message.error({
                        dangerouslyUseHTMLString: true, //将 message 属性作为 HTML 片段处理
                        message: errMsg,
                    });
                    return;
                }
                userLogin(param).then((data) => {
                    if (data) {
                        this.$message.success({
                            message: '登录成功',
                            center: true, //文字居中
                        });
                        this.setToken(data.result.token);
                        this.$router.push('/home');
                    }
                });
            });
        },
        // 用户注册
        regist() {
            const param = {
                name: this.name.trim(),
                mail: this.mail.trim(),
                password: this.password.trim(),
            };
            const descriptor = {
                name: {
                    type: 'string',
                    max: 20,
                    required: true,
                    message: '用户名不能为空且不超过20字',
                },
                mail: {
                    type: 'string',
                    max: 128,
                    pattern: /^\w+@(\w+\.)+\w+$/,
                    required: true,
                    message: '邮箱格式不正确',
                },
                password: {
                    type: 'string',
                    pattern: /^[a-zA-Z0-9~!@#$%^&*()_+-=.]{6,20}$/,
                    required: true,
                    message: '密码长度需在6到20之间',
                },
            };
            const validator = new Schema(descriptor);
            validator.validate(param, (errors) => {
                if (errors) {
                    let errMsg = '';
                    errors.forEach((err) => {
                        errMsg +=
                            '<div style="margin:5px 0;">' +
                            err.message +
                            '</div>';
                    });
                    this.$message.error({
                        showClose: true, //显示关闭按钮
                        duration: 10000, //显示时间, 毫秒。设为 0 则不会自动关闭
                        dangerouslyUseHTMLString: true, //将 message 属性作为 HTML 片段处理
                        message: errMsg,
                    });
                    return;
                }
                userRegister(param).then((data) => {
                    if (data) {
                        this.$message({
                            message: '注册成功，请登录',
                            type: 'success',
                            center: true, //文字居中
                        });
                        this.rightActive = '';
                    }
                });
            });
        },
        // 显示or隐藏 密码
        passwordVisible() {
            if (this.type == 'password') {
                this.type = 'text';
            } else {
                this.type = 'password';
            }
        },
    },
};
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    margin: 150px 0 50px;
    .login-content {
        position: relative;
        width: 800px;
        max-width: 100%;
        min-height: 480px;
        overflow: hidden;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
            form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 50px;
                height: 100%;
                text-align: center;
                background-color: #fff;
                h1 {
                    padding-bottom: 15px;
                }
                a {
                    margin: 15px 0;
                    color: #005980;
                    font-size: 12px;
                    cursor: pointer;
                }
                h5 {
                    margin: 15px 0;
                }
                input[type='text'],
                input[type='password'] {
                    margin: 8px 0;
                    padding: 0 30px 0 15px;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    background-color: #fff;
                    border: 1px solid #39c5bb;
                    border-radius: 5px;
                    &:focus {
                        outline: 0;
                        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
                            0 0 8px rgba(57, 197, 187, 0.6);
                        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
                            0 0 8px rgba(57, 197, 187, 0.6);
                    }
                }
                input[type='button'] {
                    margin-top: 10px;
                    padding: 0 15px;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    border: none;
                    border-radius: 20px;
                    background: #39c5bb;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    letter-spacing: 10px;
                    cursor: pointer;
                    transition: transform 80ms ease-in;
                    &:hover {
                        background: rgba(39, 197, 187, 0.85);
                    }
                    &:active {
                        transform: scale(0.95);
                    }
                    &:focus {
                        outline: none;
                    }
                }
                .password-container {
                    position: relative;
                    width: 100%;
                    span {
                        position: absolute;
                        height: 100%;
                        line-height: 100%;
                        right: 5px;
                        top: 0;
                        color: #c0c4cc;
                        display: flex;
                        align-items: center;
                        i {
                            color: #c0c4cc;
                            font-size: 14px;
                            cursor: pointer;
                            width: 25px;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
        .sign-up-container {
            left: 0;
            width: 50%;
            z-index: 1;
            opacity: 0;
        }
        .sign-in-container {
            left: 0;
            width: 50%;
            z-index: 2;
        }
        .overlay-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            z-index: 100;
            transition: transform 0.6s ease-in-out;
            .overlay-content {
                position: relative;
                left: -100%;
                height: 100%;
                width: 200%;
                color: #ffffff;
                transform: translateX(0);
                transition: transform 0.6s ease-in-out;
                .overlay-panel {
                    position: absolute;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                    img {
                        width: 120%;
                        height: 480px;
                    }
                }
                .overlay-left {
                    transform: translateX(-20%);
                }
                .overlay-right {
                    right: 0;
                    transform: translateX(0);
                }
            }
        }
    }
    .login-content.right-active {
        .sign-up-container {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            animation: show 0.6s;
            @keyframes show {
                0%,
                49.99% {
                    opacity: 0;
                    z-index: 1;
                }

                50%,
                100% {
                    opacity: 1;
                    z-index: 5;
                }
            }
        }
        .sign-in-container {
            transform: translateX(100%);
        }
        .overlay-container {
            transform: translateX(-100%);
            .overlay-content {
                transform: translateX(50%);
                .overlay-left {
                    transform: translateX(0);
                }
                .overlay-right {
                    transform: translateX(20%);
                }
            }
        }
    }
}

// 覆盖chrome自动填充表单时的样式
/deep/ input:-internal-autofill-previewed,
/deep/ input:-internal-autofill-selected {
    transition: background-color 9999s 0s !important;
}
</style>