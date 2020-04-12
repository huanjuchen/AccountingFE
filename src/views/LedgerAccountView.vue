<template>
    <div>
        <el-card>
            年份
            <el-date-picker @change="yearChange" v-model="yearValue" type="year" size="small" placeholder="选择年份">
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

        <el-card :style="{marginTop:10+'px'}" v-if="accountList!=null&&accountList.length>0">
            <h2 style="text-align: center">总分类账</h2>
            <p></p>
            <div v-if="subject!=null" style="width: 100%">
                <div style="width: 40%;float: left;margin-left: 10px">
                    <b style="text-align: left">科目代码：</b>{{subject.code}}
                </div>
                <div style="width: 40%;float:left">
                    <b style="text-align: left">会计科目：</b>{{subject.name}}
                </div>
            </div>
            <p></p>
            <p></p>
            <ledger-account-list :account-list="accountList" :loading="loading"/>
            <p></p>
            <p></p>
        </el-card>
    </div>
</template>

<script>
    import {getLedgerAccountApi} from "../api/accountBookApi"
    import {
        getSubjectListApi, getSubjectById
    } from "../api/subjectApi";
    import LedgerAccountList from "../components/ledgerAccountView/LedgerAccountList"

    export default {
        name: "LedgerAccountView",
        data() {
            return {
                //queryParam
                year:null,
                subjectId: null,
                subject: null,
                //subjectList
                subjectList: [],
                //list
                accountList: [],
                //
                yearValue: null,
                loading: false,
                subLoading: false
            }
        },
        methods: {
            yearChange(val) {
                let date = new Date(val);
                this.year=date.getFullYear();
                if (this.subjectId!=null){
                    this.doSelect();
                }
            },

            doSelect() {
                this.getAccount();
                this.getSubject();
            },

            init(){
              this.yearValue=new Date();
              this.yearChange(this.yearValue);
            },
            getAccount() {
                this.loading = true;
                getLedgerAccountApi(this.subjectId, this.year)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.accountList = response.data.data;
                            this.loading = false;
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
            getSubject() {
                if (this.subjectId != null) {
                    getSubjectById(this.subjectId).then(response => {
                        if (response && response.data.code === 200) {
                            this.subject = response.data.data;
                        }
                    })
                }
            }
        },
        components: {
            "ledger-account-list": LedgerAccountList
        },
        created() {
            this.init();
        }
    }
</script>
