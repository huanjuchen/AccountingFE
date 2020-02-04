<template>
    <div>
        <el-card>
            日期范围：
            <el-date-picker
                    @change="rangeDateChange"
                    v-model="rangeDate"
                    type="daterange"
                    size="small"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>


            <el-button size="small" type="primary">筛选</el-button>

            <el-button size="small" type="primary" :style="{float:'right'}" @click="createVisible=true">创建</el-button>
        </el-card>

        <el-card :style="{marginTop:15+'px'}">
            <proof-list :proof-list="proofList"/>
        </el-card>

        <el-dialog title="创建凭证" width="90%" :visible.sync="createVisible" fullscreen center>
            <proof-create @createSuccess="doCreateSuccess"/>
        </el-dialog>
    </div>
</template>

<script>
    import ProofCreate from "../components/proofView/ProofCreate";
    import ProofList from "../components/proofView/ProofList";
    import {getProof} from "../api/proofApi";

    export default {
        name: "ProofView",

        data() {
            return {
                user: null,
                proofList: [],
                createVisible: false,

                //queryParam
                rangeDate: null,
                rid: null,
                startDate: null,
                endDate: null,
                verify: null,
                orderType: "idDESC",
                page: 1,
                pageSize: 5,


                //
                options1: [
                    {
                        label: "只看我",
                        value: "0"
                    },
                    {
                        label: "所有",
                        value: "1"
                    }
                ],
                options2: [
                    {
                        label: "只看我",
                        value: "0"
                    },
                    {
                        label: "审核通过",
                        value: "1"
                    },
                    {
                        label: "审核未通过",
                        value: "1"
                    }
                ]

            };
        },
        methods: {
            doCreateSuccess() {
                this.createVisible = false;
            },
            init() {
                let temp = sessionStorage.getItem("user");
                if (temp != null) {
                    this.user = JSON.parse(temp);
                    this.rid = this.user.id;
                }
                this.getProofList();

            },
            rangeDateChange() {
                if (this.rangeDate != null) {
                    this.startDate = this.rangeDate[0];
                    this.endDate = this.rangeDate[1];
                } else {
                    this.startDate = null;
                    this.endDate = null;
                }
            },
            queryParamReset() {
                this.rid = null;
                this.startDate = null;
                this.endDate = null;
                this.orderType = null;
            },
            getProofList() {
                getProof(this.rid, this.startDate, this.endDate,
                    this.verify, this.orderType,
                    this.page, this.pageSize).then(response => {
                    if (response && response.data.code === 200) {
                        this.proofList = response.data.data;
                    }
                });
            }
        },
        components: {
            "proof-create": ProofCreate,
            "proof-list": ProofList
        },

        created() {
            this.init();
        }
    };
</script>