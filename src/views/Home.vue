<template>
  <div class="home">
    home
    <div id="bbb" style="width: 600px; height: 400px"></div>
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
      option: {
        title: {
          text: "应用交易量",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [],
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
      let myDate = new Date();
      let xday  = myDate ;
      let yday  = myDate ;
      this.option.xAxis.data.push(moment(xday).format("M-DD"));
      this.option.series.data.push(moment(yday).format("YYYY-MM-DD HH:MM:SS"));
      
      for(let i=0;i<7;i++){
      myDate = moment(myDate).subtract(1, "days");
      xday = myDate.format("M-DD");
      yday = myDate.format("YYYY-MM-DD HH:MM:SS");
      this.option.xAxis.data.push(xday);
      this.option.series.data.push(yday);
      console.log(this.option.xAxis.data[i]);
      console.log(this.option.series.data[i]);
      }

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

    getecharts(){

      let chart = echarts.init(document.getElementById("bbb"));
      chart.setOption(this.option);
    }
  },

mounted() {
  this.getecharts();
},


  computed:{

}
}
</script>
