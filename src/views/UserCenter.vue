<template>
    <el-card>
        <h2>信息</h2>
        <el-divider></el-divider>
        <div v-if="userInfo!=null">
            <p><b>编号：</b>{{userInfo.id}}</p>
            <p><b>用户名：</b>{{userInfo.username}}</p>
            <p><b>姓名：</b>{{userInfo.name}}</p>
            <p><b>角色：</b>{{this.$utils.getRole(userInfo.role)}}</p>
            <p><b>电话：</b>{{userInfo.phone}}</p>
            <p><b>加入时间：</b>{{this.$utils.dateFormatter(userInfo.joinTime)}}</p>
            <el-divider></el-divider>
            <el-button size="medium" @click="doChangePwd" type="primary">修改密码</el-button>
            <el-button size="medium" @click="doChangeName" type="primary">更正姓名</el-button>
            <el-button size="medium" @click="doChangePhone" type="primary">修改电话</el-button>

        </div>
    </el-card>
</template>

<script>
    import {getInfoApi, changeNameApi, changePhoneApi, changePwdApi} from "../api/userCenterApi"

    export default {
        name: "UserCenter",
        data() {
            return {
                userInfo: null
            }

        },
        methods: {
            getInfo() {
                getInfoApi().then(response => {
                    if (response && response.data.code === 200) {
                        this.userInfo = response.data.data;
                    }
                })
            },
            doChangeName() {
                this.$prompt('请输入姓名', '提示', {
                    confirmButtonText: '更正',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    changeNameApi(value).then(response => {
                        if (response && response.data.code === 200) {
                            this.$message.success("更正成功");
                            this.getInfo();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消更正'
                    });
                });
            },
            doChangePhone() {
                this.$prompt('请输入新手机号码', '提示', {
                    confirmButtonText: '修改',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    changePhoneApi(value).then(response => {
                        if (response && response.data.code === 200) {
                            this.$message.success("修改成功");
                            this.getInfo();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            },
            doChangePwd() {
                this.$prompt('请输入新密码', '提示', {
                    confirmButtonText: '修改',
                    cancelButtonText: '取消',
                    inputType: 'password'
                }).then(({value}) => {
                    changePwdApi(value).then(response => {
                        if (response && response.data.code === 200) {
                            this.$message.success("修改成功");
                            if (sessionStorage.getItem("token_id")) {
                                sessionStorage.removeItem("token_id");
                            }
                            if (sessionStorage.getItem("user")) {
                                sessionStorage.removeItem("user");
                            }
                            this.$router.push({
                                path: "/login"
                            }).catch(error => {
                                console.log(error);
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            }
        },
        created: function () {
            this.getInfo();
        }
    }
</script>
