<template>
  <el-menu mode="horizontal">
    <el-menu-item v-bind:style="{float:'right'}" v-if="user!=null">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{user.username}}
          <i class="el-icon-user"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>

      <form enctype="application/x-www-form-urlencoded">

      </form>

    <el-menu-item v-bind:style="{float:'right'}" v-if="user==null">
      <span class="el-dropdown-link">
        <router-link to="/login">请先登录</router-link>
        <i class="el-icon-user"></i>
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {LogoutApi} from "../../api/loginApi"
export default {
  name: "TopBar",

  data: function() {
    return {
      user: null
    };
  },

  methods: {
    init() {
      let temp = sessionStorage.getItem("user");
      if (temp != null) {
        this.user = JSON.parse(temp);
      }
    },

    handleCommand(command) {
      if (command === "userLogout") {
        this.logout();
      }
    },

    logout() {
        LogoutApi().then(response=>{
            if(response){
                if(sessionStorage.getItem("token_id")){
                    sessionStorage.removeItem("token_id");
                }

                if(sessionStorage.getItem("user")){
                    sessionStorage.removeItem("user");
                }
                this.$message.success("已退出登录");
                this.$router.push({
                    path:"/login"
                }).catch(error=>{
                    console.log(error);
                    
                })
            }
        })
    }
  },

  created:function(){
      this.init();
  }
};
</script>