<template>
    <div>
        <el-card>
            <div slot="header">
                <el-button icon="el-icon-plus" size="medium" type="primary" @click="doPush">新公告</el-button>
            </div>
            <information-table :page="page" :page-size="pageSize" :loading="loading" :total="count"
                               :list="informationList"
                               @pageChange="doPageChange" @pageSizeChange="doPageSizeChange"
                               @view="doViewDetails" @delete="doDelete"
            ></information-table>
        </el-card>
        <el-dialog :visible.sync="dialog" title="公告" width="420px">
            <information-details :information="information"></information-details>
        </el-dialog>
    </div>
</template>

<script>
    import {pushApi, listApi, countApi, getInformationApi, deleteApi} from "../api/informationCenterApi";
    import InformationTable from "../components/informationCenter/InformationTable";
    import InformationDetails from "../components/informationCenter/InformationDetails"

    export default {
        name: "InformationCenterView",
        data() {
            return {
                page: 1,
                pageSize: 5,
                user: null,
                loading: false,

                informationList: [],
                count: 0,
                information: null,

                dialog: false,

            }
        },
        methods: {
            init() {
                let temp = sessionStorage.getItem("user");
                if (temp != null) {
                    this.user = JSON.parse(temp);
                }
                this.getList();
                this.getCount();
            },

            doViewDetails(val) {
                getInformationApi(val).then(response => {
                    if (response && response.data.code === 200) {
                        this.information = response.data.data;
                        this.dialog = true;
                    }
                })
            },

            doDelete(val) {

                deleteApi(val).then(response => {
                    if (response && response.data.code === 200) {
                        this.$message.success("删除成功");
                        this.getCount();
                        this.getList();
                    }
                })
            },

            doPageChange(val) {
                this.page = val;
                this.getList();
            },
            doPageSizeChange(val) {
                this.pageSize = val;
                this.getList();
            },

            doPush() {
                this.$prompt('请输入新公告', '提示', {
                    confirmButtonText: '推送',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    pushApi(value).then(response => {
                        if (response && response.data.code === 200) {
                            this.$message.success("推送成功");
                            this.getList();
                            this.getCount();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消推送'
                    });
                });
            },
            getList() {
                this.loading = true;
                listApi(this.user.id, this.page, this.pageSize).then(response => {
                    if (response && response.data.code === 200) {
                        this.informationList = response.data.data;
                    }
                    this.loading = false;
                })
            },

            getCount() {
                countApi(this.user.id).then(response => {
                    if (response && response.data.code === 200) {
                        this.count = response.data.data;
                    }
                })
            }
        },
        components: {
            "information-table": InformationTable,
            "information-details": InformationDetails
        },

        created() {
            this.init();
        }
    }
</script>