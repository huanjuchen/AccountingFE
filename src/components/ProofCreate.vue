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

        <el-table style="width:100%" :data="proof.items" :style="{marginTop:15+'px'}">
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
                  v-model="proof.items[scope.$index].debitLedgerSubjectId"
                  placeholder="请选择"
                >
                  <div v-if="sujectList!=null">
                    <el-option
                      v-for="item in sujectList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </div>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="明细账科目">
              <template slot-scope="scope">
                <el-select
                  size="mini"
                  v-model="proof.items[scope.$index].debitSubSubjectId"
                  placeholder="请选择"
                >
                  <div v-if="sujectList!=null">
                    <el-option
                      v-for="item in sujectList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </div>
                </el-select>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="贷 方 科 目">
            <el-table-column label="总账科目">
              <template slot-scope="scope">
                <el-select
                  size="mini"
                  v-model="proof.items[scope.$index].creditSubSubjectId"
                  placeholder="请选择"
                >
                  <div v-if="sujectList!=null">
                    <el-option
                      v-for="item in sujectList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </div>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="明细账科目">
              <template slot-scope="scope">
                <el-select
                  size="mini"
                  v-model="proof.items[scope.$index].creditSubSubjectId"
                  placeholder="请选择"
                >
                  <div v-if="sujectList!=null">
                    <el-option
                      v-for="item in sujectList"
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
              <el-input size="mini" type="number" v-model="proof.items[scope.$index].money"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-divider></el-divider>
      <div class="proofBottom">
          <el-button size="small" @click="addItemRow">添加一行</el-button>
          <el-button size="small" @click="removeItemRow">移除一行</el-button>
          <el-button size="small" type="primary">提 交</el-button>
      </div>



    </el-card>
  </div>
</template>

<script>
import { getAvailableSubjectListApi } from "../api/subjectApi";

export default {
  name: "ProofCreate",
  //----------
  data() {
    return {
      sujectList: null,
      proof: {
        date: null, //业务发生日期
        invocieCount: null, //单据数
        manager: null, //会计主管
        collection: null, //记账人
        recorderId: null, //制单人
        cashier: null, //出纳人
        payer: null, //交款人
        items: [
          {
            abstraction: null, //摘要
            debitSubSubjectId: null, //借方明细账科目ID
            creditSubSubjectId: null, //贷方明细账科目ID
            debitLedgerSubjectId: null, //借方总账科目ID
            creditLedgerSubjectId: null, //贷方总账科目ID
            money: null //金额
          },
          {
            abstraction: null,
            debitSubSubjectId: null,
            creditSubSubjectId: null,
            debitLedgerSubjectId: null,
            creditLedgerSubjectId: null,
            money: null
          },
          {
            abstraction: null,
            debitSubSubjectId: null,
            creditSubSubjectId: null,
            debitLedgerSubjectId: null,
            creditLedgerSubjectId: null,
            money: null
          }
        ]
      },
      proofItemStrut: {
        abstraction: null,
        debitSubSubjectId: null,
        creditSubSubjectId: null,
        debitLedgerSubjectId: null,
        creditLedgerSubjectId: null,
        money: null
      }
    };
  },
  //------------
  methods: {
    init() {},
    getAvailableSujectList() {
      getAvailableSubjectListApi()
        .then(response => {
          console.log(response);
          if (response && response.status == 200)
            this.sujectList = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },


    addItemRow(){
      this.proof.items.push(this.proofItemStrut);

    },

    removeItemRow(){
      this.proof.items.pop();
    },

    submitProof(){

    }


  },
  //-------------

  created() {
    this.getAvailableSujectList();
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

.proofBottom{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>