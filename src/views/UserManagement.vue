<template>
  <div>
    <el-card>
      <el-input
        size="medium"
        placeholder="请输入查找的用户名..."
        v-model="searchText"
        v-bind:style="{width:40+'%'}"
      ></el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="medium" type="primary">
        <i class="el-icon-search"></i> 搜 索
      </el-button>
      <el-button size="medium" type="primary">
        <i class="el-icon-warning-outline"></i>
        重 置
      </el-button>
      <el-button size="medium" type="primary" @click="showCreateDialog()">
        <i class="el-icon-plus"></i> 添 加
      </el-button>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="480px" center>
      <el-form :model="userForm" ref="userForm" :rules="userFormRules">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="userForm.role" placeholder="请选择用户类型" v-bind:style="{width:100+'%'}">
            <el-option label="会计" value="3"></el-option>
            <el-option label="主管会计" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input placeholder="手机号" v-model="userForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userForm')">添 加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="创建成功" :visible.sync="userInfoShowDialog" width="480px" center>
      <div v-if="userInfo!=null">
        <p>
          <b>用户ID：</b>
          {{userInfo.id}}
        </p>
        <p> 
          <b>用户名：</b>
          {{userInfo.username}}
        </p>
        <p>
          <b>用户密码：</b>12345678
        </p>
        <p>
          <b>用户类型：</b>
          {{userRole(userInfo.role)}}
        </p>
        <p>
          <b>创建日期：</b>
          {{dateFormatter(userInfo.joinTime)}}
        </p>
        <p>
          <b>手机号：</b>
          {{userInfo.phone}}
        </p>
      </div>
    </el-dialog>

    <el-card v-if="userList!=null" :style="{marginTop:2+'%'}">
      <user-list :userList="userList"/>
    </el-card>
  </div>
</template>

<script>
import { createUserApi, getUserListApi } from "../api/userApi";

import UserList from "@/components/UserList";
export default {
  name: "UserManagement",
  data: function() {
    return {
      searchText: "", //搜索栏数据
      dialogFormVisible: false, //是否显示新建用户对话框
      userInfoShowDialog: false, //是否显示用户详细信息对话框
      userInfo: null, //用于用户详细信息展示的数据
      userList: null, //传递给子组件的列表的数据
      userForm: {
        //新建用户对话框的表单数据
        username: "",
        role: null,
        phone: null
      },
      userFormRules: {
        //表单验证的数据
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        role: [
          {
            required: true,
            message: "请选择用户类型",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    "user-list": UserList
  },

  //-----
  methods: {
    //提交创建用户表单
    submitForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          createUserApi(this.userForm.username, this.userForm.role,this.userForm.phone)
            .then(response => {
              if (response && response.status == 200) {
                this.userForm.username = null;
                this.userForm.role = null;
                this.userForm.phone=null;
                this.userInfo = response.data.data;
                this.userInfoShowDialog = true;
                this.refreshUserList();
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    //显示创建用户窗口
    showCreateDialog() {
      this.userInfo = null;

      this.dialogFormVisible = true;
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
    //日期格式化
    dateFormatter(val) {
      let date = new Date(val);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },

    refreshUserList(){
        getUserListApi(1)
        .then(response => {
          if (response && response.status == 200) {
            this.userList = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //初始化获取数据
    init() {
      this.userInfo = null;
      this.refreshUserList();
      
    }
  },
  //------

  created: function() {
    this.init();
  }
};
</script>