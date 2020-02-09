<template>
    <div>
        <el-card>
            日期
            <el-date-picker @change="rangeDateChange" v-model="rangeDate" type="daterange" size="small"
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            &nbsp;&nbsp;&nbsp;

            <el-button size="small" type="primary" @click="doSelect">筛选</el-button>
        </el-card>

        <el-card :style="{marginTop:15+'px'}">
            <bank-account-list :loading="loading" :page="page" :page-size="pageSize" :account-list="accountList"
                               :total="accountCount"
                               @pageChange="doPageChange" @pageSizeChange="doPageSizeChange"/>
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
                page: 1,
                pageSize: 5,
                //list
                accountList: [],
                accountCount: 0,


                //
                rangeDate: null,
                loading: false,

            }
        },

        methods: {

            doPageChange(val) {
                this.page = val;
                this.getBankAccount();
            },
            doPageSizeChange(val) {
                this.pageSize = val;
                this.getBankAccount();
            },

            doSelect() {
                this.getCount();
                this.getBankAccount();
            },
            getBankAccount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                this.loading = true;

                getBankAccountApi(this.startDate, this.endDate, this.page, this.pageSize)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.accountList = response.data.data;
                        }
                        this.loading = false;
                    });
            },
            getCount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                getBankAccountCountApi(this.startDate, this.endDate).then(response => {
                    if (response && response.data.code === 200) {
                        this.accountCount = response.data.data;
                    }
                });
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
        components: {
            "bank-account-list": BankAccountList
        }
    }
</script>

<style scoped>

</style>