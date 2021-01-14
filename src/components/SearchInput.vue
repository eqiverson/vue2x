<template>
  <div id="search">
  <input type="search" 
  placeholder="请输入区块高度值/区块哈希值/交易哈希/账号地址"
  @keydown="SearchAction" >

  </div>
</template>

<script>

import _ from "underscore"
import { getLedger } from "@/network/home"

export default {
  name: "SearchInput",
  data(){
    return{
      Searchresult:[],
      Multidata
    }
  },
  methods:{
    SearchAction:_.throttle(function (e){
      const inputValue = e.target.vaule;
      this.Searchresult = this.Mutidata.filter((item) =>{
      if (item.course_name.includes(inputValue)){
        return item;
      }
      
    })
  },1000)
  
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#search {
  width: 540px;
  height: 40px;
  margin: 50px auto 100px;
  line-height: 20px;
  text-align: center;



  input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    line-height: 30px;
    padding: 5px 45px 5px 50px;
    font-size: 18px;
    border: none;
    border-radius: 20px;
    background-color: hsla(0, 0%, 100%, 0.5);
    outline: none;
    color: #2b3a78;
  }
}
</style>