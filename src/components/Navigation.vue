<!--  -->
<template>
<div class="header">
  <div class="banner-logo"><img src="../assets/navlogo.png">广东通服区块链浏览器</div>
    <div class="banner-nav" >
    <a-menu v-model="current" mode="horizontal" id="container">
      <a-menu-item key="home" id="nav">
        <router-link to="/">首页</router-link></a-menu-item>
      <a-menu-item key="blocks" id="nav">
        <router-link to="/blocks">区块</router-link></a-menu-item>
      <a-menu-item key="transaction" id="nav">
        <router-link to="/transaction" id="nav">交易</router-link></a-menu-item>
      <a-menu-item key="nodes" id="nav">
        <router-link to="/nodes" >节点</router-link></a-menu-item>
      <a-menu-item key="application" id="nav">
        <router-link to="/application/accounts">账号</router-link></a-menu-item>
        <!-- <span slot="title" class="submenu-title-wrapper" key="application"><router-link to="./application">应用</router-link></span> -->
      <!-- <a-sub-menu>

        <span slot="title" class="submenu-title-wrapper" key="application"><router-link to="./application">应用</router-link></span>
          <a-menu-item key="setting:1"> Option 1 </a-menu-item>
          <a-menu-item key="setting:2"> Option 2 </a-menu-item>


          <a-menu-item key="setting:3"> Option 3 </a-menu-item>
          <a-menu-item key="setting:4"> Option 4 </a-menu-item>

      </a-sub-menu> -->
    </a-menu>
  </div>
  
  </div>
</template>

<script>
export default {
  name:'Navigation',
  data() {
    return {
      current: [''],
    };
  },

  components: {},

  computed: {},


  methods: {}
}

</script>
<style lang='less' scoped>


.banner-logo{
    display: inline-block;
    vertical-align: top;
    letter-spacing: 5px;
    font-size: 27px;
    color: #fff;
    line-height: 45px;

    img{
    height: 45px;
    margin-right: 20px;
    }
}

.header{
  height:80px;
  margin:auto;
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

#container{
  background-color:rgba(255, 255, 255, 0);
  
}

#container {
  border-bottom:0px;
  #nav {
    color: #FFF;
    border-bottom-style: none;
    font-size: 22px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  }::selection{
  color: #FFFFFF;
       border-bottom: 3px solid #FFF;
     }
  :hover{
  border-bottom: 3px solid #FFF;
    color: #FFFFFF;
     }
    //::after{
  //  height: 0px;
  //
  //}
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>