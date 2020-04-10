<template>
    <div>
        <el-card>
            日期范围
            <el-date-picker @change="rangeDateChange" v-model="rangeDate" type="daterange" size="small"
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            模式
            <el-select @change="selectValueChange1" size="small" v-model="selectedValue1">
                <el-option v-for="item in options1" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>

            稽查状态
            <el-select @change="selectValueChange2" size="small" v-model="selectedValue2">
                <el-option v-for="item in options2" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>&nbsp;&nbsp;&nbsp;
            <el-button size="small" type="primary" @click="doSelect">筛选</el-button>
            <el-button size="small" type="primary">重置</el-button>
            <el-button size="small" type="primary" @click="createVisible=true">创建</el-button>
        </el-card>
        <el-card :style="{marginTop:15+'px'}">
            <proof-list :page="page" :page-size="pageSize" :loading="loading" :proof-total="proofTotal" :user="user"
                        :proof-list="proofList" @viewDetail="doViewDetail" @verifyProof="doVerifyProof"
                        @pageChange="doPageChange" @pageSizeChange="doPageSizeChange" @trashProof="doTrash"/>
        </el-card>

        <el-dialog title="创建凭证" :visible.sync="createVisible" fullscreen center>
            <proof-create @createSuccess="doCreateSuccess"/>
        </el-dialog>
        <el-dialog width="75%" :visible.sync="detailVisible" center>
            <proof-detail :proof="proof"/>
        </el-dialog>
    </div>
</template>

<script>
    import ProofCreate from "../components/proofView/ProofCreate";
    import ProofList from "../components/proofView/ProofList";
    import ProofDetail from "../components/proofView/ProofDetail";
    import {getProof, getProofCountApi, getProofByIdApi, verifyProofApi, trashProofApi} from "../api/proofApi";

    export default {
        name: "ProofView",

        data() {
            return {
                user: null,
                proofList: [],
                proofTotal: 0,
                createVisible: false,
                detailVisible: false,
                proof: null,
                loading: false,

                //queryParam
                rangeDate: null,
                rid: null,
                startDate: null,
                endDate: null,
                verify: -2,
                orderType: "idDESC",
                page: 1,
                pageSize: 7,

                //
                selectedValue1: 0,
                selectedValue2: 0,
                options1: [
                    {
                        label: "只看我",
                        value: 0
                    },
                    {
                        label: "显示所有",
                        value: 1
                    }
                ],
                options2: [
                    {
                        label: "待审核",
                        value: 0
                    },
                    {
                        label: "审核通过",
                        value: 1
                    },
                    {
                        label: "审核未通过",
                        value: -1
                    },
                    {
                        label: "查看所有",
                        value: -2
                    }
                ]
            };
        },
        methods: {
            doTrash(val) {
                console.log(val);
                trashProofApi(val).then(response => {
                    if (response && response.data.code === 200) {
                        this.$message.success("提交成功, 等待审核！");
                        this.getProofList();
                        this.getProofCount();
                    }
                });
            },

            doVerifyProof(proofId, result) {
                let obj = {
                    id: proofId,
                    result: result
                };
                verifyProofApi(obj)
                    .then(response => {
                        if (response && response.data.code === 200) {
                            this.$message.success("审核完成");
                        }
                        this.getProofCount();
                        this.getProofList();
                    });


            },
            doPageChange(val) {
                this.page = val;
                this.getProofList();
            },
            doPageSizeChange(val) {
                this.pageSize = val;
                this.getProofList();
            },
            //模式值的改变
            selectValueChange1(val) {
                if (val === 0) {
                    this.rid = this.user.id;
                } else if (val === 1) {
                    this.rid = null;
                }
            },
            //稽查状态选择框值的改变
            selectValueChange2(val) {
                // console.log(val);
                this.verify = val;
            },

            doSelect() {
                this.getProofCount();
                this.getProofList();
            },
            doCreateSuccess() {
                this.createVisible = false;
            },
            init() {
                let temp = sessionStorage.getItem("user");
                if (temp != null) {
                    this.user = JSON.parse(temp);
                    this.rid = this.user.id;
                }
                this.getProofCount();
                this.getProofList();

            },
            rangeDateChange() {
                if (this.rangeDate != null) {
                    // this.startDate = this.rangeDate[0];
                    this.startDate = this.$utils.dateFormatter(this.rangeDate[0]);
                    this.endDate = this.$utils.dateFormatter(this.rangeDate[1]);
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
                this.loading = true;
                getProof(this.rid, this.startDate, this.endDate,
                    this.verify, this.orderType,
                    this.page, this.pageSize).then(response => {
                    if (response && response.data.code === 200) {
                        this.proofList = response.data.data;
                    }
                    this.loading = false;
                });
            },
            // getPoofById(){
            //
            // },
            doViewDetail(val) {
                getProofByIdApi(val).then(response => {
                    if (response && response.data.code === 200) {
                        this.proof = response.data.data;
                        this.detailVisible = true;

                    }
                })
            },

            getProofCount() {
                getProofCountApi(this.rid, this.startDate, this.endDate, this.verify).then(
                    response => {
                        if (response && response.data.code === 200) {
                            this.proofTotal = response.data.data;
                        }
                    }
                );
            }
        },
        components: {
            "proof-create": ProofCreate,
            "proof-list": ProofList,
            "proof-detail": ProofDetail
        },

        created() {
            this.init();
        }
    };
</script>