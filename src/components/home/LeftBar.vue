<template>
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
            <el-menu-item index="proofView" @click="pushToAddr('/proofView')">凭证管理</el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <span>查看账簿</span>
                </template>
                <el-menu-item @click="pushToAddr('/cashAccount')" index="cashAccount">现金日记账</el-menu-item>
                <el-menu-item @click="pushToAddr('/bankAccount')" index="bankAccount">银行日记账</el-menu-item>
                <el-menu-item @click="pushToAddr('/subAccount')" index="subAccount">明细分类账</el-menu-item>
                <el-menu-item index="ledgerAccount">总分类账</el-menu-item>
            </el-submenu>
            <el-menu-item
                    v-if="user!=null&&(user.role===1||user.role===2)"
                    index="subjectManagement"
                    @click="pushToAddr('/subjectManagement')"
            >科目管理
            </el-menu-item>
            <el-menu-item
                    v-if="user!=null&&user.role===1"
                    index="userManagement"
                    @click="pushToAddr('/userManagement')"
            >用户管理
            </el-menu-item>
            <el-menu-item index="userCenter">个人中心</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "left-bar",
        data: function () {
            return {
                activeIndex: "dashborad",
                user: null
            };
        },

        methods: {
            init() {
                let temp = sessionStorage.getItem("user");
                if (temp != null) {
                    this.user = JSON.parse(temp);
                }
                this.changeIndex();
            },

            pushToAddr(addr) {
                this.$router.push({path: addr}).catch(error => {
                    console.log(error);
                });
            },

            changeIndex() {
                let path = this.$route.path;
                console.log(path);

                this.activeIndex = path.substring(1, path.length);
            }
        },
        created: function () {
            this.init();
        },
        beforeUpdate: function () {
            this.changeIndex();
        }
    };
</script>