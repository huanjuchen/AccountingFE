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
            <bank-account-list :loading="loading" :account-list="accountList"/>
        </el-card>
    </div>
</template>

<script>
    import {getBankAccountApi} from "../api/accountBookApi"
    import BankAccountList from "../components/bankAccountView/BankAccountList"

    export default {
        name: "BankAccountView",
        data() {
            return {
                //queryParam
                startDate: "",
                endDate: "",
                //list
                accountList: [],
                //
                rangeDate: null,
                loading: false,

            }
        },

        methods: {
            doSelect() {
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