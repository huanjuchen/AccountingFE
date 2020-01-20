<template>
  <div>
      <el-card :style="{textAlign:'center'}"><h2>创建的凭证
          <el-button type="primary" :style="{float:'right'}" @click="createVisible=true">创建</el-button>
          </h2>
      </el-card>
    <el-dialog title="创建凭证" width="90%" :visible.sync="createVisible" center>
    <proof-create/>
    </el-dialog>
  </div>
</template>

<script>
import ProofCreate from "../components/ProofCreate";
import { listByUserIdApi } from "../api/proofApi";

export default {
  name: "ProofView",

  data() {
    return {
      user: null,
      page: 1,
      proofList:[],

      createVisible:false,
    };
  },
  methods: {
    init() {
      let temp = sessionStorage.getItem("user");
      if (temp != null) {
        this.user = JSON.parse(temp);
      }

      this.getProofListByUserid();
    },
    getProofListByUserid() {
      listByUserIdApi(this.user.id, this.page)
        .then(response => {
        //   console.log(response);
            if(response&&response.status==200){
                this.proofList=response.data.data;
            }

        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    "proof-create": ProofCreate
  },

  created() {
    this.init();
  }
};
</script>