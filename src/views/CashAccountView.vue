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
                rangeDate: null
            }
        },

        methods: {
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
            "cash-account-list": CashAccountList
        }
    }
</script>