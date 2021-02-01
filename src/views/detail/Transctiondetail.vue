<!--  -->
<template>
  <div>
    <div class="container">
      <div class="title">查看交易详情：</div>
      <div id="detail">
        <div>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2">交易时间：</a-col>
            <a-col  :span="10">{{ data.closeTime }}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">区块高度：</a-col>
            <a-col :flex ="10">{{ data.seq }}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">交易类型：</a-col>
            <a-col :flex ="10">{{ transtype[data.type] }}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">源账户：</a-col>
            <a-col :flex ="10">{{ data.sourceAddress }}</a-col>
          </a-row>
            <a-row type="flex">
            <a-col  :span="3" :offset="2">签名者：</a-col>
            <a-col :flex ="10">{{ signers[0] }}</a-col>
          </a-row>


        </div>
      </div>
    </div>

    <div class="container">
      <div class="title">
        操作：（操作指创建账号、存证、调用合约、发行资产、资产转移等）
      </div>
      <div class="tag">存证</div>
      <div class="detail">
        <div>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 操作源地址：</a-col>
            <a-col  :span="10">{{ payCoin[1] }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 存证索引key：</a-col>
            <a-col  :span="10">{{ record[2] }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 存证内容：</a-col>
            <a-col  :span="10">{{record[3] }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 资产代码：</a-col>
            <a-col  :span="10">{{ record[4] }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 源账户：</a-col>
            <a-col  :span="10">{{ issuerAsset[2] }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 签名者：</a-col>
            <a-col  :span="10">{{ signers[0] }}</a-col>
          </a-row>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

import {getTransaction} from "@/network/home";

export default {
  name: "Transctiondetail",
  data() {
    return {
      data:[],
      signers:[],
      payCoin:[],
      record:[],
      issuerAsset:[],
      // result:Object,
      // hash:String,
      // closeTime:Date,
      // seq:Number,
      transtype:{
        createAccount: "创建账号",
        createContract: "创建合约",
        issuerAsset: "发行资产",
        payAsset: "转移资产",
        payCoin: "转账",
        record: "存证",
        useContract: "调用合约",
        setAuthority: "设置权限",
        complex: "多类型组合",
      },
      // sourceAddress:String,
      // signers:Array,
      // type1:String,




    };
  },

  created () {
    this.getdata();
  },

  watch:{
    $route(to, from) {
    this.getdata();
    }
  },

  components: {},

  computed: {},

  methods: {
    getdata(){
      getTransaction({hash:this.$route.params.hash}).then((res) => {
        console.log(res);
        // this.result = res;
        //
        // this.closeTime = res.result.closeTime;
        // this.seq = res.result.seq;
        // this.type = res.result.type;
        // this.sourceAddress = res.result.sourceAddress;
        // this.signers = res.signers.signers;
        // this.sourceAddress = res.result.sourceAddress;
        this.data = res;
        this.signers = res.signers;
            this.payCoin = res.payCoin;
            this.record = res.record;
            this.issuerAsset= res.issuerAsset;
      });




    }
  },
};
</script>
<style lang='less' scoped>
.container{
  background-color: #fff;
  padding: 25px;
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
  margin: 25px;
  line-height: 50px;
}
.title {
  border-left-color: blue;
  border-left-width: 5px;
  border-left-style: solid;
  color: #101010;
  font-size: 18px;
  position: relative;
  padding-left: 15px;
  line-height: 32px;
}


#detail {
  // text-align: center;
  margin-left: 30px;
}
</style>