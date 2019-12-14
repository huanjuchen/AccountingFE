import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login'
import UserManagement from "../views/UserManagement"
import SubjectManagement from "../views/SubjectManagement"
import ProofList from "../views/ProofList"

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
        path:"/proofList",
        component:ProofList
      }


    ]
  },
  {
    path:"/login",
    name:"login",
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
