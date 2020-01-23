<template>
    <div>
        <el-table :data="subjectList" style="width: 100%">
            <el-table-column label="科目编号" prop="code" width="120"></el-table-column>
            <el-table-column label="科目名" prop="name" width="150"></el-table-column>
            <el-table-column label="科目类别" width="150">
                <template slot-scope="scope">{{$utils.getSubjectCategory(scope.row.category)}}</template>
            </el-table-column>

            <el-table-column label="状态" width="150">
                <template slot-scope="scope">{{$utils.getState(scope.row.valid)}}</template>
            </el-table-column>

            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="small" plain @click="viewDetails(scope.row)">详细信息</el-button>
                    <el-button size="small" plain @click="editSubject(scope.row.id)">修 改</el-button>
                    <el-button size="small" type="danger" plain>禁 用</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        props: ["subjectList","subjectCount"],
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

            editSubject(val){
                this.$emit("edit",val);
            }
        }
    };
</script>