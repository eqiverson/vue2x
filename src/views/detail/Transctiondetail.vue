<!--  -->
<template>
  <div>
    <div class="container">
      <div class="title">查看交易详情：</div>
      <div id="detail">
        <div>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2">交易时间：</a-col>
            <a-col  :span="10">{{ closeTime }}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">区块高度：</a-col>
            <a-col :flex ="10">{{ seq }}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">交易类型：</a-col>
            <a-col :flex ="10">{{ transtype[type] }}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">源账户：</a-col>
            <a-col :flex ="10">{{ sourceAddress }}</a-col>
          </a-row>
            <a-row type="flex">
            <a-col  :span="3" :offset="2">签名者：</a-col>
            <a-col :flex ="10">{{ signers }}</a-col>
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
            <a-col  :span="10">{{ payCoin }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 存证索引key：</a-col>
            <a-col  :span="10">{{ record }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 存证内容：</a-col>
            <a-col  :span="10">{{record }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 资产代码：</a-col>
            <a-col  :span="10">{{ record }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 源账户：</a-col>
            <a-col  :span="10">{{ issuerAsset }}</a-col>
          </a-row>
          <a-row  type="flex">
            <a-col  :span="3" :offset="2"> 签名者：</a-col>
            <a-col  :span="10">{{ signers }}</a-col>
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
      result:Object,
      hash:String,
      closeTime:Date,
      seq:Number,
      type:String,
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
      sourceAddress:String,
      signers:Array,
      type1:String,




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
      getTransaction({hash:this.$route.params.hash,isSigners:true,isOperation:true}).then((res) => {
        console.log(res);
        this.data = res;
        
        this.closeTime = res.result[0].closeTime;
        this.seq = res.result[0].seq;
        this.type = res.result[0].type;
        this.sourceAddress = res.result[0].sourceAddress;
        this.signers = res.result[0].signers.length==0? null : res.result[0].signers;

            this.payCoin = res.result[0].sourceAddress;
            this.record = null;
            this.issuerAsset= null;
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