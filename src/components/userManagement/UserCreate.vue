<template>
  <div>
    <el-form :model="userForm" ref="userForm" :rules="userFormRules">
      <el-form-item prop="username">
        <el-input placeholder="登录名" v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input placeholder="姓名" v-model="userForm.name"></el-input>
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
      <el-form-item>
        <div :style="{textAlign:'center'}">
          <p><b>新用户默认密码为：12345678</b></p>
          <el-button @click="doCancel">取 消</el-button>
          <el-button type="primary" @click="submitForm('userForm')">添 加</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createUserApi } from "../../api/userApi";
export default {
  name: "UserCreate",
  data: function() {
    return {
      userForm: {
        //新建用户对话框的表单数据
        username: "",
        name: "",
        role: null,
        phone: ""
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
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          createUserApi(this.userForm)
            .then(response => {
              if (response) {
                this.userForm.username = "";
                this.userForm.role = null;
                this.userForm.phone = "";
                this.userForm.name="";
                let temp=response.data.data;
                // this.$message.success("用户 "+temp.username+" 创建成功");
                this.$emit("success",temp);
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

    doCancel() {
      this.$emit("cancelCreate");
    }
  }
};
</script>