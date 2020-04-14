<template>
    <div>
        <el-card>
            月份
            <el-date-picker @change="monthChange" v-model="monthValue" type="month" size="small" placeholder="选择月">
            </el-date-picker>
            模式
            <el-select @change="selectValueChange1" size="small" v-model="selectedValue1">
                <el-option v-for="item in options1" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>
            审核状态
            <el-select @change="selectValueChange2" size="small" v-model="selectedValue2">
                <el-option v-for="item in options2" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>
            排序方式
            <el-select @change="doSortChange" size="small" v-model="orderType">
                <el-option v-for="item in sortOptions" :label="item.label" :key="item.value"
                           :value="item.value"></el-option>
            </el-select>
            <p style="text-align: center">
            <el-button size="small" type="primary" @click="doSelect">查看</el-button>
            <el-button size="small" type="primary" @click="queryParamReset">重置</el-button>
            <el-button size="small" type="primary" @click="createVisible=true">创建</el-button>
            </p>
        </el-card>
        <el-card :style="{marginTop:15+'px'}" v-if="proofList!=null&&proofList.length>0">
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
                rid: null,
                startDate: null,
                endDate: null,
                verify: -2,
                orderType: "dateDESC",
                page: 1,
                pageSize: 7,

                //
                selectedValue1: 1,
                selectedValue2: -2,

                monthValue: null,
                options1: [
                    {
                        label: "显示所有",
                        value: 1
                    },
                    {
                        label: "只看我",
                        value: 0
                    }
                ],
                options2: [
                    {
                        label: "查看所有",
                        value: -2
                    },
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
                    }

                ],
                sortOptions:[
                    {
                        label: "日期降序",
                        value: "dateDESC"
                    },
                    {
                        label:"日期升序",
                        value:"dateASC"
                    },
                    {
                        label:"凭证号降序",
                        value:"idDESC"
                    },
                    {
                        label:"凭证号升序",
                        value:"idASC"
                    }
                ],
            };
        },
        methods: {

            doSortChange(){
                this.getProofList();
            },

            monthChange(val) {
                let date = new Date(val);
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                let lastDay=this.$utils.getLastDay(year,month);
                if (month<10){
                    month="0"+month;
                }
                let ym=year+"-"+month;
                this.startDate=ym+"-"+"01";
                this.endDate=ym+"-"+lastDay;
                this.getProofList();
                this.getProofCount();
            },
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
                this.getProofList();
                this.getProofCount();
            },
            //稽查状态选择框值的改变
            selectValueChange2(val) {
                // console.log(val);
                this.verify = val;
                this.getProofList();
                this.getProofCount();
            },

            doSelect() {
                this.getProofCount();
                this.getProofList();
            },
            doCreateSuccess() {
                this.createVisible = false;
                this.getProofCount();
                this.getProofList();
            },
            init() {
                let temp = sessionStorage.getItem("user");
                if (temp != null) {
                    this.user = JSON.parse(temp);
                }

                this.monthValue=new Date();
                this.monthChange(this.monthValue);
                this.getProofCount();
                this.getProofList();

            },
            queryParamReset() {
                this.rid = null;
                this.startDate = null;
                this.endDate = null;
                // this.orderType = null;
                this.getProofCount();
                this.getProofList();
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