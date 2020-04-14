<template>
    <div>
        <el-card>
            日期范围
            <el-date-picker @change="rangeDateChange" v-model="rangeDate" type="daterange" size="small"
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            &nbsp;&nbsp;&nbsp;

            <el-button size="small" type="primary" @click="doSelect">查看</el-button>
        </el-card>

        <el-card v-if="accountList!=null&&accountList.length>0" :style="{marginTop:5+'px'}">
            <h2 style="text-align: center">银行存款日记账</h2>
            <p></p>
            <bank-account-list :loading="loading" :count="count" :page="page" :account-list="accountList"
                               @pageChange="doPageChange"/>
            <p></p>
            <p></p>
        </el-card>
    </div>
</template>

<script>
    import {getBankAccountApi, getBankAccountCountApi} from "../api/accountBookApi"
    import BankAccountList from "../components/bankAccountView/BankAccountList"

    export default {
        name: "BankAccountView",
        data() {
            return {
                //queryParam
                startDate: "",
                endDate: "",
                rangeDate: [],
                page: null,
                //list
                accountList: [],
                count: 0,
                //
                loading: false
            }
        },

        methods: {
            doPageChange(val) {
                this.page = val;
                this.getBankAccount();
            },
            init() {
                let date1=new Date();
                let date2=new Date();
                this.rangeDate.push(date1,date2);
                this.rangeDateChange();
            },
            doSelect() {
                this.getBankAccount();
            },
            getBankAccount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                this.loading = true;
                getBankAccountApi(this.startDate, this.endDate, this.page)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.accountList = response.data.data;
                        }
                        this.loading = false;
                    });
            },
            getCount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    return;
                }
                this.loading = true;
                getBankAccountCountApi(this.startDate, this.endDate).then(response => {
                    if (response && response.data.code === 200) {
                        this.count = response.data.data;
                    }
                    this.loading = false;
                })

            },
            rangeDateChange() {
                if (this.rangeDate != null&&this.rangeDate.length>0) {
                    this.startDate = this.$utils.dateFormatter(this.rangeDate[0]);
                    this.endDate = this.$utils.dateFormatter(this.rangeDate[1]);
                    this.getBankAccount();
                } else {
                    this.startDate = "";
                    this.endDate = "";
                }
            }
        },
        components: {
            "bank-account-list": BankAccountList
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>