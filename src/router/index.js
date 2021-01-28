import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blocks from '../views/Blocks.vue'
import Transaction from '../views/Transaction.vue'
import Nodes from '../views/Nodes.vue'
import Application from '../views/Application.vue'
import Accounts from '../views/Accounts.vue'
import Transctiondetail from '../views/detail/Transctiondetail.vue'
import Accountdetail from '../views/detail/Accountdetail.vue'
import Blockdetail from '../views/detail/Blockdetail.vue'


Vue.use(VueRouter)

const Error = {
    template:'<div>404 not found</div>',
}

const routes = [

  {
    name:'accountdetail',
    path:'/aransaction/:account',
    component:Accountdetail,
  },

  

  {
    name:'blockdetail',
    path:'/blocks/:block',
    component:Blockdetail,
  },

  

  {
    name:'transctiondetail',
    path:'/transaction/:hash',
    component:Transctiondetail,
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
    path: '/404',
    component:E
},
                {
    path: '*',
    redirect:'/404',
},

]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
