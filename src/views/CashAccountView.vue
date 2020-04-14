<template>
    <div>
        <el-card>
            日期范围
            <el-date-picker @change="rangeDateChange" v-model="rangeDate" type="daterange" size="small"
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            &nbsp;&nbsp;&nbsp;
            <el-button size="small" type="primary" @click="doSelect">查看</el-button>
        </el-card>

        <el-card v-if="cashAccountList!=null&&cashAccountList.length>0" :style="{marginTop:15+'px'}">
            <h2 style="text-align: center">库存现金日记账</h2>
            <p></p>
            <cash-account-list :loading="loading" :account-list="cashAccountList"/>
            <p></p>
            <p></p>
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
                loading:false,
                //
                rangeDate: []
            }
        },

        methods: {

            rangeDateChange() {
                if (this.rangeDate != null&&this.rangeDate.length>0) {
                    this.startDate = this.$utils.dateFormatter(this.rangeDate[0]);
                    this.endDate = this.$utils.dateFormatter(this.rangeDate[1]);
                    this.getCashAccount();
                } else {
                    this.startDate = "";
                    this.endDate = "";
                }
            },
            init(){
                let date1=new Date();
                let date2=new Date();
                this.rangeDate.push(date1,date2);
                this.rangeDateChange();
            },

            doSelect() {
                this.getCashAccount();
            },
            getCashAccount() {
                if (this.startDate.length <= 0 || this.endDate <= 0) {
                    this.$message.warning("请选择日期");
                    return;
                }
                getCashAccountApi(this.startDate, this.endDate, null)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.cashAccountList = response.data.data;
                        }
                    });
            }
        },

        components: {
            "cash-account-list": CashAccountList
        },
        created() {
            this.init();
        }
    }
</script>