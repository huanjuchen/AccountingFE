<template>
    <div>
        <el-table :data="accountList" v-if="accountList!=null&&accountList.length>0">
            <el-table-column label="日期">
                <template slot-scope="scope">
                    {{$utils.dateFormatter(scope.row.date)}}
                </template>
            </el-table-column>
            <el-table-column label="凭证号" prop="proofId"></el-table-column>
            <el-table-column label="摘要" prop="abstraction"></el-table-column>
            <el-table-column label="对方科目" prop="subject.name"></el-table-column>
            <el-table-column label="借方" prop="debitMoney"></el-table-column>
            <el-table-column label="贷方" prop="creditMoney"></el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination v-loading="loading" @size-change="pageSizeChange" @current-change="pageChange" background :total="total"
                           :page-sizes="[5,7,10,15]"
                           :page-size="pageSize"
                           layout="prev, pager, next,sizes,total"></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BankAccountList",
        props:{
            accountList:Array,
            total:Number,
            loading: Boolean,
            page:Number,
            pageSize:Number
        },
        methods:{
            pageSizeChange(val) {
                this.$emit("pageSizeChange", val);
            },
            pageChange(val) {
                this.$emit("pageChange", val);
            }
        }
    }
</script>
