<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

import { getLedger, getHomeGoods } from "@/network/home"

export default {
  name: 'Home',
  data(){
    return{

    }
  },
  created(){
      getLedger().then(res=>{
        console.log(res)
      })
  }
}
</script>
