<!--  -->
<template>
  <div>
    <div class="container">
      <div class="title">查看区块详情：</div>
      <div id="detail">
        <a-row type="flex">
          <a-col :span="3" :offset="2">区块高度</a-col>
          <a-col :span="10">{{ seq }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">区块生成时间</a-col>
          <a-col :span="10">{{ closeTime }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">区块版本</a-col>
          <a-col :span="10">{{ version }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">区块大小</a-col>
          <a-col :span="10">{{ size }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">交易数量</a-col>
          <a-col :span="10">{{ latestTxCount }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">区块哈希</a-col>
          <a-col :span="10">{{ hash }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">上一块哈希</a-col>
          <a-col :span="10">{{ previousHash }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">账户树哈希</a-col>
          <a-col :span="10">{{ accountTreeHash }}</a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="3" :offset="2">共识信息哈希</a-col>
          <a-col :span="10">{{ consensusValueHash }}</a-col>
        </a-row>
      </div>
    </div>

    <div class="container">
      <div class="title">交易列表</div>

      <div>
        <Datatable
          @changepage="changepage"
          :columns="columns"
          :data="data2"
          :pagination="pagination"
        ></Datatable>
      </div>
    </div>
  </div>
</template>

<script>
import { getLedger, getTransaction } from "@/network/home";
import Datatable from "@/components/common/Datatable.vue";
export default {
  name: "Blockdetail",
  data() {
    return {
      data1: [],
      seq: Number,
      closeTime:Date,
      version:Number,
      size:Number,
      latestTxCount:Number,
      hash:String,
      previousHash:String,
      accountTreeHash:String,
      consensusValueHash:String,
      data2: [],
      count: 0,
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
          scopedSlots: { customRender: "sourceAddress" },
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
          scopedSlots: { customRender: "sourceAddress" },
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          align: "center",
          width: "10%",
          customRender(status) {
            return status === "success" ? "成功" : "不成功";
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

  created() {
    this.getdata();

  },

  watch: {
    $route(to, from) {
      this.getdata();

    },
  },

  components: { Datatable },

  computed: {
    pagination() {
      return {
        defaultCurrent: 1,
        total: this.count,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: true,
        showQuickJumper: true,
      };
    },
  },

  methods: {
    async getdata() {
     let  n = this.$route.params.block;
      let reg = /^[0-9]*[1-9][0-9]*$/ ;

      if(reg.test(n)) {

        this.data1 = await getLedger({seq: parseInt(n)}).then((res) => {
          return res.result
        });

        this.seq = this.data1[0].seq;
        this.closeTime = this.data1[0].closeTime;
        this.version = this.data1[0].version;
        this.size = this.data1[0].size;
        this.latestTxCount = this.data1[0].latestTxCount;
        this.hash = this.data1[0].hash;
        this.previousHash = this.data1[0].previousHash;
        this.accountTreeHash = this.data1[0].accountTreeHash;
        this.consensusValueHash = this.data1[0].consensusValueHash;

        this.data2 = await getTransaction({seq:  parseInt(n)}).then((res) => {
          return res.result
        });
      }

       else {
        this.data1 = await getLedger({hash: n}).then((res) => {
          return res.result
        });
        this.seq = this.data1[0].seq;
        this.closeTime = this.data1[0].closeTime;
        this.version = this.data1[0].version;
        this.size = this.data1[0].size;
        this.latestTxCount = this.data1[0].latestTxCount;
        this.hash = this.data1[0].hash;
        this.previousHash = this.data1[0].previousHash;
        this.accountTreeHash = this.data1[0].accountTreeHash;
        this.consensusValueHash = this.data1[0].consensusValueHash;

        this.data2 = await getTransaction({hash: n}).then((res) => {
          return res.result
        });
      }

    },

    changepage(n) {
      console.log(n);
      getTransaction({ page: n }).then((res) => {
        this.pagination = n;
        console.log(res);
        this.data = res.result;
        this.count = res.count;
      });
    },
  },
};
</script>
<style lang='less' scoped>
.container {
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