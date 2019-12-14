<template>
  <div>
    <el-card class="proofCard">
      <div class="proofHeader">收款记账凭证</div>
      <div class="proofDate">
        <el-date-picker
          v-model="date"
          align="center"
          type="date"
          format="yyyy年MM月dd日"
          size="small"
          prefix-icon="null"
          placeholder="选择业务发生日期"
        ></el-date-picker>
      </div>
      <el-row :style="{textAlign:'center',marginTop:10+'px'}" class="boxBorder">
        <el-col :span="6">
          <div class="boxBorder proofBoxHeader">摘 要</div>
        </el-col>
        <el-col :span="2">
          <div class="boxBorder proofBoxHeader">结算方式</div>
        </el-col>
        <el-col :span="4">
          <div class="boxBorder proofBoxHeader">总账科目</div>
        </el-col>
        <el-col :span="4">
          <div class="boxBorder proofBoxHeader">明细账科目</div>
        </el-col>
        <el-col :span="6">
          <div class="boxBorder proofBoxHeader">金 额</div>
        </el-col>
        <el-col :span="2">
          <div class="boxBorder proofBoxHeader">记账符号</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CollectionProof",
  data() {
    return {
      date: null
    };
  }
};
</script>

<style type="text/css">
.proofCard {
  width: 720px;
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

.proofBoxHeader {
  width: 100%;
  height: 50px;
  text-align: center;
}

.boxBorder {
  border-width: 1px;
  border-color: black;
  border-style: solid;
}
</style>