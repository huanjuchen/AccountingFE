<template>
    <div>
        <el-card>
            <el-input
                    size="medium"
                    placeholder="请输入查找的科目名..."
                    v-model="searchText"
                    v-bind:style="{width:40+'%'}"
            ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button size="medium" type="primary">
                <i class="el-icon-search"></i> 搜 索
            </el-button>
            <el-button size="medium" type="primary">
                <i class="el-icon-warning-outline"></i>
                重 置
            </el-button>
            <el-button size="medium" type="primary" @click="showCreateDialog()">
                <i class="el-icon-plus"></i> 添 加
            </el-button>
        </el-card>

        <el-card :style="{marginTop:2+'%'}">
<!--            <subject-list :subjectList="subjectList" v-if="subjectList!=null"/>-->
        </el-card>

        <el-dialog title="创建科目" :visible.sync="dialogFormVisible" width="480px" center>
            <subject-create @createSuccess="doCreateSuccess" @createCancel="doCancel"/>
        </el-dialog>
    </div>
</template>

<script>
    import SubjectCreate from "../components/subjectManagement/SubjectCreate"
    // import { createSubjectApi, getSubjectListApi } from "../api/subjectApi";
    // import SubjectList from "../components/SubjectList";

    export default {
        name: "SubjectManagement",
        data: function () {
            return {
                dialogFormVisible: false,
                searchText: null,
                subjectList: null,
                subject: null,
                page: 1
            }
        },
        components: {
            // "subject-list": SubjectList,
            "subject-create": SubjectCreate
        },
        methods: {
            showCreateDialog() {
                this.dialogFormVisible = true;
            },

            doCancel() {
                this.dialogFormVisible=false;
            },

            doCreateSuccess(subject) {
                this.$message.success(
                    "科目 " + subject.name + " 创建成功"
                );
                this.subject = subject;
                this.dialogFormVisible=false;
                // this.refreshSubjectList();
            },
            refreshSubjectList() {
                // let offset=0;
                // if(this.page!=0){
                //   offset=(this.page-1)*20;
                // }
                // let params={
                //   offset:offset,
                //   count:20
                // }
                // getSubjectListApi(params)
                //   .then(response => {
                //     // console.log(response);
                //     if (response && response.status == 200) {
                //       this.subjectList = response.data.data;
                //     }
                //   })
                //   .catch(error => {
                //     console.log(error);
                //   });
            },

            init() {
                // this.refreshSubjectList();
            }
        },
        computed: {},
        //-----
        created: function () {
            this.init();
        }
    };
</script>