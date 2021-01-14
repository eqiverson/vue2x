import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blocks from '../views/Blocks.vue'
import Transaction from '../views/Transaction.vue'
import Nodes from '../views/Nodes.vue'
import Application from '../views/Application.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path:'/blocks',
    name:'Blocks',
    component: Blocks,
  },
  {
    path:'/transaction',
    name:'Transaction',
    component: Transaction,
  },
  {
    path:'/nodes',
    name:'Nodes',
    component: Nodes,
  },
  {
    path:'/application',
    name:'Application',
    component:Application,
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
