<template>
    <div>
        <el-table v-loading="loading" :data="accountList" v-if="accountList!=null&&accountList.length>0">
            <el-table-column label="日期">
                <template slot-scope="scope">
                    {{$utils.dateFormatter(scope.row.date)}}
                </template>
            </el-table-column>
            <el-table-column label="凭证号" prop="proofId"></el-table-column>
            <el-table-column label="摘要" prop="abstraction"></el-table-column>
            <el-table-column label="借方" prop="debitMoney"></el-table-column>
            <el-table-column label="贷方" prop="creditMoney"></el-table-column>
        </el-table>
        <div style="float: right;line-height: 50px">
            <b>借方总计：</b>{{debitTotal()}}<b>&nbsp;&nbsp;&nbsp;贷方总计：</b>{{creditTotal()}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "LedgerAccountList",
        props: {
            accountList: Array,
            loading: Boolean
        },
        methods: {
            debitTotal() {
                if (this.accountList != null && this.accountList.length > 0) {
                    let res = 0;
                    let dm = 0;
                    for (let i = 0; i < this.accountList.length; i++) {
                        dm = this.accountList[i].debitMoney;
                        if (dm == null) {
                            dm = 0;
                        }
                        res = this.$utils.decimalAdd(res, dm)
                    }
                    return res;
                } else {
                    return 0;
                }
            },
            creditTotal() {
                if (this.accountList != null && this.accountList.length > 0) {
                    let res = 0;
                    let cm=0;
                    for (let i = 0; i < this.accountList.length; i++) {
                        cm=this.accountList[i].creditMoney;
                        if (cm==null){
                            cm=0;
                        }
                        res = this.$utils.decimalAdd(res, cm)
                    }
                    return res;
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<style scoped>

</style>