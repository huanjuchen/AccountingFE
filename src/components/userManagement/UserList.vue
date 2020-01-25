<template>
    <div>
        <el-table size="medium" v-loading="listLoading" :data="userList" style="width: 100%">
            <el-table-column prop="id" label="用户编号" width="100" fixed="left"></el-table-column>
            <el-table-column prop="username" label="用户名" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150"></el-table-column>
            <el-table-column label="创建日期" width="150">
                <template slot-scope="scope">{{$utils.dateFormatter(scope.row.joinTime)}}</template>
            </el-table-column>
            <el-table-column label="用户类型" width="100">
                <template slot-scope="scope">{{$utils.getRole(scope.row.role)}}</template>
            </el-table-column>

            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{$utils.getState(scope.row.valid)}}
                </template>
            </el-table-column>


            <el-table-column label="操作" fixed="right" width="360">
                <template slot-scope="scope">
                    <el-button size="small" plain @click="viewDetails(scope.row)">查看</el-button>
                    <el-button size="small" type="danger" @click="resetPwd(scope.row.id)" plain>重置密码</el-button>
                    <el-button v-if="scope.row.valid" size="small" type="danger" @click="lockUser(scope.row.id)" plain>
                        禁用
                    </el-button>
                    <el-button v-else-if="!scope.row.valid" size="small" @click="unlockUser(scope.row.id)" plain>
                        启用
                    </el-button>

                </template>
            </el-table-column>
        </el-table>

        <div v-if="userCount!=null && userCount>0" style="text-align: center">
            <el-pagination
                    background
                    @current-change="changePage"
                    @size-change="changePageSize"
                    :page-sizes="[5,10,15]"
                    :page-size="pageSize"
                    :pager-count="5"
                    layout="prev, pager, next ,sizes,total"
                    :total="userCount">
            </el-pagination>
        </div>

        <el-dialog title="详细信息" :visible.sync="infoDialog" width="360px" center>
            <user-detail :userInfo="info"/>
        </el-dialog>
    </div>
</template>

<script>
    import UserDetail from "./UserDetail"

    export default {
        name: "UserList",
        props: ["userList","pageSize", "listLoading", "userCount"],
        //-----
        data: function () {
            return {
                infoDialog: false,
                info: null
            };
        },
        components: {
            "user-detail": UserDetail
        },
        //-----
        methods: {
            viewDetails(val) {
                // console.log(val);
                this.info = val;
                this.infoDialog = true;
            },
            resetPwd(userId) {
                this.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("resetPwd", userId);

                });
            },
            lockUser(userId) {
                this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("lockUser", userId);
                });

            },
            unlockUser(userId) {
                this.$confirm('此操作将启用该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("unlockUser", userId);
                });


            },
            changePage(val) {
                // console.log("页数: " + val);
                this.$emit("changePage", val);
            },
            changePageSize(val) {
                this.$emit("changePageSize", val);
            }

        }
    };
</script>