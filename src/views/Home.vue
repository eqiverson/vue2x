<template>
  <div class="container">
    <div class="home">
      <div></div>
      <div id="accountcount" style="width: 600px; height: 400px"></div>
      <div id="transtcount" style="width: 600px; height: 400px"></div>

    </div>
    
      <div id="list-demo" class="demo">
        <transition-group name="list" tag="p">
          <span v-for="item in items" v-bind:key="item" class="list-item">
            {{ item }}
          </span>
        </transition-group>
      </div>
    <div>
      <div>交易列表（最新生成）</div>
      <Transtable :data="tabledata"></Transtable>
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
import Transtable from "@/components/Transtable.vue";

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
    Transtable,
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

      last5days: [],

      closeTime: [],

      tabledata: [],

      tablecount: 0,

      items: [1, 2, 3, 4, 5],
      nextNum1: 6,
      nextNum2: 7,
    };
  },

  created() {
    this.infodata();
    this.transition1();
  },

  methods: {
    infodata() {
      getLedger({}).then((res) => {
        this.seq = res.result[0].seq;
        this.accountCount = res.result[0].accountCount;
        this.txCount = res.result[0].txCount;
        this.applicationCount = res.applicationCount;
        this.nodeCount = res.nodeCount;
        this.closeTime = res.result[0].closeTime;

        console.log(this.seq);
      });
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

    transition1() {
      setInterval(() => {

        this.items.splice(this.items.length, 0, this.nextNum1, this.nextNum2);
        this.items.splice(0, 2);
                this.nextNum1 = this.nextNum1 + 2;
        this.nextNum2 = this.nextNum2 + 2;
      }, 1000);
    },

    //   loopdata(n){

    //     let that = this;
    // //
    //     setInterval(that.infodata(), n);
    //     }
    //
    //     setTimeout(() => {
    //       this.infodata();
    //       },n);
    //     });
    //   },
    //
    //   async loopit (n) {
    //     const n = 5000;
    //     this.loopdata(n) = await
    //   }
  },

  mounted() {
    // setInterval(() => { this.infodata() },10000);

    this.setchart2();
    this.setchart1();
    this.gettabledata();
  },

  computed: {
    // pagination(){
    // {
    //   defaultCurrent: 1,
    //   total: this.tablecount,
    //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    //   showSizeChanger: true,
    //   showQuickJumper: true,
    // }
    // }
  },
};
</script>

<style lang='less' scoped>
.home {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}

  .list-item {
    display: inline-block;
    // margin-top: 50px;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>