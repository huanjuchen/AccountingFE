import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// import Login from '../views/Login'
import LoginView from "../views/LoginView"
import UserManagement from "../views/UserManagement"
import SubjectManagement from "../views/SubjectManagement"
import ProofView from "../views/ProofView"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path:"/userManagement",
        component:UserManagement
      },
      { 
        path:"/subjectManagement",
        component:SubjectManagement
      },
      {
        path:"/proofView",
        component:ProofView
      }


    ]
  },
  {
    path:"/login",
    name:"login",
    component:LoginView
  }
]

const router = new VueRouter({
  routes
})

export default router
