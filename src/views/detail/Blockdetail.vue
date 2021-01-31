<!--  -->
<template>
  <div>
    <div class="container">
      <div class="title">查看区块详情：</div>
      <div id="detail">
          <a-row  type="flex" >
            <a-col  :span="3" :offset="2">区块高度</a-col>
            <a-col  :span="10">{{data1.seq}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">区块生成时间</a-col>
            <a-col  :span="10">{{data1.closeTime}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">区块版本</a-col>
            <a-col  :span="10">{{data1.version}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">区块大小</a-col>
            <a-col  :span="10">{{data1.size}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">交易数量</a-col>
            <a-col  :span="10">{{data1.latestTxCount}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">区块哈希</a-col>
            <a-col  :span="10">{{data1.hash}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">上一块哈希</a-col>
            <a-col  :span="10">{{data1.previousHash}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">账户树哈希</a-col>
            <a-col  :span="10">{{data1.accountTreeHash}}</a-col>
          </a-row>
          <a-row type="flex">
            <a-col  :span="3" :offset="2">共识信息哈希</a-col>
            <a-col  :span="10">{{data1.consensusValueHas}}</a-col>
          </a-row>

        </div>
      </div>

    <div class="container">
      <div class="title">
        交易列表
      </div>

      <div>
        <Datatable @changepage="changepage"  :columns="columns" :data="data2" :pagination="pagination"></Datatable>
      </div>
    </div>

  </div>
</template>

<script>

import {getLedger, getTransaction} from "@/network/home";
import Datatable from "@/components/common/Datatable.vue";
export default {
  name: "Blockdetail",
  data() {
    return {
      data1:[],
      data2:[],
      count:0,
      columns: [
        {
          title: "交易时间",
          dataIndex: "closeTime",
          key: "closeTime",
          align: "center",
          width: "15%",
        },
        {
          title: "所属区块",
          dataIndex: "seq",
          key: "seq",
          align: "center",
          width: "10%",
        },
        {
          title: "交易类型",
          dataIndex: "type",
          key: "type",
          align: "center",
          width: "10%",
          customRender(type) {
            let config = {
              createAccount: "创建账号",
              createContract: "创建合约",
              issuerAsset: "发行资产",
              payAsset: "转移资产",
              payCoin: "转账",
              record: "存证",
              useContract: "调用合约",
              setAuthority: "设置权限",
              complex: "多类型组合",
            };
            return config[type];
          },
        },
        {
          title: "源账户",
          dataIndex: "sourceAddress",
          key: "sourceAddress",
          ellipsis: true,
          align: "center",
          scopedSlots: {customRender: "sourceAddress"},
        },
        // {
        //   title: "目的账户",
        //   dataIndex: "toac",
        //   key: "toac",
        //   ellipsis: true,
        //   align: "center",
        // },
        // {
        //   title: "所属应用",
        //   dataIndex: "applicationName",
        //   key: "applicationName",
        //   ellipsis: true,
        // },
        {
          title: "交易哈希",
          dataIndex: "hash",
          key: "hash",
          align: "center",
          ellipsis: true,
          scopedSlots: {customRender: "sourceAddress"},
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          align: "center",
          width: "10%",
          customRender(status) {
            return status == "success" ? "成功" : "不成功";
          },
        },
      ],
      // hash:String,
      // closeTime:Date,
      // seq:Number,
      // type:String,
      // sourceAddress:String,
      // signers:Array,



    };
  },

  created () {
    this.getdata1();
    this.getdata2();
  },

  watch: {
    $route(to, from) {
      console.log(1);
      this.getdata();
    }
  },

  components: {Datatable},

  computed: {
    pagination(){
      return{
        defaultCurrent: 1,
        total: this.count,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        showQuickJumper: true,

      }
    }
  },

  methods: {
    getdata1(){
      getLedger({seq:this.$route.params.block}).then((res) => {
        console.log(res);
        // this.closeTime = res.result.closeTime;
        // this.seq = res.result.seq;
        // this.type = res.result.type;
        // this.sourceAddress = res.result.sourceAddress;
        // this.signers = res.signers.signers;
        // this.sourceAddress = res.result.sourceAddress;
        this.data = res;
      });
    },
    getdata2() {
      getTransaction({sourceAddress: this.hash}).then((res) => {
        console.log(res);
        this.data2 = res;
      });
    },
    changepage(n){
      console.log(n);
      getTransaction({page:n}).then((res) => {
        this.pagination = n;
        console.log(res);
        this.data = res.result;
        this.count = res.count;
      })
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
  line-height: 50px;
}
</style>