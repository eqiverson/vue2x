<!--  -->
<template>
  <div id="info">
    <!-- <a-row type="flex" justify="center" class="infobox">
      <div >
        <div class="data">11</div>
        <div class="title">区块</div>
      </div>
      <a-col :span="4" class="title"> 区块 </a-col>
      <a-col :span="4" class="title"> 区块 </a-col>
      <a-col :span="4" class="title"> 区块 </a-col>
    </a-row> -->

    <div class="infobox">

    <a-row type="flex" justify="center" align="middle">
      <a-col :span="4" class="infobox-item" @click="linktoblocks">
        <div class="data">11</div>
        <div class="title">区块</div>
      </a-col>
      <a-col :span="4" class="infobox-item" @click="linktoblocks">
        <div class="data">11</div>
        <div class="title">总账号数</div>
      </a-col>
      <a-col :span="4" class="infobox-item">
        <div class="data">11</div>
        <div class="title">总交易数</div>
      </a-col>
      <a-col :span="4" class="infobox-item">
        <div class="data">11</div>
        <div class="title">接入应用数</div>
      </a-col>
      <a-col :span="4" class="infobox-item">
        <div class="data">11</div>
        <div class="title">实时节点数</div>
      </a-col>
    </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Infoledger",
  data() {
    return {
        seq,
        accountcount,
        txcount,
        applicationcount,
        nodecount
    };
  },

  components: {},

  computed: {},

  methods: {
      linktoblocks(){
          this.$router.push('/blocks')
      }
  },
};
</script>
<style lang='less' scoped>
#info {

    // padding: 20px;
    // margin: 0 auto;
    // align-items: center;
    // width: 1920px;

  .infobox {


    .infobox-item{
    text-align: center;
    cursor: pointer;

    .title {
        
      color: #fcfafa;
      font-size: 16px;
    }
    .data{
    color: #fcfafa;
      font-size: 28px;
    }
    }
  }
}
</style>