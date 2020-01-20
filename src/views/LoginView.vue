<template>
  <div class="loginBar">
    <login-board @success="loginSuccess" />
  </div>
</template>

<script>
import LoginBoard from "../components/login/LoginBoard";
export default {
  name: "LoginView",
  data: function() {
    return {
      path: ""
    };
  },
  methods: {
    init() {
      let temp = null;
      if (this.$router.params) {
        temp = this.$router.params.lastPath;
      }
      if (temp != null) {
        this.path = temp;
      }

      let tokenId = sessionStorage.getItem("token_id");
      if (tokenId != null && tokenId != "") {
        this.$message.warning("不需要重复登录");
        if (temp != null && temp != "") {
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
    },

    loginSuccess() {
      this.$message.success("登录成功");
      if (this.path != null&&this.path!="") {
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
  },

  computed: {},

  components: {
    "login-board": LoginBoard
  },

  created: function() {
    this.init();
  }
};
</script>

<style>
.loginBar {
  margin: auto;
  width: 480px;
  padding-top: 10%;
}
</style>