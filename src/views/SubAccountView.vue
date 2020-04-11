<template>
    <div>
        <el-card>
            月份
            <el-date-picker @change="monthChange" v-model="monthValue" type="month" size="small" placeholder="选择月">
            </el-date-picker>
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
                loading: false,
                subLoading: false,
                monthValue: null
            }
        },
        methods: {

            monthChange(val) {
                let date = new Date(val);
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                let lastDay=this.$utils.getLastDay(year,month);
                if (month<10){
                    month="0"+month;
                }
                let ym=year+"-"+month;
                this.startDate=ym+"-"+"01";
                this.endDate=ym+"-"+lastDay
            },
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
                getSubAccountApi(this.subjectId, this.startDate, this.endDate)
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
                    getSubjectListApi(query, null, null, null, 1, 15)
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
            }
        },
        components:{
            "sub-account-list":SubAccountList
        }
    }
</script>
