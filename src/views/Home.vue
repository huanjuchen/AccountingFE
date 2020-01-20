<template>
  <el-container v-bind:style="{height:100+'%'}">
    <el-aside v-bind:style="{height:100+'%',width:245+'px'}">
      <!-- 左栏 -->
      <left-bar />
    </el-aside>
    <el-container>
      <el-header>
        <!-- 顶栏 -->
        <top-bar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import TopBar from "../components/home/TopBar";
import LeftBar from "../components/home/LeftBar";

export default {
  name: "home",
  //----
  data: function() {
    return {
      user: null,
      activeIndex: "dashborad"
    };
  },

  components: {
    "top-bar": TopBar,
    "left-bar": LeftBar
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
    }
  },
  //-----
  created: function() {
    this.init();
  }
};
</script>