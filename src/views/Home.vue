<template>
  <div class="home">
    <div id="accountcount" style="width: 600px; height: 400px"></div>
    <div id="transtcount" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getLedger } from "@/network/home";



// let echarts = require("echarts/lib/echarts");
// // 按需引入需要的组件模块
// require("echarts/lib/chart/line");
// require("echarts/lib/component/title");
// require("echarts/lib/component/legend");
// require("echarts/lib/component/tooltip");

const echarts = require('echarts');
const moment = require('moment');


export default {
  name: "Home",
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
        yAxis: {type: 'value'},
        series: [
          {
            name: "增长量",
            type: "line",
            data: [],
            areaStyle: {}
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
        yAxis: {type: 'value'},
        series: [
          {
            name: "交易量",
            type: "line",
            data: [],
            areaStyle: {}
          },
        ],
      },

      seq: [],
      accountCount: [],
      txCount: [],
      applicationCount: [],
      nodeCount: [],

      last5days:[],

      closeTime:[]


    };
  },
  created() {
    this.infodata();
    this.get5days();

  },


  methods: {
    get5days(){
      let myDate = new Date(this.closeTime);
      let xday  = [] ;
      let yday  = [] ;
      let accountdata = [] ;
      let transdata = [] ;


      for(let i=0  ;i<7;i++){

        xday.push(moment(myDate).format("M-DD"));
        yday.push(moment(myDate).format("YYYY-MM-DD HH:MM:SS"));
        getLedger({closeTimeEnd:yday}).then((res) => {
          accountdata.push(res.result[0].accountCount)
          transdata.push(res.result[0].txCount)
        })

        myDate = moment(myDate).subtract(1, "days");

      console.log(xday[i]);

      }
      this.option1.xAxis.data = xday;
      this.option2.xAxis.data = xday;
      // this.option1.xAxis.data = ['1-19','1-18','1-17','1-16','1-15','1-14','1-13'];
      this.option1.series[0].data = accountdata;
      // this.option1.series[0].data = [1,2,3,4,5,6,7];
      this.option2.series[0].data = transdata;

    },
    
    infodata() {
      getLedger().then((res) => {
        this.seq = res.result[0].seq;
        this.accountCount = res.result[0].accountCount;
        this.txCount = res.result[0].txCount;
        this.applicationCount = res.applicationCount;
        this.nodeCount = res.nodeCount;
        this.closeTime = res.result[0].closeTime;

      });
    },

    getecharts1(){

      let chart = echarts.init(document.getElementById("accountcount"));
      chart.setOption(this.option1);
    },

    getecharts2(){

      let chart = echarts.init(document.getElementById("transtcount"));
      chart.setOption(this.option2);
    }


  },



mounted() {
  this.getecharts1();
  this.getecharts2();
},


  computed:{

}
}
</script>

<style lang='less' scoped>
.home{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>