<template>
    <div>
        <el-card class="proofCard">
            <div class="proofHeader">记账凭证</div>
            <div class="proofDate">
                <el-date-picker
                        v-model="proof.date"
                        align="center"
                        type="date"
                        format="yyyy年MM月dd日"
                        size="small"
                        prefix-icon="null"
                        placeholder="选择业务发生日期"
                ></el-date-picker>
                <div>
                    <el-table
                            style="width:100%"
                            :data="proof.items"
                            :style="{marginTop:15+'px'}"
                            size="medium"
                    >
                        <el-table-column label=" 摘 要 ">
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="proof.items[scope.$index].abstraction"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="借 方 科 目">
                            <el-table-column label="总账科目">
                                <template slot-scope="scope">
                                    <el-select
                                            size="mini"
                                            remote
                                            filterable
                                            placeholder="请输入科目代码或科目名检索"
                                            :loading="loading"
                                            :remote-method="doGetSubjectList"
                                            v-model="proof.items[scope.$index].debitLedgerSubjectId"
                                    >
                                        <el-option
                                                v-for="item in subjectList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="明细账科目">
                                <template slot-scope="scope">
                                    <el-select
                                            size="mini"
                                            remote
                                            filterable
                                            placeholder="请输入科目代码或科目名检索"
                                            :loading="loading"
                                            :remote-method="doGetSubjectList"
                                            v-model="proof.items[scope.$index].debitSubSubjectId"
                                    >
                                        <el-option
                                                v-for="item in subjectList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table-column>

                        <el-table-column label="贷 方 科 目">
                            <el-table-column label="总账科目">
                                <template slot-scope="scope">
                                    <el-select
                                            size="mini"
                                            remote
                                            filterable
                                            placeholder="请输入科目代码或科目名检索"
                                            :loading="loading"
                                            :remote-method="doGetSubjectList"
                                            v-model="proof.items[scope.$index].creditLedgerSubjectId"
                                    >
                                        <el-option
                                                v-for="item in subjectList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="明细账科目">
                                <template slot-scope="scope">
                                    <el-select
                                            size="mini"
                                            remote
                                            filterable
                                            placeholder="请输入科目代码或科目名检索"
                                            :loading="loading"
                                            :remote-method="doGetSubjectList"
                                            v-model="proof.items[scope.$index].creditSubSubjectId"
                                    >
                                        <div v-if="subjectList!=null">
                                            <el-option
                                                    v-for="item in subjectList"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id"
                                            ></el-option>
                                        </div>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table-column>

                        <el-table-column label="金额">
                            <template slot-scope="scope">
                                <el-input
                                        size="mini"
                                        type="number"
                                        v-model.number="proof.items[scope.$index].money"
                                ></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="box1">
                        &nbsp;附 单 据 :
                        <el-input
                                v-model="proof.invoiceCount"
                                type="number"
                                size="mini"
                                :style="{width:10+'%'}"
                        ></el-input>&nbsp;张
                        <div class="sum">合 计 :&nbsp;{{getSum}}</div>
                    </div>

                    <div class="box1">
                        会计主管人员：&nbsp;
                        <el-input size="mini" :style="{width:15+'%'}" v-model="proof.manager"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        记账: &nbsp;
                        <el-input size="mini" :style="{width:15+'%'}" v-model="proof.collection"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        出纳: &nbsp;
                        <el-input size="mini" :style="{width:15+'%'}" v-model="proof.cashier"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        交款人: &nbsp;
                        <el-input size="mini" :style="{width:15+'%'}" v-model="proof.payer"></el-input>&nbsp;&nbsp;
                    </div>
                </div>
            </div>

            <el-divider></el-divider>
            <div class="proofBottom">
                <el-button size="small" @click="addItemRow">添加一行</el-button>
                <el-button size="small" @click="removeItemRow">移除一行</el-button>
                <el-button size="small" @click="submitProof" type="primary">提 交</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {
        getSubjectListApi
    } from "../../api/subjectApi";

    import {createProofApi} from "../../api/proofApi";

    export default {
        name: "ProofCreate",
        //----------
        data() {
            return {
                subjectList: [],
                loading: false,

                proof: {
                    date: null, //业务发生日期
                    invoiceCount: null, //单据数
                    manager: null, //会计主管
                    collection: null, //记账人
                    cashier: null, //出纳人
                    payer: null, //交款人
                    items: [
                    ]
                }
            };
        },
        //------------
        methods: {
            test(val){
                console.log(val)
            },
            getStrut(){
                let obj={};
                obj.abstraction=null;//摘要
                obj.debitSubSubjectId=null;//借方明细账科目ID
                obj.creditSubSubjectId=null;//贷方明细账科目ID
                obj.debitLedgerSubjectId=null;//借方总账科目ID
                obj.creditLedgerSubjectId=null;//贷方总账科目ID
                obj.money=null;//金额
                return obj;
            }
            ,

            init() {
                for (let i = 0; i < 3; i++) {
                    this.proof.items.push(this.getStrut());
                }
            },

            doGetSubjectList(query) {
                if (query !== '') {
                    this.loading = true;
                    getSubjectListApi(query, true, null, "code", 1, 15)
                        .then(response => {
                            if (response && response.data.code === 200) {
                                this.subjectList = response.data.data;
                            }
                            this.loading = false
                        });
                }
            },

            //添加一行
            addItemRow() {
                this.proof.items.push(this.getStrut());
            },
            //移除一行
            removeItemRow() {
                this.proof.items.pop();
            },

            //提交凭证
            submitProof() {
                createProofApi(this.proof).then(response => {
                    if (response && response.data.code === 200) {
                        this.$message.success("创建成功");
                        this.proof.date = null;
                        this.proof.invoiceCount = null;
                        this.proof.manager = null;
                        this.proof.collection = null;
                        this.proof.cashier = null;
                        this.proof.payer = null;
                        this.proof.items = [];
                        this.addItemRow();
                        this.addItemRow();
                        this.addItemRow();
                        this.$emit("createSuccess");

                    }
                });
            }
        },
        //-------------

        computed: {
            //计算总金额
            getSum() {
                let sum = 0;
                if (this.proof.items != null && this.proof.items.length !== 0) {
                    for (let i = 0; i < this.proof.items.length; i++) {
                        if (this.proof.items[i].money != null) {
                            sum = sum + this.proof.items[i].money;
                        }
                    }
                }
                return sum;
            }
        },
        //----
        created() {
            this.init();
        }
    };
</script>

<style>
    .proofCard {
        width: 1080px;
        margin-left: auto;
        margin-right: auto;
    }

    .proofHeader {
        text-align: center;
        line-height: 1.7;
        font-size: 20px;
        font-weight: bold;
    }

    .proofDate {
        margin-top: 10px;
        text-align: center;
    }

    .proofBottom {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .box1 {
        line-height: 48px;
        text-align: left;
        margin-top: 5px;
        width: 100%;
        border: 1px #eceff1 solid;
    }

    .sum {
        float: right;
        margin-right: 15px;
    }
</style>