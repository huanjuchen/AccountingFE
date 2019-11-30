<template>
  <el-row v-bind:style="{height:100+'%'}">
    <el-col
      :xs="{offset:2,span:20}"
      :sm="{offset:4,span:16}"
      :md="{offset:6,span:12}"
      :lg="{offset:8,span:8}"
      :xl="{offset:9,span:6}"
      v-bind:style="{height:100+'%'}"
    >
      <div v-bind:style="{textAlign: 'center',marginTop:40+'%'}">
        <el-card>
          <div slot="header" class="clearfix">
            <span>
              <b>系统登录</b>
            </span>
          </div>
          <el-form :model="loginData" :rules="rules" ref="loginData" label-width="20%">
            <el-form-item prop="username" label="用户名">
              <el-input v-model="loginData.username"></el-input>
            </el-form-item>

            <el-form-item prop="password" label="密码">
              <el-input type="password" v-model="loginData.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                v-bind:style="{width:100+'%'}"
                @click="submitForm('loginData')"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { LoginApi } from "@/api/loginApi";
export default {
  name: "login",
  //-----
  data: function() {
    return {
      loginData: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      path: null
    };
  },
  //----
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          LoginApi(this.loginData.username, this.loginData.password)
            .then(response => {
              if (response && response.status == 200) {
                this.$message.success("登录成功!");
                sessionStorage.setItem("token", response.data.data.token);
                sessionStorage.setItem(
                  "user",
                  JSON.stringify(response.data.data.user)
                );
                if (this.path != null) {
                  this.$router
                    .push({
                      path: this.path
                    })
                    .catch(error => {
                      console.log(error);
                    });
                } else {
                  this.$router
                    .push({
                      name: "home"
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
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
    init() {
      let temp = null;
      // let temp = this.$router.params.lastPath;
      if (this.$router.params) {
        temp = this.$router.params.lastPath;
      }
      if (temp != null) {
        this.path = temp;
      }
      let token = sessionStorage.getItem("token");
      if (token != null) {
        this.$message.info("不需要重复登录");
        if (temp != null) {
          this.$router
            .push({
              path: temp
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$router
            .push({
              name: "home"
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  },
  //-----
  created: function() {
    this.init();
  }
};
</script>