<template>
  <el-container v-bind:style="{height:100+'%'}">
    <el-aside v-bind:style="{height:100+'%',width:20+'%'}">
      <div v-bind:style="{height:100+'%',backgroundColor:'#212121'}">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="activeIndex"
          background-color="#424242"
          text-color="#fff"
          menu-trigger="click"
        >
          <el-menu-item></el-menu-item>
          <el-menu-item index="dashborad">Dashborad</el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <span>凭证管理</span>
            </template>

            <el-menu-item index="searchProof">查看凭证</el-menu-item>

            <el-menu-item index="checkProof">凭证审核</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <span>查看账簿</span>
            </template>

            <el-menu-item index="cashAccount">现金日记账</el-menu-item>

            <el-menu-item index="bankAccount">银行日记账</el-menu-item>

            <el-menu-item index="subAccount">明细分类账</el-menu-item>

            <el-menu-item index="ledgerAccount">总分类账</el-menu-item>
          </el-submenu>

          <el-menu-item index="subjectManagement">科目管理</el-menu-item>

          <el-menu-item
            v-if="user!=null&&user.role==1"
            index="userManagement"
            @click="pushToAddr('/userManagement')"
          >用户管理</el-menu-item>

          <el-menu-item index="userCenter">个人中心</el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu mode="horizontal">
          <el-menu-item v-bind:style="{float:'right'}" v-if="user!=null">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{user.username}}
                <i class="el-icon-user"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                <el-dropdown-item command="userLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>

          <el-menu-item v-bind:style="{float:'right'}" v-if="user==null">
            <span class="el-dropdown-link">
              请先登录
              <i class="el-icon-user"></i>
            </span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  //----
  data: function() {
    return {
      user: null,
      activeIndex: "dashborad"
    };
  },
  //----
  methods: {
    init() {
      let temp = sessionStorage.getItem("user");
      if (temp != null) {
        this.user = JSON.parse(temp);
      }
    },
    dateFormatter(val) {
      let date = new Date(val);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    handleCommand(command) {

      if (command == "userLogout") {
        this.logout();
      }

      if(command=="userCenter"){
        console.log("跳转到个人中心");
        
      }
    },
    logout() {
      if (sessionStorage.getItem("token")) {
        sessionStorage.removeItem("token");
      }

      if (sessionStorage.getItem("user")) {
        sessionStorage.removeItem("user");
      }

      this.$router.push("/login").catch(error=>{
        console.log(error);
        
      });
      this.$message.info("已退出登录");
    },

    pushToAddr(addr) {
      this.$router.push(addr).catch(error=>{
        console.log(error);
        
      });
    },
    changeIndex() {
      let path = this.$route.path;
      this.activeIndex = path.substring(1, path.length);
    }
  },
  //-----
  created: function() {
    this.init();
    this.changeIndex();
  },
  beforeUpdate() {
    this.changeIndex();
  }
};
</script>