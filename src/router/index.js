import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// import Login from '../views/Login'
import LoginView from "../views/LoginView"
import UserManagement from "../views/UserManagement"
import SubjectManagement from "../views/SubjectManagement"
import ProofView from "../views/ProofView"
import CashAccountView from "../views/CashAccountView"
import BankAccountView from "../views/BankAccountView"
import SubAccountView from "../views/SubAccountView"

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: "/userManagement",
                component: UserManagement
            },
            {
                path: "/subjectManagement",
                component: SubjectManagement
            },
            {
                path: "/proofView",
                component: ProofView
            },
            {
                path: "/cashAccount",
                component: CashAccountView
            },
            {
                path: "/bankAccount",
                component: BankAccountView
            },
            {
                path: "/subAccount",
                component: SubAccountView
            }


        ]
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    }
]

const router = new VueRouter({
    routes
})

export default router
