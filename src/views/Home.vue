<template>
  <div class="container">
    <div class="home">
      <div id="accountcount" style="width: 600px; height: 400px"></div>
      <div id="transtcount" style="width: 600px; height: 400px"></div>
    </div>
    <div>
      <Transtable></Transtable>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getLedger, getTransactionStatistics } from "@/network/home";
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
          text: "地址增长量",
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
    };
  },
  created() {
    this.infodata();

    this.setchart1();


  },

  methods: {

    // setchart1(){

    //   getLedger({ closeTimeEnd: yday[i] }).then((res) => {
    //   let myDate = new Date(this.closeTime);
    //   let arr1 = [];
    //   let arr2 = [];
    //   let account = [];

    //       res.result.forEach( (item) => {

    //         arr1.push(item.)


    //         }
    //         });
      
    //     },

    

    setchart2(){

      getTransactionStatistics().then((res) => {

      let arr1 = [];
      let arr2 = [];
      res.result.forEach((item) => {
        arr1.push(moment(item.date).format("M-DD"));
        arr2.push(item.txCount);
      });

        arr1.reverse();
        arr2.reverse();


      console.log(arr1);
      console.log(arr2);
      console.log(this.option2);
      this.option2.xAxis.data = arr1;
      this.option2.series[0].data = arr2;
      console.log(this.option2.xAxis.data);
      console.log(this.option2.series[0].data);
      this.getecharts2(this.option2);
    });

    },





    // get5days() {


    //   for (let i = 0; i < 7; i++) {
    //     xday.push(moment(myDate).format("M-DD"));
    //     yday.push(moment(myDate).format("YYYY-MM-DD HH:MM:SS"));
    //     myDate = moment(myDate).subtract(1, "days");
    //   }

      // console.log(xday);
      // xday.reverse();
      // this.option1.xAxis.data = xday; //第一个折线图X时间轴

      //请求第一个折线图每天的地址量
      // for (let i = 0; i < 7; i++) {
      //   getLedger({ closeTimeEnd: yday[i] }).then((res) => {
      //     account.push(res.result[0].accountCount);
      //   });
      // }

      // this.option1.series[0].data = account;
      // console.log(account);

      //   let arr = []
      // getTransactionStatistics().then((res) => {
      //   console.log(res.result)
      //   res.result.forEach(item=>{
      //     arr.push(item.date)
      //   })
      // });
      //   console.log(arr);
      //   this.option2.xAxis.data = arr;
      //   console.log(this.option2.xAxis.data);

      // console.log(this.option1.series[0].data);
      // this.option2.xAxis.data;
      // console.log(this.option2.xAxis.data);

      // this.option2.xAxis.data = xday;

      // this.option1.xAxis.data = ['1-19','1-18','1-17','1-16','1-15','1-14','1-13'];
      // this.option1.series[0].data = Array.from(accountdata);
      // this.option1.series[0].data = [1,2,3,4,5,6,7];
      // console.log(this.option1.series[0].data);
      // // this.option2.series[0].data = transdata;

      // console.log(this.option1.series[0].data);
    // },

    infodata() {
      getLedger().then((res) => {
        this.seq = res.result[0].seq;
        this.accountCount = res.result[0].accountCount;
        this.txCount = res.result[0].txCount;
        this.applicationCount = res.applicationCount;
        this.nodeCount = res.nodeCount;
        this.closeTime = res.result[0].closeTime;
        this.setchart2();
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
  },

  mounted() {

  },

  computed: {},
};
</script>

<style lang='less' scoped>
.home {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>