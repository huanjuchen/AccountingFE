<template>
    <div>
        <el-card>
            <el-input
                    size="medium"
                    placeholder="请输入查找的科目名或科目代码..."
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
            <el-button size="medium" type="primary" @click="showCreateDialog()">
                <i class="el-icon-plus"></i> 添 加
            </el-button>
        </el-card>

        <el-card :style="{marginTop:2+'%'}">
            <subject-list @edit="doEdit" @changePage="doChangePage" @changePageSize="doChangePageSize"
                          :subject-count="subjectCount" :subjectList="subjectList"
                          :loading="tableLoading" :page-size="pageSize" v-if="subjectList!=null"/>
        </el-card>

        <el-dialog title="创建科目" :visible.sync="dialogFormVisible" width="480px" center>
            <subject-create @createSuccess="doCreateSuccess" @createCancel="doCancel"/>
        </el-dialog>

        <el-dialog @close="doUpdateCancel" title="修改科目" :visible.sync="editDialog" width="480px" center>
            <subject-edit :edit-id="editId" @updateSuccess="doUpdateSuccess"
                          @updateCancel="doUpdateCancel"/>
        </el-dialog>

    </div>
</template>

<script>
    import SubjectCreate from "../components/subjectManagement/SubjectCreate";
    import SubjectList from "../components/subjectManagement/SubjectList";
    import SubjectEdit from "../components/subjectManagement/SubjectEdit"

    import {getSubjectListApi, countSubjectApi} from "../api/subjectApi";

    export default {
        name: "SubjectManagement",
        data: function () {
            return {
                dialogFormVisible: false,
                editDialog: false,
                searchText: null,
                subjectList: null,
                subject: null,
                page: 1,
                pageSize: 7,
                desc: "code",
                selectType: "all",
                editId: null,
                subjectCount: 0,
                tableLoading:false
            }
        },
        components: {
            "subject-create": SubjectCreate,
            "subject-list": SubjectList,
            "subject-edit": SubjectEdit
        },
        methods: {
            showCreateDialog() {
                this.dialogFormVisible = true;
            },


            doChangePage(val) {
                this.page = val;
                this.refreshSubjectList();

            },

            doChangePageSize(val) {
                this.pageSize = val;
                this.refreshSubjectList();

            },


            doEdit(val) {
                this.editId = val;
                this.editDialog = true;

            },

            doUpdateSuccess() {
                this.$message.success("修改成功");
                this.editDialog = false;
                this.refreshSubjectList();
            },

            doUpdateCancel() {
                this.editDialog = false;
            },

            doCancel() {
                this.dialogFormVisible = false;
            },

            doSearch() {
                this.getSubjectCount();
                this.refreshSubjectList();
            },

            doReset() {
                this.page = 1;
                // this.pageSize = 7;
                this.searchText = "";
                this.getSubjectCount();
                this.refreshSubjectList();
            },

            doCreateSuccess(subject) {
                this.$message.success(
                    "科目 " + subject.name + " 创建成功"
                );
                this.subject = subject;
                this.dialogFormVisible = false;
                this.getSubjectCount();
                this.refreshSubjectList();
            },
            refreshSubjectList() {
                this.tableLoading=true;
                getSubjectListApi(this.searchText, null,
                    this.desc, this.selectType, this.page, this.pageSize)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.subjectList = response.data.data;
                        }
                        this.tableLoading=false;
                    })
            },
            getSubjectCount() {
                countSubjectApi(this.searchText, null)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.subjectCount = response.data.data;
                        }
                    });
            },

            init() {
                this.getSubjectCount();

                this.refreshSubjectList();
            }
        },
        created: function () {
            this.init();
        }
    };
</script>