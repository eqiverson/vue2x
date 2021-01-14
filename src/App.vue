<template>
<div id="app">
  <div class="banner">
    <Navigation></Navigation>
    <SearchInput></SearchInput>
    <Infoledger></Infoledger>
  </div>
    <router-view></router-view>

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

.banner{
  background-image:url('../src/assets/banner.png');
  background-size: cover;
  background-position: 50%;
  background-color: hsla(0,0%,100%,.5);
  background-repeat:no-repeat;
  overflow:hidden;
}





</style>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import SearchInput from '@/components/SearchInput.vue'
import Infoledger from '@/components/Infoledger.vue'

export default {
  components: { Navigation,SearchInput,Infoledger },
  name: 'Home',
  data() {
    return {
      current: [''],
    }
    },
  
}
</script>