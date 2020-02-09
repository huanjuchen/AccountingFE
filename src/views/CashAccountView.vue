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
            <cash-account-list :loading="loading"
                    :page="page" :page-size="pageSize" :account-list="cashAccountList"
                    :total="cashAccountCount" @pageChange="doPageChange" @pageSizeChange="doPageSizeChange"/>
        </el-card>
    </div>
</template>

<script>
    import {getCashAccountApi, getCashAccountCountApi} from "../api/accountBookApi"
    import CashAccountList from "../components/cashAccountView/CashAccountList"

    export default {
        name: "CashAccountView",
        data() {
            return {
                //queryParam
                startDate: "",
                endDate: "",
                page: 1,
                pageSize: 10,
                //list
                cashAccountList: [],
                cashAccountCount: 0,


                //
                rangeDate: null
            }
        },

        methods: {
            doPageChange(val) {
                this.page = val;
                this.getCashAccount();
            },
            doPageSizeChange(val) {
                this.pageSize = val;
                this.getCashAccount();
            },

            doSelect() {
                this.getCount();
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
            getCount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                getCashAccountCountApi(this.startDate, this.endDate).then(response => {
                    if (response && response.data.code === 200) {
                        this.cashAccountCount = response.data.data;
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