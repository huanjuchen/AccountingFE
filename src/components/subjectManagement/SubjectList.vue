<template>
    <div>
        <el-table v-loading="loading" :data="subjectList" style="width: 100%">
            <el-table-column label="科目编号" prop="code" width="120"></el-table-column>
            <el-table-column label="科目名" prop="name" width="150"></el-table-column>
            <el-table-column label="科目类别" width="120">
                <template slot-scope="scope">{{$utils.getSubjectCategory(scope.row.category)}}</template>
            </el-table-column>

            <el-table-column label="状态" width="120">
                <template slot-scope="scope">{{$utils.getState(scope.row.valid)}}</template>
            </el-table-column>

            <el-table-column label="操作" width="360">
                <template slot-scope="scope">
                    <el-button size="small" plain @click="viewDetails(scope.row)">详细信息</el-button>
                    <el-button size="small" plain @click="editSubject(scope.row.id)">修 改</el-button>


                    <el-button v-if="scope.row.valid" @click="doLockSubject(scope.row.id)" size="small" type="danger"
                               plain>禁 用
                    </el-button>
                    <el-button v-if="!scope.row.valid" @click="doUnlockSubject(scope.row.id)" size="small" plain>启 用
                    </el-button>
                    <el-button size="small" type="danger" @click="doDeleteSubject(scope.row.id)" plain>删 除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination
                    background
                    @current-change="doChangePage"
                    @size-change="doChangePageSize"
                    :page-sizes="[5,7,10,15]"
                    :page-size="pageSize"
                    :pager-count="5"
                    layout="prev, pager, next ,sizes,total"
                    :total="subjectCount">
            </el-pagination>
        </div>
        <el-dialog title="详细信息" :visible.sync="infoDialog" width="360px" center>
            <subject-detail :subject="subjectInfo"/>
        </el-dialog>
    </div>
</template>

<script>
    import SubjectDetail from "./SubjectDetail";

    export default {
        name: "SubjectList",
        //----
        props: ["subjectList", "subjectCount", "pageSize", "loading"],
        //------
        data: function () {
            return {
                infoDialog: false,
                subjectInfo: null
            };
        },
        components: {
            "subject-detail": SubjectDetail
        },
        methods: {
            viewDetails(val) {
                this.subjectInfo = val;
                this.infoDialog = true;
            },
            editSubject(val) {
                this.$emit("edit", val);
            },
            doChangePage(val) {
                this.$emit("changePage", val);
            },
            doChangePageSize(val) {
                this.$emit("changePageSize", val);
            },
            doLockSubject(val) {
                this.$confirm('此操作将禁用该科目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("lockSubject", val);
                });

            },
            doUnlockSubject(val) {
                this.$confirm('此操作将启用该科目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("unlockSubject", val);
                });

            },
            doDeleteSubject(val) {
                this.$confirm('此操作将删除该科目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("deleteSubject", val);
                });

            },
        }
    };
</script>