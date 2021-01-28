<!--  -->
<template>
  <div>
    <div class="container">
      <a-divider orientation="left"> 交易： {{ $route.params.hash }} </a-divider>
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
            <a-col :flex ="10">{{ sourceAddress }}</a-col>
          </a-row>


          <a-row type="flex">
            <a-col :flex="2">签名者</a-col>
            <a-col :flex="3">{{ signers.address }}</a-col>
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
          <div>操作源账户地址</div>
          {{ }}
          <div>存证索引key</div>
          {{}}
          <div>存证内容</div>
          {{}}
          <div>资产代码</div>
          {{}}
          <div>源账户</div>
          {{}}
          <div>签名者</div>
          {{}}
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
      result:Object,
      hash:String,
      closeTime:Date,
      seq:Number,
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
    $route:'getdata'
  },

  components: {},

  computed: {},

  methods: {
    getdata(){
      getTransaction({hash:this.hash}).then((res) => {
        console.log(res);
        this.result = res;

        this.closeTime = res.result.closeTime;
        this.seq = res.result.seq;
        this.type = res.result.type;
        this.sourceAddress = res.result.sourceAddress;
        this.signers = res.signers.signers;
        // this.sourceAddress = res.result.sourceAddress;
      });




    }
  },
};
</script>
<style lang='less' scoped>
#detail {
  // text-align: center;
  margin-left: 30px;
}
</style>