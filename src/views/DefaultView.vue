<template>
    <div>
        <el-row>
            <el-col :offset="6" :span="12">
                <el-card>
                    <div style="text-align: center">
                        <h3>公告</h3>
                    </div>
                    <information-list :list="informationList" :page="page" :page-size="pageSize" :loading="loading"
                                      :total="count"
                                      @pageChange="doPageChange" @pageSizeChange="doPageSizeChange"
                                      @viewDetails="doViewDetails">
                    </information-list>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="dialog" title="公告" width="420px">
            <information-details :information="information"></information-details>
        </el-dialog>
    </div>

</template>

<script>
    // import DefaultInformationList from "../components/defaultView/DefaultInformationList"
    import InformationDetails from "../components/informationCenter/InformationDetails"
    import InformationList from "../components/defaultView/InformationList"
    import {listApi, countApi, getInformationApi} from "../api/informationCenterApi";

    export default {
        name: "DefaultView",
        data() {
            return {
                page: 1,
                pageSize: 5,
                loading: false,

                informationList: [],
                count: 0,
                information: null,

                dialog: false

            }
        },
        methods: {
            init() {
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
            getList() {
                this.loading = true;
                listApi(null, this.page, this.pageSize).then(response => {
                    if (response && response.data.code === 200) {
                        this.informationList = response.data.data;
                    }
                    this.loading = false;
                })
            },

            getCount() {
                countApi(null).then(response => {
                    if (response && response.data.code === 200) {
                        this.count = response.data.data;
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
            }
        },
        components: {
            "information-details": InformationDetails,
            "information-list": InformationList
        },
        created() {
            this.init();
        }
    }
</script>