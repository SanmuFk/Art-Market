import { createRouter, createWebHistory } from 'vue-router'
import Index from '../components/Index.vue'
import Artworks from '../views/Artworks.vue'
import Work from '../views/Work.vue'
import Create from '../views/Create.vue'
import Shopping from '../views/Shopping.vue'
import Login from '../views/Login.vue'
import User from "@/views/User";
import UserInfor from "@/components/UserInfor";
import Wallet from "@/components/Wallet";
import Invitation from "@/components/Invitation";
import PrivateMuseum from "@/views/PrivateMuseum";
import ArtsMarket from "@/views/ArtsMarket";

const routes = [
  {
    path: '/',
    name: 'App',
    redirect:{name:"Index"}
  },
  {
    path: '/Index',
    name: 'Index',
    component: Index
  },
  {
    path: '/ArtsMarket',
    name: 'ArtsMarket',
    component: ArtsMarket
  },
  {
    path:'/Artworks/:artworkId',
    name:'Artworks',
    component: Artworks
  },
  {
    path: '/Work/:workId',
    name: 'Work',
    component: Work
  },
  {
    path: '/Create',
    name: 'Create',
    component: Create
  },
  {
    path: '/Shopping',
    name: 'Shopping',
    component: Shopping
  },
  {
    path: '/PrivateMuseum',
    name: 'PrivateMuseum',
    component: PrivateMuseum
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/User',
    name: 'User',
    component: User,
    children: [
      {
        path: 'Person',
        name: 'UserInfor',
        component: UserInfor
      },
      {
        path: 'Wallet',
        name: 'Wallet',
        component: Wallet,
      },
      {
        path: 'Invitation',
        name: 'Invitation',
        component: Invitation,
      },
    ]

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
