<template>
    <div>
        <el-table v-if="proofList!=null&&proofList.length!=0"
                  :data="proofList"
        >
            <el-table-column prop="id" label="编号" width="100"></el-table-column>
            <el-table-column label="日期" width="150">
                <template slot-scope="scope">
                    {{$utils.dateFormatter(scope.row.date)}}
                </template>
            </el-table-column>
            <el-table-column prop="invoiceCount" label="单据数" width="100"></el-table-column>
            <el-table-column label="稽查状态" width="125">
                <template slot-scope="scope">
                    {{$utils.getVerifyStatus(scope.row.verify)}}
                </template>
            </el-table-column>

            <el-table-column prop="recorder.name" label="制单人" width="150"></el-table-column>

            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="small" plain @click="viewDetails(scope.row.id)">查看</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "ProofList",
        props: {
            proofList: Array
        },
        data() {
            return {}
        },
        methods: {
            viewDetails(val) {
                console.log(val);
            }
        }
    }
</script>