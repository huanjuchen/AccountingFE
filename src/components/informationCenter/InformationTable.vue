<template>
    <div>
        <el-table :data="list" v-loading="loading">
            <el-table-column label="时间">
                <template slot-scope="scope">
                    {{$utils.timeFormatter(scope.row.time)}}
                </template>
            </el-table-column>
            <el-table-column label="内容">
                <template slot-scope="scope">
                    {{informationDesc(scope.row.content)}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="viewInformation(scope.row.id)">查看</el-button>
                    <el-button size="small" @click="deleteInformation(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination @size-change="pageSizeChange" @current-change="pageChange" background
                           :total="total"
                           :page-sizes="[5,7,10,15]"
                           :page-size="pageSize"
                           layout="prev, pager, next,sizes,total"></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InformationTable",
        props: {
            list: Array,
            total: Number,
            page: Number,
            pageSize: Number,
            loading: Boolean
        },
        methods: {
            informationDesc(val) {
                if (val != null && val.length > 0) {
                    if (val.length > 20) {
                        return val.substring(0, 20) + "...";
                    } else {
                        return val;
                    }
                } else {
                    return "";
                }
            },
            pageSizeChange(val) {
                this.$emit("pageSizeChange", val);
            },
            pageChange(val) {
                this.$emit("pageChange", val);
            },
            viewInformation(val) {
                this.$emit("view", val);
            },
            deleteInformation(val) {

                this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("delete", val);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }

        }
    }
</script>