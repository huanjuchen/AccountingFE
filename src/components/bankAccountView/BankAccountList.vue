<template>
    <div>
        <el-table :data="accountList" v-if="accountList!=null&&accountList.length>0" size="medium">
            <el-table-column label="日期" width="150px">
                <template slot-scope="scope">
                    {{$utils.dateFormatter(scope.row.date)}}
                </template>
            </el-table-column>
            <el-table-column label="凭证号" prop="proofId"></el-table-column>
            <el-table-column label="摘要" prop="abstraction"></el-table-column>
            <el-table-column label="对方科目" prop="subject.name"></el-table-column>
            <el-table-column label="借方" prop="debitMoney"></el-table-column>
            <el-table-column label="贷方" prop="creditMoney"></el-table-column>
            <el-table-column label="金额" prop="money"></el-table-column>
        </el-table>
        <p></p>
    </div>
</template>

<script>
    export default {
        name: "BankAccountList",
        props: {
            accountList: Array,
            loading: Boolean,
        },
        data() {
            return {
                hideOnOne: true
            }
        },
        methods: {
        }
    }
</script>
