<template>
  <div>
    <!-- <el-card v-for="item in userList" v-bind:key="item.id">

    </el-card>-->
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="100" fixed="left"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column label="创建日期" width="200">
        <template slot-scope="scope">{{dateFormatter(scope.row.joinTime)}}</template>
      </el-table-column>
      <el-table-column label="用户类型" width="150">
        <template slot-scope="scope">{{userRole(scope.row.role)}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="360">
        <template slot-scope="scope">
          <el-button size="medium" plain @click="viewDetails(scope.row)">查看</el-button>
          <el-button size="medium" type="danger" plain>重置密码</el-button>
          <el-button size="medium" type="danger" plain>注销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详细信息" :visible.sync="infoDialog" width="360px" center>
      <div v-if="info!=null">
        <p>
          <b>用户ID：</b>
          {{info.id}}
        </p>
        <p>
          <b>用户名：</b>
          {{info.username}}
        </p>

        <p>
          <b>用户类型：</b>
          {{userRole(info.role)}}
        </p>
        <p>
          <b>创建日期：</b>
          {{dateFormatter(info.joinTime)}}
        </p>
        <p>
          <b>手机号：</b>
          {{info.phone}}
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
  //-----
  methods: {
    //日期格式化
    dateFormatter(val) {
      let date = new Date(val);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    //输出角色类型
    userRole(role) {
      if (role == 1) {
        return "超级管理员";
      } else if (role == 2) {
        return "主管会计";
      } else {
        return "会计";
      }
    },
    viewDetails(val) {
      // console.log(val);
      this.info = val;
      this.infoDialog = true;
    }
  }
};
</script>