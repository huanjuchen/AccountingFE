<template>
  <el-card>
    <div style="text-align: center" slot="header" class="clearfix">
      <span>
        <b >系统登录</b>
      </span>
    </div>
    <el-form :model="loginData" :rules="rules" ref="loginData" label-width="25%">
      <el-form-item prop="username" label="用户名/编号">
        <el-input v-model="loginData.username"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="loginData.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-bind:style="{width:100+'%'}" @click="submitForm('loginData')">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { LoginApi } from "@/api/loginApi";
export default {
  name: "LoginBoard",

  data:function(){
      return{
        loginData: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名/编号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
      }
  },

  methods:{
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          LoginApi(this.loginData.username,this.loginData.password)
          .then(
            response=>{
              if(response){
                console.log(response);
                sessionStorage.setItem("token_id",response.data.data.tokenId);
                sessionStorage.setItem("user",JSON.stringify(response.data.data.user));
                this.loginData.username="";
                this.loginData.password="";
                this.$emit("success")
              }
            }
          );
          return true;
        }else{
          return false;
        }
        });
  }
  }

  
};
</script>