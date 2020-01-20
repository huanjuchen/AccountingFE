<template>
  <div>
    <!-- <el-card v-for="item in userList" v-bind:key="item.id">

    </el-card>-->
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="100" fixed="left"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column label="创建日期" width="200">
        <template slot-scope="scope">{{$utils.dateFormatter(scope.row.joinTime)}}</template>
      </el-table-column>
      <el-table-column label="用户类型" width="150">
        <template slot-scope="scope">{{$utils.getRole(scope.row.role)}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="360">
        <template slot-scope="scope">
          <el-button size="medium" plain @click="viewDetails(scope.row)">查看</el-button>
          <el-button size="medium" type="danger" @click="resetPwd(scope.row.id)" plain>重置密码</el-button>
          <el-button size="medium" type="danger" plain>注销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详细信息" :visible.sync="infoDialog" width="360px" center>
      <user-detail :userInfo="info"/>
    </el-dialog>
  </div>
</template>

<script>
import UserDetail from "./UserDetail"

export default {
  name: "UserList",
  props: ["userList"],
  //-----
  data: function() {
    return {
      infoDialog: false,
      info: null
    };
  },
  components:{
    "user-detail":UserDetail
  },
  //-----
  methods: {
    viewDetails(val) {
      // console.log(val);
      this.info = val;
      this.infoDialog = true;
    },
    resetPwd(userId){
      this.$emit("resetPwd",userId)
    }
  }
};
</script>