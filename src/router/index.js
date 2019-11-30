import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login'
import UserManagement from "../views/UserManagement"

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
