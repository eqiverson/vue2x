import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import {request} from './network/request';
import axios from 'axios';




Vue.use(Antd);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



// request({
//   url:'/v1/getLedger',
//   method:'post',
//   data:{
    
//   }
// }).then(res => {
//   console.log(res.data);
// })
  


console.log(111)

axios({
  url:'http://192.168.13.120:7072/v1/getLedger',
  contentType:'application/json',
  method:'post',
  data:{}
}).then(res => {
  console.log(res);
})

axios({
  url:'http://192.168.13.120:7072/v1/getTransactionStatistics',
  contentType:'application/json',
  method:'post',
  data:{}
}).then(res => {
  console.log(res);
})