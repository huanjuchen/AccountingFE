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
            <cash-account-list :loading="loading" :account-list="cashAccountList"/>
        </el-card>
    </div>
</template>

<script>
    import {getCashAccountApi} from "../api/accountBookApi"
    import CashAccountList from "../components/cashAccountView/CashAccountList"

    export default {
        name: "CashAccountView",
        data() {
            return {
                //queryParam
                startDate: "",
                endDate: "",
                //list
                cashAccountList: [],
                //
                monthValue: null,
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
                this.getCashAccount();
            },
            getCashAccount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                getCashAccountApi(this.startDate, this.endDate, this.page, this.pageSize)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.cashAccountList = response.data.data;
                        }
                    });
            }
        },

        components: {
            "cash-account-list": CashAccountList
        }
    }
</script>