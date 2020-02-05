<template>
    <div>
        <el-card v-if="proof!=null">
            <div class="proofTitle">记 账 凭 证</div>
            <div class="proofDate">{{this.$utils.dateFormatter(proof.date)}}</div>
            <el-table
                    style="width: 100%"
                    :data="proof.items"
                    :style="{marginTop:15+'px'}">
                <el-table-column label=" 摘 要 " prop="abstraction">
                </el-table-column>
                <el-table-column label="借 方 科 目">
                    <el-table-column label="总账科目" prop="debitLedgerSubject.name">
                    </el-table-column>
                    <el-table-column label="明细账科目" prop="debitSubSubject.name">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="贷 方 科 目" width="400">
                    <el-table-column label="总账科目" prop="creditLedgerSubject.name">
                    </el-table-column>
                    <el-table-column label="明细账科目" prop="creditSubSubject.name">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="金额" prop="money">
                </el-table-column>
                <el-table-column label="记账标识">
                    <template slot-scope="scope">
                        {{scope.row.charge?"√":""}}
                    </template>
                </el-table-column>
            </el-table>

            <div class="box1">
                &nbsp;<b>&nbsp;&nbsp;附 单 据 :</b>
                {{proof.invoiceCount}}&nbsp;张
                <div class="sum"><b>合 计 :</b>&nbsp;{{getSum}}</div>
            </div>

            <div class="box1">
                <el-row>
                    <el-col :span="4">
                        <b>&nbsp;&nbsp;会计主管人员：</b>{{proof.manager}}
                    </el-col>
                    <el-col :span="4">
                        <b>记账: </b>{{proof.collection}}
                    </el-col>
                    <el-col :span="4">
                        <b>出纳: </b>{{proof.cashier}}
                    </el-col>
                    <el-col :span="4">
                        <b>交款人: </b>{{proof.payer}}
                    </el-col>
                    <el-col :span="4">
                        <b>制单人: </b>{{proof.recorder.name}}
                    </el-col>
                    <el-col :span="4">
                        <b>稽核: </b>
                        {{proof.verifyUser==null?"":proof.verifyUser.name}}
                    </el-col>
                </el-row>
            </div>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "ProofDetail",
        props: {
            proof: Object
        },

        data() {
            return {};
        },

        methods: {},
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
        }
    };
</script>

<style>
    .proofTitle {
        text-align: center;
        line-height: 1.7;
        font-size: 20px;
        font-weight: bold;
    }

    .proofDate {
        margin-top: 10px;
        text-align: center;
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