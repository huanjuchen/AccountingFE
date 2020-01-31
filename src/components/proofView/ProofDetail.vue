<template>
  <div>
    <el-card v-if="proof!=null">
      <div class="proofTitle">记 账 凭 证</div>
      <div class="proofDate"></div>
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

  methods: {}
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
</style>