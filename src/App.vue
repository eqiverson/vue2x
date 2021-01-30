<template>
<div id="app">


    
  <div class="banner">
    <Navigation></Navigation>
    <SearchInput></SearchInput>
    <Infoledger></Infoledger>
    
  </div>

  <div class="content">
<router-view></router-view>
</div>
  <a-layout-footer class="footer">  
  
  Copyright ©版权所有 2020 通服区块链
  
  </a-layout-footer>

  </div>
</template>

<style lang='less' scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.banner {
  background-image: url("../src/assets/banner.png");
  background-size: cover;
  background-position: 50%;
  background-color: hsla(0, 0%, 100%, 0.5);
  background-repeat: no-repeat;
  overflow: hidden;
}

.footer {
  height: 70px;
  width: 100%;
  background: #0a1c42;
  color: #fff;
  font-size: 16px;
  bottom: 0;
  text-align: center;
}
.content {
  min-height:400px;
  background-color: #f4f8f7;
}
</style>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import SearchInput from "@/components/SearchInput.vue";
import Infoledger from "@/components/Infoledger.vue";

export default {
  components: { Navigation, SearchInput, Infoledger },
  name: "Home",
  data() {
    return {
      current: [""],
    };
  },
};
</script>