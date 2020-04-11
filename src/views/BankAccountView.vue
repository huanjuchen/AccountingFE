<template>
    <div>
        <el-card>
            月份
            <el-date-picker @change="monthChange" v-model="monthValue" type="month" size="small" placeholder="选择月">
            </el-date-picker>
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
                monthValue: null,
                //list
                accountList: [],
                //
                loading: false,


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
                this.getBankAccount();
            },
            getBankAccount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                this.loading = true;
                getBankAccountApi(this.startDate, this.endDate)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.accountList = response.data.data;
                        }
                        this.loading = false;
                    });
            }
        },
        components: {
            "bank-account-list": BankAccountList
        }
    }
</script>

<style scoped>

</style>