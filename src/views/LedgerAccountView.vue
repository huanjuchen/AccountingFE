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
        <ledger-account-list :loading="loading"
                          :page="page" :page-size="pageSize" :account-list="accountList"
                          :total="accountCount" @pageChange="doPageChange" @pageSizeChange="doPageSizeChange"/>
    </el-card>
    </div>
</template>

<script>
    import {getLedgerAccountApi,getLedgerAccountCountApi} from "../api/accountBookApi"
    import {
        getSubjectListApi,getSubjectById
    } from "../api/subjectApi";
    import LedgerAccountList from "../components/ledgerAccountView/LedgerAccountList"
    export default {
        name: "LedgerAccountView",
        data(){
            return {
                //queryParam
                startDate: "",
                endDate: "",
                page: 1,
                pageSize: 5,
                subjectId: null,
                subject:null,
                //subjectList
                subjectList: [],
                //list
                accountList: [],
                accountCount: 0,

                //
                rangeDate: null,
                loading: false,
                subLoading: false
            }
        },
        methods: {

            doPageChange(val) {
                this.page = val;
                this.getAccount();
            },
            doPageSizeChange(val) {
                this.pageSize = val;
                this.getAccount();
            },
            doSelect() {
                this.getCount();
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
                getLedgerAccountApi(this.subjectId, this.startDate, this.endDate, this.page, this.pageSize)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.accountList = response.data.data;
                            this.loading=false;
                        }
                    });
            },
            getCount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                if (this.subjectId == null) {
                    this.$message.error("请选择科目");return;
                }
                getLedgerAccountCountApi(this.subjectId, this.startDate, this.endDate).then(response => {
                    if (response && response.data.code === 200) {
                        this.accountCount = response.data.data;
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
            "ledger-account-list":LedgerAccountList
        }
    }
</script>
