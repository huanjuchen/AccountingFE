<template>
    <div>
        <el-card>
            <el-input
                    size="medium"
                    placeholder="请输入查找的姓名或用户编号..."
                    v-model="searchText"
                    v-bind:style="{width:40+'%'}"
            ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button size="medium" type="primary" @click="doSearch">
                <i class="el-icon-search"></i> 搜 索
            </el-button>
            <el-button size="medium" type="primary" @click="doReset">
                <i class="el-icon-warning-outline"></i>
                重 置
            </el-button>
            <el-button size="medium" type="primary" @click="showCreateDialog">
                <i class="el-icon-plus"></i> 添 加
            </el-button>
        </el-card>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="480px" center>
            <user-create @cancelCreate="cancelCreate" @success="createSuccess"/>
        </el-dialog>

        <el-dialog title="添加成功" :visible.sync="userInfoShowDialog" width="480px" center>
            <user-detail :userInfo="userInfo"/>
        </el-dialog>

        <el-card v-if="userList!=null" :style="{marginTop:2+'%'}">
            <user-list :userList="userList" :page-size="pageSize" :list-loading="listLoading" :user-count="userCount"
                       @changePage="doChangePage" @changePageSize="doChangePageSize"
                       @resetPwd="doResetPwd" @lockUser="doLockUser" @unlockUser="doUnlockUser"/>
        </el-card>
    </div>
</template>

<script>
    import UserCreate from "../components/userManagement/UserCreate";
    import UserDetail from "../components/userManagement/UserDetail";

    import {getUserListApi, resetPwdApi, 
        lockUserApi, unlockUserApi, userCountApi} from "../api/userApi";

    import UserList from "../components/userManagement/UserList";

    export default {
        name: "UserManagement",
        data: function () {
            return {
                searchText: null, //搜索栏数据
                dialogFormVisible: false, //是否显示新建用户对话框
                userInfoShowDialog: false, //是否显示用户详细信息对话框
                userInfo: null, //用于用户详细信息展示的数据
                userList: [], //传递给子组件的列表的数据
                page: 1,
                pageSize: 5,
                desc: true,
                valid: null,
                listLoading: false,
                userCount: 0 //满足查询条件的用户总数
            };
        },
        components: {
            "user-list": UserList,
            "user-create": UserCreate,
            "user-detail": UserDetail
        },

        //-----
        methods: {
            //显示创建用户窗口
            showCreateDialog() {
                this.userInfo = null;

                this.dialogFormVisible = true;
            },

            doChangePage(val){
                this.page=val;
                this.refreshUserList();
            },

            doChangePageSize(val){
                this.pageSize=val;
                this.refreshUserList();
            },

            cancelCreate() {
                this.dialogFormVisible = false;
            },

            doSearch() {
                this.refreshUserList();
                this.refreshCount();
            },

            doReset() {
                this.searchText = "";
                this.page=1;
                this.refreshUserList();
                this.refreshCount();
            },

            //密码重置
            doResetPwd(userId) {
                resetPwdApi(userId).then(response => {
                    if (response) {
                        if (response.data.code === 200) {
                            this.$message.success("重置成功!");
                        }
                    }
                });
            },
            //禁用用户
            doLockUser(userId) {
                lockUserApi(userId).then(response => {
                    if (response) {
                        if (response.data.code === 200) {
                            this.$message.success("禁用成功");
                            this.refreshUserList();
                            this.refreshCount();
                        }
                    }
                });

            },
            //启用用户
            doUnlockUser(userId) {
                unlockUserApi(userId).then(response => {
                    if (response) {
                        if (response.data.code === 200) {
                            this.$message.success("启用成功");
                            this.refreshUserList();
                            this.refreshCount();
                        }
                    }
                });

            },
            //创建成功时调用
            createSuccess(user) {
                this.userInfo = user;
                this.dialogFormVisible = false;
                this.userInfo = user;
                this.userInfoShowDialog = true;
                this.refreshUserList();
                this.refreshCount();
            },

            refreshUserList() {
                this.listLoading = true;
                getUserListApi(this.page, this.pageSize, this.searchText, this.valid, this.desc)
                    .then(response => {
                        if (response) {
                            this.userList = response.data.data;
                        }
                        this.listLoading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.listLoading = false;
                    });
            },
            
            
            refreshCount(){
                userCountApi(this.searchText,this.valid)
                    .then(response=>{
                       if (response){
                           if (response.data.code===200){
                               this.userCount=response.data.data;
                           }
                       }  
                    });
            },

            //初始化获取数据
            init() {
                this.userInfo = null;
                this.refreshUserList();
                this.refreshCount();
            }
        },
        //------

        created: function () {
            this.init();
        }
    };
</script>