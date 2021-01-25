import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blocks from '../views/Blocks.vue'
import Transaction from '../views/Transaction.vue'
import Nodes from '../views/Nodes.vue'
import Application from '../views/Application.vue'
import Accounts from '../views/Accounts.vue'
import Transctiondetail from '../views/detail/Transctiondetail.vue'



Vue.use(VueRouter)

const routes = [
  {
    path:'/blocks/:seq',
    name:'lastblock',
    component:Blocks
  },


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
    path:'/application/accounts',
    name:'accounts',
    component:Accounts,
    // children:[
    //   {
    //     path:'',
    //     component: Accounts
    //   }

    // ],
  },
  {
    path:'/transaction/:hash',
    component:Transctiondetail,
  }

]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
