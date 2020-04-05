<template>
    <div>
        <el-card>
            日期
            <el-date-picker @change="rangeDateChange" v-model="rangeDate" type="daterange" size="small"
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            科目
            <el-select size="small" :remote-method="doGetSubjectList"
                       v-model="subjectId" :loading="subLoading"
                       remote filterable
                       placeholder="请输入科目代码或科目名检索">
                <el-option
                        v-for="item in subjectList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            &nbsp;&nbsp;&nbsp;
            <el-button size="small" type="primary" @click="doSelect">筛选</el-button>
        </el-card>

        <el-card :style="{marginTop:15+'px'}">
            <div v-if="subject!=null">
                <b>会计科目：</b>{{subject.name}}
            </div>
            <hr/>
            <sub-account-list :loading="loading" :account-list="accountList" />
        </el-card>
    </div>
</template>

<script>
    import {
        getSubjectListApi,getSubjectById
    } from "../api/subjectApi";
    import { getSubAccountApi} from "../api/accountBookApi"
    import SubAccountList from "../components/subAccountView/SubAccountList"

    export default {
        name: "SubAccountView",
        data() {
            return {
                //queryParam
                startDate: "",
                endDate: "",
                subjectId: null,
                subject:null,
                //subjectList
                subjectList: [],
                //list
                accountList: [],
                //
                rangeDate: null,
                loading: false,
                subLoading: false
            }
        },
        methods: {
            doSelect() {
                this.getAccount();
                this.getSubject();
            },

            getAccount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                if (this.subjectId == null) {
                    this.$message.error("请选择科目");return;
                }
                this.loading=true;
                getSubAccountApi(this.subjectId, this.startDate, this.endDate, this.page, this.pageSize)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.accountList = response.data.data;
                            this.loading=false;
                        }
                    });
            },
            doGetSubjectList(query) {
                if (query !== '') {
                    this.subLoading = true;
                    getSubjectListApi(query, true, null, "code", 1, 15)
                        .then(response => {
                            if (response && response.data.code === 200) {
                                this.subjectList = response.data.data;
                            }
                            this.subLoading = false
                        });
                }
            },
            getSubject(){
                if (this.subjectId!=null){
                    getSubjectById(this.subjectId).then(response=>{
                        if (response&&response.data.code===200){
                            this.subject=response.data.data;
                        }
                    })
                }
            },
            rangeDateChange() {
                if (this.rangeDate != null) {
                    this.startDate = this.$utils.dateFormatter(this.rangeDate[0]);
                    this.endDate = this.$utils.dateFormatter(this.rangeDate[1]);
                } else {
                    this.startDate = "";
                    this.endDate = "";
                }
            },
        },
        components:{
            "sub-account-list":SubAccountList
        }
    }
</script>
