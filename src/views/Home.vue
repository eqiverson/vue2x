<template>
  <div class="container">
    <div class="home">
      <div class="chart">
        <div class="title">最近7天地址增长量</div>
        <div id="accountcount" style="width: 600px; height: 400px"></div>
      </div>
      <div class="chart">
        <div class="title">最近7天交易量</div>
        <div id="transtcount" style="width: 600px; height: 400px"></div>
      </div>
    </div>

    <div class="block">
      <div class="title">区块（最新生成）</div>
      <div id="list-demo" class="demo">
        <transition-group name="list" tag="p">
          <span v-for="item in items" v-bind:key="item" class="list-item">
            {{ item }}
          </span>
        </transition-group>
      </div>
    </div>

    <div class="table">
      <div class="title">交易列表（最新生成）</div>
      <Datatable :columns="columns" :data="tabledata"></Datatable>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {
  getLedger,
  getTransactionStatistics,
  getAccountCount,
  getTransaction,
} from "@/network/home";

import Datatable from "@/components/common/Datatable.vue";


// let echarts = require("echarts/lib/echarts");
// // 按需引入需要的组件模块
// require("echarts/lib/chart/line");
// require("echarts/lib/component/title");
// require("echarts/lib/component/legend");
// require("echarts/lib/component/tooltip");

const echarts = require("echarts");
const moment = require("moment");

// const accountdata = [];
// const transdata = [];

export default {
  name: "Home",

  components: {
    Datatable,
  },

  data() {
    return {
      option1: {
        title: {
          text: "应用交易量",
        },
        tooltip: {},
        legend: {
          data: ["增长量"],
        },
        xAxis: {
          data: [],
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "增长量",
            type: "line",
            data: [],
            areaStyle: {},
          },
        ],
      },

      option2: {
        title: {
          text: "最近7天内交易量",
        },
        tooltip: {},
        legend: {
          data: ["交易量"],
        },
        xAxis: {
          data: [],
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "交易量",
            type: "line",
            data: [],
            areaStyle: {},
          },
        ],
      },

      seq: [],
      accountCount: [],
      txCount: [],
      applicationCount: [],
      nodeCount: [],


      closeTime: [],

      tabledata: [],

      tablecount: 0,

      items: [],
      nextNum1: 6,
      nextNum2: 7,

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
          scopedSlots: { customRender: "transhash" },
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
    };
  },

  created() {
    this.infodata();
  },

watch:{
  seq:{
      handler(nseq,oseq) {
        let s = nseq - 1;
        this.items.splice(this.items.length,0,s,nseq);
        this.items.splice(0, 2);
      }
},
},

  methods: {
    infodata() {
      setInterval(() => {
      getLedger({}).then((res) => {
        this.seq = res.result[0].seq;
        this.accountCount = res.result[0].accountCount;
        this.txCount = res.result[0].txCount;
        this.applicationCount = res.applicationCount;
        this.nodeCount = res.nodeCount;
        this.closeTime = res.result[0].closeTime;
        // for(let i=0 ;i<5;i++){
        // this.items.splice(0,0,res.result[i].seq);
        // }
        console.log(res);
      });
            }, 1000);
    },

    setchart1() {
      getAccountCount().then((res) => {
        let arr1 = [];
        let arr2 = [];

        res.result.forEach((item) => {
          arr1.push(moment(item.time).format("M-DD"));
          arr2.push(item.accountCount);
        });

        this.option1.xAxis.data = arr1;
        this.option1.series[0].data = arr2;
        this.getecharts1(this.option1);
      });
    },

    setchart2() {
      getTransactionStatistics().then((res) => {
        let arr1 = [];
        let arr2 = [];
        res.result.forEach((item) => {
          arr1.push(moment(item.date).format("M-DD"));
          arr2.push(item.txCount);
        });

        arr1.reverse();
        arr2.reverse();

        this.option2.xAxis.data = arr1;
        this.option2.series[0].data = arr2;

        this.getecharts2(this.option2);
      });
    },

    getecharts1(option) {
      let chart = echarts.init(document.getElementById("accountcount"));
      chart.setOption(option);
    },

    getecharts2(option) {
      let chart = echarts.init(document.getElementById("transtcount"));
      chart.setOption(option);
    },

    gettabledata() {
      getTransaction({ pageSize: 6 }).then((res) => {
        console.log(res);
        this.tabledata = res.result;
        this.tablecount = res.count;
      });
    },


      



  },

  mounted() {

    this.setchart2();
    this.setchart1();
    this.gettabledata();
  },

  computed: {
  },
}

</script>

<style lang='less' scoped>
.home {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding:25px;


  .chart {
    background-color: #fff;
    padding: 15px;
    box-shadow: 0px 0px 10px rgb(206, 206, 206);
  }
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

.block {
  background-color: #fff;
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
  margin: 25px;
  padding:25px;

  .list-item {
    display: inline-block;
    // margin-top: 50px;
    margin-right: 10px;
    width: 100px;
    height: 61px;
    background-color: pink;
    text-align: center;
    align-items: center;
    line-height: 61px;
    margin-top:30px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter
/* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(20px);
  }
   .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(20px);
  }
}
.table {
  background-color: #fff;
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
  margin: 25px;
  padding: 15px;
  margin-bottom: 30px;
}
</style>